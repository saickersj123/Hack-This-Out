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
        src: "/Tutorial"
    },
    {
        title: "Rankings",
        icon: <CiRouter />,
        src: "/Rankings"
    },
    {
        title: "Contest",
        icon: <TiStopwatch />,
        src: "/Contest"
    },
    {
        title: "Machines",
        icon: < PiComputerTower />,
        src: "/Machines"
    },
    {
        title: "Instances",
        icon: <GrCloudComputer />,
        src: "/Instances"
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