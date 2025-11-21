type ListingCardResponse = {
  id: number;
  visibility: string;
  valuation: {
    askingPrice: number;
  };
  mediaAndDocumentation: string;
  businessInfo: {
    headline: string;
    industries: string[];
    location: string;
  };
};
