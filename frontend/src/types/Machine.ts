/**
 * Interface representing the details of a machine.
 */
export interface MachineDetail {
  _id: string;
  name: string;
  category: string;
  description?: string;
  exp: number;
  amiId?: string;
  rating: number;
  // Add other relevant fields as necessary
}

export interface Review {
  _id: string;
  reviewerId: string;
  reviewerName: string;
  rating: number;
  content: string;
  createdAt: string;
}

export interface MachineforBanner {
  _id: string;
  name: string;
  category: string;
  exp: number;
  rating: number;
  playerCount: number;
  isActive: boolean;
  createdAt: string;
}