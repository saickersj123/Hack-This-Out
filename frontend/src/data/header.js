import { CiUser } from "react-icons/ci";
import { CiBank } from "react-icons/ci";
import { CiReceipt } from "react-icons/ci";
import { CiDumbbell } from "react-icons/ci";
import { CiRouter } from "react-icons/ci";

import { AiFillGithub } from "react-icons/ai";
import { AiFillYoutube } from "react-icons/ai";
import { AiOutlineInstagram } from "react-icons/ai";

export const headerMenus = [
    {
        title: "Tutorial",
        icon: <CiReceipt />,
        src: "/Tutorial"
    },
    {
        title: "Challenges",
        icon: <CiDumbbell />,
        src: "/Challenges"
    },
    {
        title: "Upload",
        icon: <CiDumbbell />,
        src: "/Upload"
    },
    {
        title: "Rankings",
        icon: <CiRouter />,
        src: "/Rankings"
    },
    {
        title: "Makers",
        icon: <CiUser />,
        src: "/Makers"
    },
    {
        title: "Academy",
        icon: <CiBank />,
        src: "/Academy"
    },
    {
        title: "Universities",
        icon: <CiBank />,
        src: "/Universities"
    },
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