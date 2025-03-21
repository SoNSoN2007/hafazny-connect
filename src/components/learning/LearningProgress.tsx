
import React from 'react';
import { Progress } from "@/components/ui/progress";

interface LearningProgressProps {
  current: number;
  total: number;
}

const LearningProgress: React.FC<LearningProgressProps> = ({ current, total }) => {
  const progressPercentage = ((current + 1) / total) * 100;
  
  return (
    <div className="w-full mb-8">
      <div className="flex justify-between items-center mb-4">
        <span className="text-sm font-medium">Progress</span>
        <span className="text-sm font-medium">{Math.round(progressPercentage)}%</span>
      </div>
      <Progress value={progressPercentage} className="h-2" />
    </div>
  );
};

export default LearningProgress;
