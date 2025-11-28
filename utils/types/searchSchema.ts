import z from "zod";

export const SearchSchema = z.object({
  location: z.string().optional(),
  industry: z.string().optional(),
  priceRange: z.string().optional(),
  moreFilters: z.string().optional(),
  sort: z.string().optional(),
  page: z.number().optional(),
});

export type SearchInput = z.infer<typeof SearchSchema>;
