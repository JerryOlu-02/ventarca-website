import { StaticImageData } from "next/image";

export interface Ticket {
  referenceId: string;
  status: string;
  category: string;
  subCategory: string;
  email: string;
  createdAt: string;
}

export interface Broker {
  id: number;
  name: string;
  role: string;
  location: string;
  image: StaticImageData;
}

export interface Tag {
  id: number;
  name: string;
  image: StaticImageData;
}

export interface RecentStory {
  id: number;
  tag: string;
  title: string;
  writer: string;
  image: StaticImageData;
}
