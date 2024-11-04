import { ReactNode } from "react";
import { TiStopwatch } from "react-icons/ti";
import { CiReceipt, CiRouter } from "react-icons/ci";
import { AiFillGithub, AiFillYoutube, AiOutlineInstagram } from "react-icons/ai";
import { PiComputerTower } from "react-icons/pi";

// Type Definitions

/**
 * Represents a header menu item.
 */
export interface HeaderMenu {
  title: string;
  icon: ReactNode;
  src: string;
}

/**
 * Represents a search keyword item.
 */
export interface SearchKeyword {
  title: string;
  src: string;
}

/**
 * Represents an SNS link item.
 */
export interface SnsLink {
  title: string;
  url: string;
  icon: ReactNode;
}

// Data Arrays

export const headerMenus: HeaderMenu[] = [
  {
    title: "Tutorial",
    icon: <CiReceipt />,
    src: "/tutorial",
  },
  {
    title: "Leaderboard",
    icon: <CiRouter />,
    src: "/leaderboard",
  },
  {
    title: "Contest",
    icon: <TiStopwatch />,
    src: "/contest",
  },
  {
    title: "Machines",
    icon: <PiComputerTower />,
    src: "/machines",
  },
];

export const searchKeyword: SearchKeyword[] = [
  {
    title: "HTML",
    src: "/search/html",
  },
  {
    title: "CSS",
    src: "/search/css",
  },
  {
    title: "JavaScript",
    src: "/search/javascript",
  },
  {
    title: "React.js",
    src: "/search/react.js",
  },
  {
    title: "Vue.js",
    src: "/search/vue.js",
  },
  {
    title: "Next.js",
    src: "/search/next.js",
  },
  {
    title: "Node.js",
    src: "/search/node.js",
  },
  {
    title: "SQL",
    src: "/search/sql",
  },
  {
    title: "music",
    src: "/search/NewJeans",
  },
];

export const snsLink: SnsLink[] = [
  {
    title: "github",
    url: "https://github.com/",
    icon: <AiFillGithub />,
  },
  {
    title: "youtube",
    url: "https://www.youtube.com/",
    icon: <AiFillYoutube />,
  },
  {
    title: "instagram",
    url: "https://www.instagram.com",
    icon: <AiOutlineInstagram />,
  },
];