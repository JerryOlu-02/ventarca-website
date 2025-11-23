type ListingSearchResponse = {
  data: ListingCardResponse[];
  hasNextPage: boolean;
};

type ListingCardResponse = {
  id: number;
  visibility: string;
  valuation: {
    askingPrice: number;
  };
  mediaAndDocumentation: {
    listingCoverImage: {
      path: string;
    };
  };
  businessInfo: {
    headline: string;
    industry: {
      name: string;
    };
    location: string;
  };

  financialHighlights: {
    lastFyRevenue: number;
    lastFyEBITDA: number;
    currency: string;
  };
};
