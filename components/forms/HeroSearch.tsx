"use client";

import Button from "../common/Button";
import Select from "../common/Select";

import { useRouter } from "next/navigation";

import { SearchInput, SearchSchema } from "@/utils/types/searchSchema";

import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

export default function HeroSearch() {
  const router = useRouter();

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
      }${data.priceRange ? `&priceRange=${data.priceRange}` : ""}`
    );
  };

  const handleClickSubmit = () => {
    if (errors.location) alert("Please Fill a location");
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
        options={["Retail", "Saas"]}
      />

      <Select
        containerClass="big"
        {...register("priceRange")}
        setFormValue={(option) => setValue("priceRange", option)}
        placeholder="Price Range"
        options={["2000-3000", "3000-4000"]}
      />

      <Button
        onClick={handleClickSubmit}
        type="submit"
        className="btn btn-primary btn-medium"
      >
        Search
      </Button>
    </form>
  );
}
