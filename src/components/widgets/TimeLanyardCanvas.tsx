"use client";

import * as THREE from "three";
import { useEffect, useRef, useState, useMemo, createRef } from "react";
import { Canvas, extend, useThree, useFrame } from "@react-three/fiber";
import { useTexture, Text } from "@react-three/drei";
import {
  Physics,
  RigidBody,
  useSphericalJoint,
  RapierRigidBody,
} from "@react-three/rapier";
import { MeshLineGeometry, MeshLineMaterial } from "meshline";

// Extend meshline for R3F
extend({ MeshLineGeometry, MeshLineMaterial });

declare global {
  namespace JSX {
    interface IntrinsicElements {
      meshLineGeometry: any;
      meshLineMaterial: any;
    }
  }
}

interface LanyardProps {
  time: string;
  date: string;
  isPinned: boolean;
}

// Rope configuration
const SEGMENTS = 10;
const SEGMENT_LENGTH = 0.4;
const ROPE_RADIUS = 0.05;

export default function TimeLanyardCanvas({
  time,
  date,
  isPinned,
}: LanyardProps) {
  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, 15], fov: 25 }}
      style={{ background: "transparent", pointerEvents: "none" }}
      eventSource={
        typeof document !== "undefined"
          ? (document.body as HTMLElement)
          : undefined
      }
      eventPrefix="client"
      gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
    >
      <ambientLight intensity={0.8} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <pointLight position={[-10, -10, -10]} intensity={0.5} />

      <Physics gravity={[0, -40, 0]} timeStep={1 / 60} interpolate>
        <LanyardScene time={time} date={date} isPinned={isPinned} />
      </Physics>
    </Canvas>
  );
}

function LanyardScene({ time, date }: LanyardProps) {
  const lanyardTexture = useTexture("/lanyard/lanyard.png");

  useEffect(() => {
    // eslint-disable-next-line
    lanyardTexture.wrapS = lanyardTexture.wrapT = THREE.RepeatWrapping;
  }, [lanyardTexture]);

  const cardRef = useRef<RapierRigidBody>(null);
  const anchorRef = useRef<RapierRigidBody>(null);

  // Create stable refs for segments
  const segmentRefs = useRef<React.RefObject<RapierRigidBody>[]>([]);
  if (segmentRefs.current.length !== SEGMENTS) {
    segmentRefs.current = Array(SEGMENTS)
      .fill(null)
      .map(() => createRef<RapierRigidBody>());
  }

  return (
    <>
      <RigidBody
        ref={anchorRef}
        type="fixed"
        position={[0, 4, 0]}
        colliders={false}
      />

      <RopeSystem
        anchorRef={anchorRef}
        cardRef={cardRef}
        length={SEGMENTS}
        texture={lanyardTexture}
        segmentRefs={segmentRefs}
      >
        <group>
          {/* Card Geometric Visual */}
          <mesh>
            <boxGeometry args={[3.2, 2.0, 0.15]} />
            <meshStandardMaterial
              color="#1a1a1a"
              roughness={0.2}
              metalness={0.1}
            />
          </mesh>

          <mesh position={[0, 0, -0.01]}>
            <boxGeometry args={[3.3, 2.1, 0.14]} />
            <meshStandardMaterial color="white" />
          </mesh>

          <group position={[0, 0, 0.08]}>
            <Text
              position={[0, 0.7, 0]}
              fontSize={0.12}
              color="#888888"
              anchorX="center"
              anchorY="middle"
              letterSpacing={0.2}
            >
              LOCAL TIME
            </Text>
            <Text
              position={[0, 0.15, 0]}
              fontSize={0.8}
              color="#ffffff"
              anchorX="center"
              anchorY="middle"
              fontWeight={800}
            >
              {time}
            </Text>
            <Text
              position={[0, -0.5, 0]}
              fontSize={0.25}
              color="#aaaaaa"
              anchorX="center"
              anchorY="middle"
            >
              {date}
            </Text>
          </group>
        </group>
      </RopeSystem>
    </>
  );
}

interface RopeSystemProps {
  anchorRef: React.RefObject<RapierRigidBody>;
  cardRef: React.RefObject<RapierRigidBody>;
  length: number;
  texture: THREE.Texture;
  segmentRefs: React.MutableRefObject<React.RefObject<RapierRigidBody>[]>;
  children: React.ReactNode;
}

function RopeSystem({
  anchorRef,
  cardRef,
  length,
  texture,
  segmentRefs,
  children,
}: RopeSystemProps) {
  const [points] = useState(() =>
    new Array(length).fill(0).map(() => new THREE.Vector3())
  );

  return (
    <group>
      <RopeVisual points={points} texture={texture} />

      {/* Render Segments */}
      {segmentRefs.current.map((ref, i) => (
        <RopeSegment key={i} index={i} selfRef={ref} />
      ))}

      {/* Render Joints */}
      {segmentRefs.current.map((ref, i) => {
        const targetRef = i === 0 ? anchorRef : segmentRefs.current[i - 1];
        return (
          <ConnectionJoint
            key={i}
            body1={targetRef}
            body2={ref}
            pos1={i === 0 ? [0, 0, 0] : [0, -SEGMENT_LENGTH, 0]}
            pos2={[0, SEGMENT_LENGTH, 0]}
          />
        );
      })}

      {/* Joint for Card */}
      <ConnectionJoint
        body1={segmentRefs.current[length - 1]}
        body2={cardRef}
        pos1={[0, -SEGMENT_LENGTH, 0]}
        pos2={[0, 1.0, 0]}
      />

      <CardBody cardRef={cardRef} count={length}>
        {children}
      </CardBody>

      <RopeUpdater
        anchorRef={anchorRef}
        cardRef={cardRef}
        segmentRefs={segmentRefs}
        points={points}
      />
    </group>
  );
}

interface RopeSegmentProps {
  index: number;
  selfRef: React.RefObject<RapierRigidBody>;
}

function RopeSegment({ index, selfRef }: RopeSegmentProps) {
  const initialPos = [0, 4 - (index + 1) * SEGMENT_LENGTH, 0] as [
    number,
    number,
    number
  ];

  return (
    <RigidBody
      ref={selfRef}
      position={initialPos}
      colliders="ball"
      args={[ROPE_RADIUS]}
      linearDamping={0.5}
      angularDamping={0.5}
      friction={0.1}
    >
      <mesh visible={false}>
        <sphereGeometry args={[ROPE_RADIUS]} />
      </mesh>
    </RigidBody>
  );
}

interface ConnectionJointProps {
  body1: React.RefObject<RapierRigidBody>;
  body2: React.RefObject<RapierRigidBody>;
  pos1: [number, number, number];
  pos2: [number, number, number];
}

function ConnectionJoint({ body1, body2, pos1, pos2 }: ConnectionJointProps) {
  useSphericalJoint(body1, body2, [pos1, pos2]);
  return null;
}

function RopeVisual({
  points,
  texture,
}: {
  points: THREE.Vector3[];
  texture: THREE.Texture;
}) {
  const lineRef = useRef<any>(null);
  useFrame(() => {
    if (lineRef.current) lineRef.current.setPoints(points);
  });

  return (
    <mesh>
      <meshLineGeometry ref={lineRef} />
      <meshLineMaterial
        lineWidth={0.1}
        color="#555555"
        map={texture}
        useMap={0}
        resolution={[800, 600]}
        sizeAttenuation={1}
      />
    </mesh>
  );
}

interface RopeUpdaterProps {
  anchorRef: React.RefObject<RapierRigidBody>;
  cardRef: React.RefObject<RapierRigidBody>;
  segmentRefs: React.MutableRefObject<React.RefObject<RapierRigidBody>[]>;
  points: THREE.Vector3[];
}

function RopeUpdater({
  anchorRef,
  cardRef,
  segmentRefs,
  points,
}: RopeUpdaterProps) {
  useFrame(() => {
    if (!anchorRef.current || !cardRef.current) return;

    const anchorPos = anchorRef.current.translation();
    points[0].set(anchorPos.x, anchorPos.y, anchorPos.z);

    segmentRefs.current.forEach((ref, i) => {
      if (ref.current) {
        const pos = ref.current.translation();
        if (points[i + 1]) points[i + 1].set(pos.x, pos.y, pos.z);
      }
    });
  });
  return null;
}

interface CardBodyProps {
  cardRef: React.RefObject<RapierRigidBody>;
  count: number;
  children: React.ReactNode;
}

function CardBody({ cardRef, count, children }: CardBodyProps) {
  const [isDragging, setIsDragging] = useState(false);
  const { camera } = useThree();

  const handlePointerDown = (e: any) => {
    e.stopPropagation();
    e.target.setPointerCapture(e.pointerId);
    setIsDragging(true);
    document.body.style.cursor = "grabbing";
  };

  const handlePointerUp = (e: any) => {
    setIsDragging(false);
    document.body.style.cursor = "grab";
  };

  useFrame((state) => {
    if (isDragging && cardRef.current) {
      const vec = new THREE.Vector3(state.pointer.x, state.pointer.y, 0.5);
      vec.unproject(camera);
      const dir = vec.sub(camera.position).normalize();
      const distance = -camera.position.z / dir.z;
      const pos = camera.position.clone().add(dir.multiplyScalar(distance));

      const currentPos = cardRef.current.translation();
      const diff = pos.sub(currentPos);

      cardRef.current.setLinvel(diff.multiplyScalar(10), true);
      cardRef.current.setAngvel({ x: 0, y: 0, z: 0 }, true);
      cardRef.current.wakeUp();
    }
  });

  return (
    <RigidBody
      ref={cardRef}
      position={[0, 4 - (count + 1) * SEGMENT_LENGTH - 1.0, 0]}
      type="dynamic"
      colliders="cuboid"
      linearDamping={0.5}
      angularDamping={0.5}
    >
      <group
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        onPointerOver={() => {
          document.body.style.cursor = "grab";
        }}
        onPointerOut={() => {
          document.body.style.cursor = "auto";
        }}
      >
        {children}
      </group>
    </RigidBody>
  );
}
