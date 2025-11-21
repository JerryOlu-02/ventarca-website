import z from "zod";

export const SearchSchema = z.object({
  location: z.string().min(1, "Please fill search field"),
  industry: z.string().optional(),
  priceRange: z.string().optional(),
  moreFilters: z.string().optional(),
});

export type SearchInput = z.infer<typeof SearchSchema>;
