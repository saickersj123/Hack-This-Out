import { IoGameControllerOutline } from "react-icons/io5";
import { FaAws, FaGithub, FaReact, FaUsers } from "react-icons/fa";
import { GrCloudComputer } from "react-icons/gr";
import { RiEmotionHappyFill } from "react-icons/ri";
import { SiExpress, SiOpenvpn } from "react-icons/si";
import { TbBrandMongodb } from "react-icons/tb";
// 타입 정의
export interface Header {
  title: string;
  paragraph: string;
}

export interface About {
  paragraph: string;
  Why: string[];
  Why2: string[];
}

export interface GalleryItem {
  title: string;
  largeImage: string;
  smallImage: string;
}

export interface Service {
  icon: React.ReactNode;
  name: string;
  text: string;
}

export interface Testimonial {
  img: string;
  text: string;
  name: string;
}

export interface TeamMember {
  img: string;
  name: string;
  job: string;
}

export interface Contact {
  email: string;
  github: string;
}

export interface Feature {
  icon: React.ReactNode;
  title: string;
  text: string;
}

// 데이터 객체 타입
export interface LandingPageData {
  Header: Header;
  About: About;
  Gallery: GalleryItem[];
  Services: Service[];
  Testimonials: Testimonial[];
  Team: TeamMember[];
  Contact: Contact;
  Features: Feature[];
}

// 데이터 정의
export const landingPageData: LandingPageData = {
  Header: {
    title: "Hack This Out",
    paragraph:
      "Web-based Hacking Lab\nImagineer Project 2024, SCNU",
  },
  About: {
    paragraph:
      "Hack This Out is a web-based Hacking Lab.\nWe provide a Secure Network and Virtual Environment for your journey to become a hacker or cyber security enthusiast.\nThe journey can be rough and exhausting, so we prepared Gaming experience for you.",
    Why: ["Easy to Use", "Play and Compete", "Safe and Secure", "Study and Practice"],
    Why2: ["User-friendly Interface", "Gaming Experience", "Secure Network", "Virtual Environment"],
  },
  Gallery: [
    { title: "Project Title", largeImage: "img/portfolio/01-large.jpg", smallImage: "img/portfolio/01-small.jpg" },
    { title: "Project Title", largeImage: "img/portfolio/02-large.jpg", smallImage: "img/portfolio/02-small.jpg" },
    { title: "Project Title", largeImage: "img/portfolio/03-large.jpg", smallImage: "img/portfolio/03-small.jpg" },
    { title: "Project Title", largeImage: "img/portfolio/04-large.jpg", smallImage: "img/portfolio/04-small.jpg" },
    { title: "Project Title", largeImage: "img/portfolio/05-large.jpg", smallImage: "img/portfolio/05-small.jpg" },
    { title: "Project Title", largeImage: "img/portfolio/06-large.jpg", smallImage: "img/portfolio/06-small.jpg" },
    { title: "Project Title", largeImage: "img/portfolio/07-large.jpg", smallImage: "img/portfolio/07-small.jpg" },
    { title: "Project Title", largeImage: "img/portfolio/08-large.jpg", smallImage: "img/portfolio/08-small.jpg" },
    { title: "Project Title", largeImage: "img/portfolio/09-large.jpg", smallImage: "img/portfolio/09-small.jpg" },
  ],
  Services: [
    {
      icon: <FaReact />,
      name: "Frontend",
      text: "Easy to use and Responsive, Interactive Interface using React.",
    },
    {
      icon: <SiExpress />,
      name: "Backend",
      text: "Secure and Scalable Backend using Node.js and Express.",
    },
    {
      icon: <TbBrandMongodb />,
      name: "Database",
      text: "Simple and Scalable NoSQL Database using MongoDB.",
    },
    {
      icon: <FaAws />,
      name: "Virtual Machines",
      text: "Secure and Sustaiable Virtural Machine ecosystem for Hacking Lab using AWS.",
    },
    {
      icon: <SiOpenvpn />,
      name: "Virtual Network",
      text: "Secured and Quarantined Network for Hacking Lab using OpenVPN.",
    },
    {
      icon: <FaGithub />,
      name: "CI/CD Pipeline",
      text: "Automated CI/CD Pipeline for Hacking Lab using GitHub Actions.",
    },
  ],
  Testimonials: [
    {
      img: "img/testimonials/01.jpg",
      text: '"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis sed dapibus leo nec ornare diam sedasd commodo nibh ante facilisis bibendum dolor feugiat at."',
      name: "Sangjin Park",
    },
    {
      img: "img/testimonials/02.jpg",
      text: '"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis sed dapibus leo nec ornare diam sedasd commodo nibh ante facilisis bibendum dolor feugiat at."',
      name: "Kangmin Lee",
    },
    {
      img: "img/testimonials/03.jpg",
      text: '"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis sed dapibus leo nec ornare diam sedasd commodo nibh ante facilisis bibendum dolor feugiat at."',
      name: "Jiwoo Park",
    },
    {
      img: "img/testimonials/04.jpg",
      text: '"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis sed dapibus leo nec ornare diam sedasd commodo nibh ante facilisis bibendum dolor feugiat at."',
      name: "Jeongjin Mun",
    },
    {
      img: "img/testimonials/05.jpg",
      text: '"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis sed dapibus leo nec ornare diam sedasd commodo nibh ante facilisis bibendum dolor feugiat at."',
      name: "Seungmin Lee",
    },
    {
      img: "img/testimonials/06.jpg",
      text: '"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis sed dapibus leo nec ornare diam sedasd commodo nibh ante facilisis bibendum dolor feugiat at."',
      name: "Undoe Yun",
    },
  ],
  Team: [
    { img: "img/team/00.jpg", name: "Sangjin Park", job: "Project Lead, Developer" },
    { img: "img/team/01.jpg", name: "Kangmin Lee", job: "Developer" },
    { img: "img/team/02.jpg", name: "Jiwoo Park", job: "Developer" },
    { img: "img/team/03.jpg", name: "Jeongjin Mun", job: "Developer" },
    { img: "img/team/04.jpg", name: "Seungmin Lee", job: "Developer" },
    { img: "img/team/05.jpg", name: "Undoe Yun", job: "Developer" },
  ],
  Contact: {
    email: "hackthisout123@gmail.com",
    github: "https://github.com/saickersj123/Hack-This-Out",
  },
  Features: [
    {
      icon: <FaUsers />,
      title: "User Management",
      text: "User Management system for managing users and their permissions safely.",
    },
    {
      icon: <GrCloudComputer />,
      title: "Virtual Environment",
      text: "Secured Network and Virtual environment for web-based Hacking Lab.",
    },
    {
      icon: <IoGameControllerOutline />,
      title: "Gaming Experience",
      text: "Fun and interesting Gaming experience for practicing hacking and your skills.",
    },
    {
      icon: <RiEmotionHappyFill />,
      title: "User-friendly Interface",
      text: "User-friendly interface for easy navigation and usage.",
    },
  ],
};
