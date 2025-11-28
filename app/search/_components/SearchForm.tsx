"use client";

import { SubmitHandler, useForm } from "react-hook-form";
import Button from "@/components/common/Button";
import Select from "@/components/common/Select";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import { industriesFake } from "@/utils/arrays";
import { simulateRequest } from "@/utils/simulateRequest";

type SearchInput = {
  location: string;
  industry: string;
  priceRange: string;
  moreFilters: string;
};

export default function SearchForm() {
  const [resetKey, setResetKey] = useState(0);
  const [pending, setPending] = useState(false);
  const router = useRouter();

  const { industries } = useAuth();

  const searchParams = useSearchParams();

  const params = new URLSearchParams();

  const defaultLocation = searchParams.get("location");
  const defaultIndustry = searchParams.get("industry");
  const defaultPriceRange = searchParams.get("priceRange");

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<SearchInput>({
    defaultValues: {
      location: defaultLocation ?? "",
      industry: defaultIndustry ?? "",
      priceRange: defaultPriceRange ?? "",
      moreFilters: "",
    },
  });

  const createSearchQueryString = useCallback(
    function (location: string, industry: string, priceRange: string) {
      location !== "" && params.set("location", location);
      industry !== "" && params.set("industry", industry);
      priceRange !== "" && params.set("priceRange", priceRange);

      return params.toString();
    },
    [searchParams]
  );

  const onSubmit: SubmitHandler<SearchInput> = async function (data) {
    const searchQuery = createSearchQueryString(
      data.location,
      data.industry,
      data.priceRange
    );
    // console.log("Search Query", searchQuery);

    router.push(`/search?${searchQuery}`);

    setPending(true);
    await simulateRequest(4000);
    setPending(false);
  };

  const handleReset = () => {
    // Incrementing is reliable and predictable
    setResetKey((prev) => prev + 1);
  };

  const clearForm = () => {
    setValue("location", "");
    setValue("industry", "");
    setValue("priceRange", "");

    handleReset();
    router.push("/search?page=1");
  };

  return (
    <section className="section section_search">
      <div className="page_width search_form">
        <form key={resetKey} onSubmit={handleSubmit(onSubmit)}>
          <input
            {...register("location")}
            type="text"
            placeholder="Search city, country, or state"
          />

          <Select
            optionsClass="absolute scroll"
            {...register("industry")}
            setFormValue={(option) => setValue("industry", option)}
            options={industries ?? industriesFake}
            {...(defaultIndustry
              ? {
                  placeholder: defaultIndustry,
                }
              : { placeholder: "Industry" })}
          />

          <Select
            optionsClass="absolute scroll"
            {...register("priceRange")}
            setFormValue={(option) => setValue("priceRange", option)}
            {...(defaultPriceRange
              ? {
                  placeholder: defaultPriceRange,
                }
              : { placeholder: "Price Range" })}
            options={[
              "80000-200000",
              "200000-400000",
              "400000-600000",
              "600000-800000",
              "800000-1000000",
              "1000000-3000000",
              "3000000-5000000",
            ]}
          />

          <Select
            optionsClass="absolute"
            {...register("moreFilters")}
            setFormValue={(option) => setValue("moreFilters", option)}
            placeholder="More Filters"
            options={[]}
          />

          <Button
            onClick={clearForm}
            type="button"
            className="btn btn-secondary btn-small"
          >
            Clear
          </Button>

          <Button disabled={pending} className="btn btn-primary btn-medium">
            <span className="loader" />
            Search
          </Button>
        </form>
      </div>
    </section>
  );
}
