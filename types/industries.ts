export type IndustriesResponse = {
  data: Industries[];
  hasNextPage: boolean;
};

export type Industries = {
  id: number;
  name: string;
  revMultipleHarmonicMean: number;
  netMultipleHarmonicMean: number;
  revMultipleMedian: number;
  netMultipleMedian: number;
  netIncomeMultiples: number[];
  revenueMultiples: number[];
  count: number;
  createdAt: string;
  updatedAt: string;
};
