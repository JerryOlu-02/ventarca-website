"use client";

import Button from "../common/Button";
import Select from "../common/Select";

import { useRouter } from "next/navigation";

import { SearchInput, SearchSchema } from "@/utils/types/searchSchema";

import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "@/hooks/use-auth";
import { industriesFake } from "@/utils/arrays";

export default function HeroSearch() {
  const router = useRouter();
  const { industries } = useAuth();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<Omit<SearchInput, "moreFilters">>({
    resolver: zodResolver(SearchSchema),
  });

  const onSubmit: SubmitHandler<Omit<SearchInput, "moreFilters">> = function (
    data
  ) {
    // console.log(data);

    router.push(
      `/search?location=${data.location}${
        data.industry ? `&industry=${data.industry}` : ""
      }${data.priceRange ? `&priceRange=${data.priceRange}` : ""}&page=1`
    );
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="hero_search">
      <input
        type="text"
        {...register("location", { required: true })}
        placeholder="Search City, County, State"
      />

      <Select
        containerClass="big"
        {...register("industry")}
        setFormValue={(option) => setValue("industry", option)}
        placeholder="Industry / Sector"
        options={industries ? industries : industriesFake}
      />

      <Select
        containerClass="big"
        {...register("priceRange")}
        setFormValue={(option) => setValue("priceRange", option)}
        placeholder="Price Range"
        options={[
          "80000-200000",
          "200000-400000",
          "400000-600000",
          "600000-800000",
          "800000-1000000",
          "1000000-3000000",
          "3000000-5000000",
        ]}
        currency
      />

      <Button type="submit" className="btn btn-primary btn-medium">
        Search
      </Button>
    </form>
  );
}
