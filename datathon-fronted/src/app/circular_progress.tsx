import React from "react";

interface CircularProgressProps {
  size?: number; // Taille du cercle
  strokeWidth?: number; // Épaisseur du cercle
  progress?: number; // Progression (en pourcentage de 0 à 100)
  color?: string; // Couleur du cercle de progression
  infinite?: boolean; // Indicateur de progression infinie
}

const CircularProgress: React.FC<CircularProgressProps> = ({
  size = 100,
  strokeWidth = 10,
  progress = 0,
  color = "#000",
  infinite = false,
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      className={`circular-progress ${
        infinite ? "circular-progress--infinite" : ""
      }`}
    >
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        stroke="#e6e6e6"
        strokeWidth={strokeWidth}
        fill="none"
      />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        stroke={color}
        strokeWidth={strokeWidth}
        fill="none"
        strokeDasharray={circumference}
        strokeDashoffset={infinite ? 0 : offset}
        strokeLinecap="round"
        transform={`rotate(-90 ${size / 2} ${size / 2})`}
        className={infinite ? "circular-progress__circle--infinite" : ""}
      />
      {infinite && (
        <style>{`
          .circular-progress__circle--infinite {
            animation: circular-progress-spin 1.5s linear infinite;
          }

          @keyframes circular-progress-spin {
            0% { stroke-dashoffset: ${circumference}; }
            100% { stroke-dashoffset: 0; }
          }
        `}</style>
      )}
    </svg>
  );
};

export default CircularProgress;