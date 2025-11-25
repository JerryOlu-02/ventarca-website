import Filter from "@/public/icon/filter.svg";

interface ListingChartProps {
  chartName: string;
  id?: string;
}

export default function ListingChart({ chartName, id }: ListingChartProps) {
  return (
    <div id={id} className="listing_chart">
      <div className="listing_chart-header">
        <p>{chartName}</p>

        <div>
          <Filter /> All Time
        </div>
      </div>

      <div className="listing_chart-desc">
        {/* <p>{listing.aboutBusiness}</p> */}
      </div>
    </div>
  );
}
