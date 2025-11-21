"use client";

import { SubmitHandler, useForm } from "react-hook-form";
import Button from "../common/Button";
import Select from "../common/Select";

type SearchInput = {
  industry: string;
  priceRange: string;
  moreFilters: string;
  searchValue: string;
};

export default function SearchPageForm() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<SearchInput>();

  const onSubmit: SubmitHandler<SearchInput> = function (data) {};

  return (
    <section className="section section_search">
      <div className="page_width search_form">
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            {...register("searchValue")}
            type="text"
            placeholder="Search city, country, or state"
          />

          <Select
            optionsClass="absolute"
            {...register("industry")}
            setFormValue={(option) => setValue("industry", option)}
            placeholder="Industry / Sector"
            options={["Retail", "Ecommerce"]}
          />

          <Select
            optionsClass="absolute"
            {...register("priceRange")}
            setFormValue={(option) => setValue("priceRange", option)}
            placeholder="Price Range"
            options={["2000", "3000"]}
          />

          <Select
            optionsClass="absolute"
            {...register("moreFilters")}
            setFormValue={(option) => setValue("moreFilters", option)}
            placeholder="More Filters"
            options={["2000", "3000"]}
          />

          <Button className="btn btn-secondary btn-small">Clear</Button>

          <Button className="btn btn-primary btn-medium">Search</Button>
        </form>
      </div>
    </section>
  );
}
