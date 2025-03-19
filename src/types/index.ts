
export type SurahType = "meccan" | "medinan";

export interface TajweedRule {
  id: number;
  name: string;
  arabicName: string;
  description: string;
  example: string;
  color: string;
}

export interface ArabicLesson {
  id: number;
  title: string;
  description: string;
  level: "beginner" | "intermediate" | "advanced";
  duration: number; // in minutes
  progress?: number;
  category: string; // Added this property
  content: string; // Added this property
}
