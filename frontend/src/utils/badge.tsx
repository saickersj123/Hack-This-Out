// Import all badge frame SVGs
import frame1 from '../assets/img/level/Level_1.svg';
import frame2 from '../assets/img/level/Level_2.svg';
import frame3 from '../assets/img/level/Level_3.svg';
import frame4 from '../assets/img/level/Level_4.svg';
import frame5 from '../assets/img/level/Level_5.svg';
import frame6 from '../assets/img/level/Level_6.svg';
import frame7 from '../assets/img/level/Level_7.svg';
import frame8 from '../assets/img/level/Level_8.svg';
import frame9 from '../assets/img/level/Level_9.svg';

// Import all rank badge SVGs
import rank1 from '../assets/img/badge/1.svg';
import rank2 from '../assets/img/badge/2.svg';
import rank3 from '../assets/img/badge/3.svg';
import rank4 from '../assets/img/badge/4.svg';
import rank5 from '../assets/img/badge/5.svg';
import rank6 from '../assets/img/badge/6.svg';
import rank7 from '../assets/img/badge/7.svg';
import rank8 from '../assets/img/badge/8.svg';
import rank9 from '../assets/img/badge/9.svg';

// Mapping of frame numbers to imported SVGs
export const levelFrames: { [key: number]: string } = {
    1: frame1,
    2: frame2,
    3: frame3,
    4: frame4,
    5: frame5,
    6: frame6,
    7: frame7,
    8: frame8,
    9: frame9,
};

// Mapping of rank ranges to badge frames
export const rankBadges: { [key: number]: string } = {
    // Example: Top 1-10 ranks use frame1, 11-20 use frame2, etc.
    1: rank9,
    2: rank8,
    3: rank7,
    4: rank6,
    5: rank5,
    6: rank4,
    7: rank3,
    8: rank2,
    9: rank1,
};

export const getLevelFrame = (level: number): number => {
    const totalFrames = 9;
    if (level < 1) return 1; // Default to frame 1 for levels below 1
    if (level === 20) return totalFrames; // Assign the last frame for max level
    return ((level - 1) % totalFrames) + 1; // Cycle through frames 1 to 9
};

// Function to determine rank frame based on rank
export const getRankBadge = (rank: number): number => {
    switch (rank) {
        case 1: return 1;
            case 2: return 2;
            case 3: return 3;
            case 4: return 4;
            case 5: return 5;
            case 6: return 6;
            case 7: return 7;
            case 8: return 8;
        default: return 9;
    }
};