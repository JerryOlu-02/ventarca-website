import Button from "../common/Button";
import Select from "../common/Select";

export default function SearchPageForm() {
  return (
    <section className="section section_search">
      <div className="page_width search_form">
        <form>
          <input type="text" placeholder="Search city, country, or state" />

          <Select
            placeholder="Industry / Sector"
            options={["Retail", "Ecommerce"]}
          />

          <Select placeholder="Price Range" options={["2000", "3000"]} />

          <Select placeholder="More Filters" options={["2000", "3000"]} />

          <Button className="btn btn-secondary btn-small">Clear</Button>

          <Button className="btn btn-primary btn-medium">Search</Button>
        </form>
      </div>
    </section>
  );
}
