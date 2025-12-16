import React from "react";
import { helix } from "ldrs";
import { useProgress } from "@react-three/drei";

helix.register();

const Loader = () => {
  const { progress } = useProgress();

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <l-helix size="80" speed="2.5" color="white"></l-helix>
      <p style={{ color: "white", marginTop: "22px" }}>
        {progress.toFixed(0)}%
      </p>
    </div>
  );
};

export default Loader;
