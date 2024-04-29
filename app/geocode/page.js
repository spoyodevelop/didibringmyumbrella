import GeocodeComponent from "@/components/GeocodeComponent";

export const runtime = "edge";
export default function Geocode() {
  return (
    <div>
      <GeocodeComponent />
    </div>
  );
}
