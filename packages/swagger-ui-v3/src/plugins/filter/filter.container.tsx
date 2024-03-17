import { TextField } from "@clubmed/trident-ui/molecules/Forms/TextField";

import { System } from "../../interfaces/System";

export default function FilterContainer(props: System) {
  const { layoutSelectors } = props;

  const filter = layoutSelectors.currentFilter();

  return (
    <>
      {filter === null || filter === false || filter === "false" ? null : (
        <TextField
          icon="Search"
          name="search"
          id="search"
          value={filter === true || filter === "true" ? "" : (filter as string)}
          onChange={(_: string, value: string) => {
            props.layoutActions.updateFilter(value);
          }}
          style={{ width: "350px" }}
          placeholder={"Search... (e.g. path: /products AND method: POST)"}
        />
      )}
    </>
  );
}
