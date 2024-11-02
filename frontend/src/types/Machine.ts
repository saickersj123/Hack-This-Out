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
  // Add other relevant fields as necessary
}
