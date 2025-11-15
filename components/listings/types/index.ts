import { StaticImageData } from "next/image";

export interface Listing {
  id: number;
  image: StaticImageData;
  name: string;
  location: string;
  tags: string[];
  price: string;
  revenue: string;
  profit: string;
}

export interface ListingDetailProp extends Listing {
  listingPhotos?: StaticImageData[];
  sellerImage?: StaticImageData;
  sellerLocation: string;
  sellerName: string;
  aboutBusiness: string;
  avgMonthlyProfit: string;
  opportunities: string[];
  risks: string[];
  skillsRequired: string[];
  saleReason: string[];
  postAcquisitionSupport?: string[];
  businessStartedDate: string;
  verification: boolean;
}
