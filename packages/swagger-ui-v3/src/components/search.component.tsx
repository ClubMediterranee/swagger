import { Button } from "@clubmed/trident-ui/molecules/Buttons/Button";
import { TextField } from "@clubmed/trident-ui/molecules/Forms/TextField";
import { useConfig } from "@clubmed/ui/contexts/config.context";
import React, { useEffect } from "react";

export function Search({
  value,
  disabled,
  onChange
}: {
  value: string;
  disabled?: boolean;
  onChange: (name: string | undefined, value: string) => void;
}) {
  const inputSearch = React.useRef<HTMLInputElement>(null);
  const [showSearch, setShowSearch] = React.useState(false);
  const { config } = useConfig();

  const onClick = () => {
    setShowSearch(!showSearch);

    inputSearch.current?.classList.remove("hidden");
    inputSearch.current?.focus();
  };

  const onBlur = () => {
    setShowSearch(false);
  };

  useEffect(() => {
    if (showSearch) {
      inputSearch.current?.classList.remove("hidden");
      inputSearch.current?.classList.remove("opacity-0");
      inputSearch.current?.classList.add("flex");
      inputSearch.current?.classList.add("opacity-1");
      inputSearch.current?.querySelector("input")?.focus();
    } else {
      inputSearch.current?.classList.remove("flex");
      inputSearch.current?.classList.remove("opacity-1");
      inputSearch.current?.classList.add("hidden");
      inputSearch.current?.classList.add("opacity-0");
    }
  }, [showSearch]);

  useEffect(() => {
    if (config.search) {
      inputSearch.current?.classList.add("bg-lightSand");
    } else {
      inputSearch.current?.classList.remove("bg-lightSand");
    }
  }, [value]);

  return (
    <>
      <Button theme={showSearch ? "black" : "blackStroke"} disabled={disabled} variant="textSmall" icon="Search" onClick={onClick}>
        Search...
      </Button>

      <div
        className={
          "transition-opacity ease-in-out duration-150 absolute inset-x-0 top-[64px] py-40 justify-center items-center bg-lightSand"
        }
        ref={inputSearch}
      >
        <TextField
          icon="Search"
          name="search"
          id="search"
          className="shadow-2-l rounded-pill"
          value={config.search}
          onBlur={onBlur}
          onChange={onChange}
          style={{ width: "80vw", maxWidth: "800px" }}
          placeholder={"Search... (e.g. path: /products AND method: POST)"}
        />
      </div>
    </>
  );
}
