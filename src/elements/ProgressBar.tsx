import React from "react";

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  currentStep,
  totalSteps,
}) => {
  const progressPercentage = (currentStep / totalSteps) * 100;
  return (
    <div style={{ width: "100%", backgroundColor: "#f3f3f3", height: "10px" }}>
      <div
        style={{
          width: `${progressPercentage}%`,
          backgroundColor: "#4caf50",
          height: "100%",
        }}
      />
    </div>
  );
};

export default ProgressBar;
