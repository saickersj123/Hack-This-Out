import { PiWechatLogoFill } from "react-icons/pi";
import { IoCloudDownloadOutline } from "react-icons/io5";

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
  address: string;
  phone: string;
  email: string;
  facebook: string;
  twitter: string;
  youtube: string;
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
    title: "Hack This Out 2024",
    paragraph:
      "Web-based Hacking Lab SCNU Imagineer Project"
  },
  About: {
    paragraph:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    Why: ["Lorem ipsum dolor", "Tempor incididunt", "Lorem ipsum dolor", "Incididunt ut labore"],
    Why2: ["Aliquip ex ea commodo", "Lorem ipsum dolor", "Exercitation ullamco", "Lorem ipsum dolor"],
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
      icon: <IoCloudDownloadOutline />,
      name: "Lorem ipsum dolor",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis sed dapibus leo nec ornare diam sedasd commodo nibh ante facilisis bibendum dolor feugiat at.",
    },
    {
      icon: <IoCloudDownloadOutline />,
      name: "Consectetur adipiscing",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis sed dapibus leo nec ornare diam sedasd commodo nibh ante facilisis bibendum dolor feugiat at.",
    },
    {
      icon: <IoCloudDownloadOutline />,
      name: "Lorem ipsum dolor",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis sed dapibus leo nec ornare diam sedasd commodo nibh ante facilisis bibendum dolor feugiat at.",
    },
    {
      icon: <IoCloudDownloadOutline />,
      name: "Consectetur adipiscing",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis sed dapibus leo nec ornare diam sedasd commodo nibh ante facilisis bibendum dolor feugiat at.",
    },
    {
      icon: <IoCloudDownloadOutline />,
      name: "Lorem ipsum dolor",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis sed dapibus leo nec ornare diam sedasd commodo nibh ante facilisis bibendum dolor feugiat at.",
    },
    {
      icon: <IoCloudDownloadOutline />,
      name: "Consectetur adipiscing",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis sed dapibus leo nec ornare diam sedasd commodo nibh ante facilisis bibendum dolor feugiat at.",
    },
  ],
  Testimonials: [
    {
      img: "img/testimonials/01.jpg",
      text: '"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis sed dapibus leo nec ornare diam sedasd commodo nibh ante facilisis bibendum dolor feugiat at."',
      name: "John Doe",
    },
    {
      img: "img/testimonials/02.jpg",
      text: '"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis sed dapibus leo nec ornare diam sedasd commodo nibh ante facilisis bibendum dolor feugiat at."',
      name: "Johnathan Doe",
    },
    {
      img: "img/testimonials/03.jpg",
      text: '"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis sed dapibus leo nec ornare diam sedasd commodo nibh ante facilisis bibendum dolor feugiat at."',
      name: "John Doe",
    },
    {
      img: "img/testimonials/04.jpg",
      text: '"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis sed dapibus leo nec ornare diam sedasd commodo nibh ante facilisis bibendum dolor feugiat at."',
      name: "Johnathan Doe",
    },
    {
      img: "img/testimonials/05.jpg",
      text: '"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis sed dapibus leo nec ornare diam sedasd commodo nibh ante facilisis bibendum dolor feugiat at."',
      name: "John Doe",
    },
    {
      img: "img/testimonials/06.jpg",
      text: '"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis sed dapibus leo nec ornare diam sedasd commodo nibh ante facilisis bibendum dolor feugiat at."',
      name: "Johnathan Doe",
    },
  ],
  Team: [
    { img: "img/team/01.jpg", name: "John Doe", job: "Director" },
    { img: "img/team/02.jpg", name: "Mike Doe", job: "Senior Designer" },
    { img: "img/team/03.jpg", name: "Jane Doe", job: "Senior Designer" },
    { img: "img/team/04.jpg", name: "Karen Doe", job: "Project Manager" },
  ],
  Contact: {
    address: "4321 California St, San Francisco, CA 12345 ",
    phone: "+1 123 456 1234",
    email: "info@company.com",
    facebook: "fb.com",
    twitter: "twitter.com",
    youtube: "youtube.com",
  },
  Features: [
    {
      icon: <PiWechatLogoFill />,
      title: "Lorem ipsum",
      text: "Lorem ipsum dolor sit amet placerat facilisis felis mi in tempus eleifend pellentesque natoque etiam.",
    },
    {
      icon: <PiWechatLogoFill />,
      title: "Lorem ipsum",
      text: "Lorem ipsum dolor sit amet placerat facilisis felis mi in tempus eleifend pellentesque natoque etiam.",
    },
    {
      icon:<PiWechatLogoFill />,
      title: "Lorem ipsum",
      text: "Lorem ipsum dolor sit amet placerat facilisis felis mi in tempus eleifend pellentesque natoque etiam.",
    },
    {
      icon: <PiWechatLogoFill />,
      title: "Lorem ipsum",
      text: "Lorem ipsum dolor sit amet placerat facilisis felis mi in tempus eleifend pellentesque natoque etiam.",
    },
  ],
};
