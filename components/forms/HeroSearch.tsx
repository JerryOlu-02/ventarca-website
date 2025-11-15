"use client";

import Button from "../common/Button";
import Select from "../common/Select";

import { useRouter } from "next/navigation";

export default function HeroSearch() {
  const router = useRouter();

  const handleSubmit = function (formData: FormData) {
    const data = formData.get("location") as string;
    console.log(data);

    // Use data to fetch listings

    // Update searchListings state

    // Go to search page
    router.push(`/search?location=${data}`);
  };

  return (
    <form action={handleSubmit} className="hero_search">
      <input
        type="text"
        name="location"
        placeholder="Search City, County, State"
      />

      <Select placeholder="Industry / Sector" options={["Retail", "Saas"]} />

      <Select placeholder="Price Range" options={["2000-3000", "3000-4000"]} />

      <Button type="submit" className="btn btn-primary btn-medium">
        Search
      </Button>
    </form>
  );
}
