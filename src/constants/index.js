import { FaHome, FaFileInvoice, FaEnvelope} from "react-icons/fa";
import { airbnb, binance, Calendar, Chart, Chart_fill, Chat, coinbase, Control, dropbox, facebook, Folder, icon, instagram, linkedin, logo, Search, Setting, twitter, User } from "../assets";

export const navLinks = [
  {
    id: "/",
    title: "Home",
    icon: <FaHome />,
  },
  {
    id: "/media",
    title: "Media",
    icon: <FaFileInvoice />,
  },
  {
    id: "/message",
    title: "Message",
    icon: <FaEnvelope />,
  },
  {
    id: "/login",
    title: "Log In",
    icon: <FaEnvelope />,
  },
  
  
];

export const Menus = [
    { title: "Inbox", src: Chat },
    { title: "Accounts", src: User, gap: true },
    { title: "Schedule ", src: Calendar },
    { title: "Search", src: Search },
    { title: "Files ", src: Folder, gap: true },
    { title: "Setting", src: Setting },
  ];


  
 
  
  export const socialMedia = [
    {
      id: "social-media-1",
      icon: instagram,
      link: "https://www.instagram.com/",
    },
    {
      id: "social-media-2",
      icon: facebook,
      link: "https://www.facebook.com/",
    },
    {
      id: "social-media-3",
      icon: twitter,
      link: "https://www.twitter.com/",
    },
    {
      id: "social-media-4",
      icon: linkedin,
      link: "https://www.linkedin.com/",
    },
  ];
  
  export const clients = [
    {
      id: "client-1",
      logo: airbnb,
    },
    {
      id: "client-2",
      logo: binance,
    },
    {
      id: "client-3",
      logo: coinbase,
    },
    {
      id: "client-4",
      logo: dropbox,
    },
  ];





