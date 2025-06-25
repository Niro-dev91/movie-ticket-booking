import React, { useEffect, useState } from "react";

export default function UserScore({ score }) {
  const percentage = Math.round(score * 10);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 800;
    const increment = percentage / (duration / 16);

    const interval = setInterval(() => {
      start += increment;
      if (start >= percentage) {
        start = percentage;
        clearInterval(interval);
      }
      setProgress(Math.round(start));
    }, 16);

    return () => clearInterval(interval);
  }, [percentage]);

  const radius = 28;
  const circumference = 2 * Math.PI * radius;
  const dashOffset = circumference - (progress / 100) * circumference;

  return (
    <div className="flex items-center gap-3">
      {/* Circle with animated percentage */}
      <div className="relative w-20 h-20">
        <svg width="80" height="80" className="transform -rotate-90">
          <circle
            cx="40"
            cy="40"
            r={radius}
            stroke="gray"
            strokeWidth="6"
            fill="transparent"
          />
          <circle
            cx="40"
            cy="40"
            r={radius}
            stroke="gold"
            strokeWidth="6"
            fill="transparent"
            strokeDasharray={circumference}
            strokeDashoffset={dashOffset}
            strokeLinecap="round"
            style={{ transition: "stroke-dashoffset 0.3s ease" }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-white font-bold text-base">{progress}%</span>
        </div>
      </div>

      {/* Label OUTSIDE the circle */}
      <p className="text-sm text-gray-300">User Score</p>
    </div>
  );
}
