import Filter from "../../ui/Filter";
import SortBy from "../../ui/SortBy";
import TableOperations from "../../ui/TableOperations";

function CabinTableOperation() {
  return (
    <TableOperations>
      <Filter
        filterField="discount"
        options={[
          { value: "all", label: "All" },
          { value: "no-discount", label: "No Discount" },
          { value: "with-discount", label: "With Discount" },
        ]}
      />

      <SortBy
        options={[
          {
            value: "name-asc",
            label: "Sort by Name (A-Z)",
          },
          {
            value: "name-des",
            label: "Sort by Name (Z-A)",
          },
          {
            value: "regularPrice-asc",
            label: "Sort by Price (Low first)",
          },
          {
            value: "regularPrice-desc",
            label: "Sort by Price (High first)",
          },
          {
            value: "maxCapacity-asc",
            label: "Sort by Capacity (Low first)",
          },
          {
            value: "maxCapacity-dec",
            label: "Sort by Capacity (High first)",
          },
        ]}
      />
    </TableOperations>
  );
}

export default CabinTableOperation;
