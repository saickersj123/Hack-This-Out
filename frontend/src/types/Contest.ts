/**
 * Interface representing a machine associated with a contest.
 */
export interface Machine {
  _id: string;
  name: string;
}

/**
 * Interface representing the details of a contest.
 */
export interface ContestDetail {
  _id: string;
  name: string;
  description: string;
  contestExp: number;
  machines: Machine[];
  startTime: string;
  endTime: string;
  isActive: boolean;
} 