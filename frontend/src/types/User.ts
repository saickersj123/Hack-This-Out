export interface User {
    _id: string;
    level: number;
    username: string;
    exp: number;
    avatar: string;
    rank?: number;
}