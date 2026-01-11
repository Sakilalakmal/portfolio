declare module "meshline" {
  import {
    BufferGeometry,
    ShaderMaterial,
    ColorRepresentation,
    Vector3,
  } from "three";

  export class MeshLine extends BufferGeometry {
    setPoints(points: Vector3[] | Float32Array): void;
  }

  export class MeshLineMaterial extends ShaderMaterial {
    constructor(params?: {
      color?: ColorRepresentation;
      lineWidth?: number;
      opacity?: number;
      transparent?: boolean;
      resolution?: [number, number]; // often needed for meshline
      sizeAttenuation?: number;
      [key: string]: any;
    });
  }
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      meshLine: any;
      meshLineMaterial: any;
    }
  }
}
