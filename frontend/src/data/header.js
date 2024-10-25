import { TiStopwatch } from "react-icons/ti";
import { CiReceipt } from "react-icons/ci";
import { CiRouter } from "react-icons/ci";

import { AiFillGithub } from "react-icons/ai";
import { AiFillYoutube } from "react-icons/ai";
import { AiOutlineInstagram } from "react-icons/ai";

import { PiComputerTower } from "react-icons/pi";
import { GrCloudComputer } from "react-icons/gr";


export const headerMenus = [
    {
        title: "Tutorial",
        icon: <CiReceipt />,
        src: "/tutorial"
    },
    {
        title: "Leaderboard",
        icon: <CiRouter />,
        src: "/leaderboard"
    },
    {
        title: "Contest",
        icon: <TiStopwatch />,
        src: "/contest"
    },
    {
        title: "Machines",
        icon: < PiComputerTower />,
        src: "/machines"
    },
    {
        title: "Instances",
        icon: <GrCloudComputer />,
        src: "/instances"
    }
];

export const searchKeyword = [
    {
        title: "HTML",
        src: "/search/html"
    },
    {
        title: "CSS",
        src: "/search/css"
    },
    {
        title: "JavaScript",
        src: "/search/javascript"
    },
    {
        title: "React.js",
        src: "/search/react.js"
    },
    {
        title: "Vue.js",
        src: "/search/vue.js"
    },
    {
        title: "Next.js",
        src: "/search/next.js"
    },
    {
        title: "Node.js",
        src: "/search/node.js"
    },
    {
        title: "SQL",
        src: "/search/sql"
    },
    {
        title: "music",
        src: "/search/NewJeans"
    }
];

export const snsLink = [
    {
        title: "github",
        url: "https://github.com/",
        icon: <AiFillGithub />
    },
    {
        title: "youtube",
        url: "https://www.youtube.com/",
        icon: <AiFillYoutube />
    },
    {
        title: "instagram",
        url: "https://www.instagram.com",
        icon: <AiOutlineInstagram />
    },
]