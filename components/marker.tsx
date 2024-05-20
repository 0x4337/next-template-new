import React from "react";

interface CustomMarkerProps {
  longitude: number;
  latitude: number;
  onDragStart?: (e: React.DragEvent<HTMLDivElement>) => void;
  onDrag?: (e: React.DragEvent<HTMLDivElement>) => void;
  onDragEnd?: (e: React.DragEvent<HTMLDivElement>) => void;
}

const CustomMarker: React.FC<CustomMarkerProps> = ({ longitude, latitude, onDragStart, onDrag, onDragEnd }) => {
  const markerStyle: React.CSSProperties = {
    position: "absolute",
    transform: "translate(-50%, -50%)",
    cursor: "pointer",
    background: "red",
    width: "20px",
    height: "20px",
    borderRadius: "50%",
  };

  return <div style={markerStyle} draggable onDragStart={onDragStart} onDrag={onDrag} onDragEnd={onDragEnd} />;
};

export default CustomMarker;
