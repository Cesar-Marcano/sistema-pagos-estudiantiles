import { User } from "./user.model";

interface RawGrade {
  id: number;
  name: string;
  description?: string;
  hasLevels: boolean;
  maxLevel?: number;
  fee: number;

  createdBy: number | User;

  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

interface GradeWithLevels extends RawGrade {
  hasLevels: true;
  maxLevel: number;
}

interface GradeWithoutLevels extends RawGrade {
  hasLevels: false;
  maxLevel?: never;
}

export type Grade = GradeWithLevels | GradeWithoutLevels;
