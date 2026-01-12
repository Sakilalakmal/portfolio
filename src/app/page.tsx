import Desktop from "@/components/Desktop";

export default function Home() {
  return (
    <>
      <video
        autoPlay
        loop
        muted
        playsInline
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100vh",
          objectFit: "cover",
          zIndex: -1,
        }}
      >
        <source src="/live-wallpaper/port.mp4" type="video/mp4" />
      </video>
      <Desktop />
    </>
  );
}
