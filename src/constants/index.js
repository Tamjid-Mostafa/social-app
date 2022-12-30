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
  
  
];

export const Menus = [
    { title: "Inbox", src: Chat },
    { title: "Accounts", src: User, gap: true },
    { title: "Schedule ", src: Calendar },
    { title: "Search", src: Search },
    { title: "Files ", src: Folder, gap: true },
    { title: "Setting", src: Setting },
  ];



  export const footerLinks = [
    {
      title: "Useful Links",
      links: [
        {
          name: "Content",
          link: "#"
        },
        {
          name: "How it Works",
          link: "#"
        },
        {
          name: "Create",
          link: "#"
        },
        {
          name: "Explore",
          link: "#"
        },
        {
          name: "Terms & Services",
          link: "#"
        },
      ],
    },
    {
      title: "Community",
      links: [
        {
          name: "Help Center",
          link: "#"
        },
        {
          name: "Partners",
          link: "#"
        },
        {
          name: "Suggestions",
          link: "#"
        },
        {
          name: "Blog",
          link: "#"
        },
        {
          name: "Newsletters",
          link: "#"
        },
      ],
    },
    {
      title: "Partner",
      links: [
        {
          name: "Our Partner",
          link: "#"
        },
        {
          name: "Become a Partner",
          link: "#"
        },
      ],
    },
  ];


  
 

 




