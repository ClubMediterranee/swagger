import React from "react";
import {System} from "../../interfaces/System";
import {TextField} from "@clubmed/ui/molecules/TextField";

export default function FilterContainer(props: System) {
  const {layoutSelectors} = props;

  const filter = layoutSelectors.currentFilter();

  return (
    <>
      {filter === null || filter === false || filter === "false" ? null :
        <TextField
          icon="Search"
          name="search"
          id="search"
          value={filter === true || filter === "true" ? "" : filter as string}
          onChange={(name: string, value: string) => {
            if (value.length > 3) {
              props.layoutActions.updateFilter(value);
            }
          }}
          placeholder={"Search... (e.g. path: /products AND method: POST)"}
          className="w-360"
        />
      }
    </>
  );
}
