import { IndustriesResponse } from "@/types/industries";
import { industriesFake } from "@/utils/arrays";

let industries: string[];

export const setIndustries = function (
  industriesResponse: IndustriesResponse | undefined
) {
  if (!industriesResponse) {
    return (industries = industriesFake);
  }

  const industriesString = industriesResponse.data.map(
    (industry) => industry.name
  );
  industries = industriesString;
};

export const getIndustries = function () {
  return industries;
};
