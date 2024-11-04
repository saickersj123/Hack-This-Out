/**
 * Interface representing the details of a machine.
 */
export interface MachineDetail {
  _id: string;
  name: string;
  category: string;
  description?: string;
  exp: number;
  amiId: string;
  rating: number;
  // Add other relevant fields as necessary
}

export interface Review {
  reviewerId: string;
  reviewerName: string;
  rating: number;
  content: string;
}
