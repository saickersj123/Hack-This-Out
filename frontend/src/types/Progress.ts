import { Machine, Contest } from "./Contest";
import { User } from "./User";

export type UserProgress = {
    userProgress: UserProgressItem[];
};

export type UserProgressItem = {
    _id: number;
    user: User;
    machine: Machine;
    completed: boolean;
    completedAt?: Date;
    usedHints: string[];
    remainingHints: number;
    hintsUsed: number;
    expEarned: number;
    timeSpent: number;
};

export type ContestParticipation = {
    contestParticipation: ContestParticipationItem[];
};

export type ContestParticipationItem = {
    _id: number;
    user: User;
    contest: Contest;
    participationStartTime: Date;
    participationEndTime?: Date;
    hintsUsed: number;
    expEarned: number;
    machineCompleted: Machine[];
    contestCompleted: boolean;
};

