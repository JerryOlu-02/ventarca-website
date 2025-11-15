import { createStore } from "zustand/vanilla";

export type SearchState = {
  industry: string;
  priceRange: string;
};

export type SearchAction = {
  setIndustry: () => void;
  setPriceRange: () => void;
};

export type SearchStore = SearchState & SearchAction;

export const defaultInitState: SearchState = {
  industry: "",
  priceRange: "",
};

export const createSearchStore = (
  initialState: SearchState = defaultInitState
) => {
  return createStore<SearchStore>()((set) => ({
    ...initialState,
    setIndustry: () => set((state) => ({ industry: state.industry })),
    setPriceRange: () => set((state) => ({ priceRange: state.priceRange })),
  }));
};
