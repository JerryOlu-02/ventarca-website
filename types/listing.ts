export type ListingSearchResponse = {
  data: ListingCardResponse[];
  hasNextPage: boolean;
  total: number;
};

export type ListingCardResponse = {
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

export type ListingDetailResponse = {
  id: number;
  progress: string;
  currentStep: string;
  completedSteps: [];
  requireNda: boolean;
  allowFeaturedPromotion: boolean;
  visibility: string;
  contactOption: string;
  user: {
    id: number;
    firstName: string;
    lastName: string;
    phoneNumber: string | null;
    role: {
      id: number;
      name: string;
      __entity: string;
    };
    status: {
      id: number;
      name: string;
      __entity: string;
    };
    createdAt: string;
    updatedAt: string;
    deletedAt: string | null;
  };
  businessHighlights: {
    id: number;
    executiveSummary: string;
    valueProposition: string;
    keyGrowthOpportunities: string;
    reasonForSelling: string;
    postSaleValueOffer: string;
    additionalInformation: string;
    createdAt: string;
    updatedAt: string;
    deletedAt: string | null;
  };
  financialHighlights: {
    id: 1;
    lastFyRevenue: 1200000;
    lastFyEBITDA: 350000;
    netIncome: 220000;
    debtsOrLiabilities: 150000;
    currency: string;
    listingId: 1;
    createdAt: string;
    updatedAt: string;
    deletedAt: string | null;
  };
  businessInfo: {
    id: number;
    headline: string;
    industryId: number;
    industry: {
      id: 1;
      name: string;
      netMultipleHarmonicMean: string;
      revMultipleHarmonicMean: string;
      netMultipleMedian: string;
      revMultipleMedian: string;
      revenueMultiples: number[];
      netIncomeMultiples: number[];
      count: 3;
      createdAt: string;
      updatedAt: string;
    };
    businessModel: string;
    dateFounded: string;
    location: string;
    employeeCount: string;
    createdAt: string;
    updatedAt: string;
    deletedAt: string | null;
  };
  mediaAndDocumentation: {
    listingCoverImage: {
      path: string;
    };
    listingImages: [
      {
        id: string;
        path: string;
      }
    ];
  };
  valuation: {
    id: number;
    askingPrice: number;
    methodOfValuation: string | null;
    negotiable: boolean;
    negotiableRange: string;
  };
  createdAt: "2025-11-21T12:12:05.023Z";
  updatedAt: "2025-11-21T12:12:05.034Z";
  deletedAt: null;
};
