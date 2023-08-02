import {
  Document,
  Home,
  Images,
  Others,
  Star,
  Trash,
  Vedios,
} from "@/icons/icons";

export const sidebarData = [
  {
    id: 1,
    name: "Home",
    icon: Home,
    path: "/",
  },
  {
    id: 2,
    name: "Starred",
    icon: Star,
    path: "/starred",
  },
];

export const asidebarData = [
  {
    id: 1,
    name: "Images",
    icon: Images,
    numberOfFiles: "10",
    size: "1 MB",
  },
  {
    id: 2,
    name: "Videos",
    icon: Vedios,
    numberOfFiles: "10",
    size: "2 MB",
  },
  {
    id: 3,
    name: "Documents",
    icon: Document,
    numberOfFiles: "10",
    size: "5 MB",
  },
  {
    id: 4,
    name: "Others",
    icon: Others,
    numberOfFiles: "10",
    size: "1 MB",
  },
];
