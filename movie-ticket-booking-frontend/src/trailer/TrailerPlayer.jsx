import React from "react";
import { useParams } from "react-router-dom";

const TrailerPlayer = () => {
  const { id } = useParams();
  // Example YouTube trailer IDs (replace with your own)
  const videoId = id === "1" ? "YoHD9XEInc0" : "zSWdZVtXT7E";

  return (
    <div style={{ position: "relative", paddingBottom: "56.25%", height: 0 }}>
      <iframe
        src={`https://www.youtube.com/embed/${videoId}`}
        title="Movie Trailer"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
        }}
      />
    </div>
  );
};

export default TrailerPlayer;
