import { Button } from "@clubmed/trident-ui/ui/buttons/Button";
import { TextField } from "@clubmed/trident-ui/ui/forms/TextField";
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
      inputSearch.current?.classList.add("opacity-100");
      inputSearch.current?.querySelector("input")?.focus();
    } else {
      inputSearch.current?.classList.remove("flex");
      inputSearch.current?.classList.remove("opacity-100");
      inputSearch.current?.classList.add("hidden");
      inputSearch.current?.classList.add("opacity-0");
    }
  }, [showSearch]);

  return (
    <>
      <Button
        aria-label="Search"
        color="black"
        theme={showSearch ? "solid" : "outline"}
        disabled={disabled}
        size="small"
        icon="Search"
        onClick={onClick}
      >
        <span className="hidden md:block">Search...</span>
      </Button>

      <div
        className={"transition-opacity ease-in-out duration-150 absolute inset-x-0 top-full z-20 py-16 justify-center items-center"}
        ref={inputSearch}
      >
        <TextField
          icon="Search"
          name="search"
          id="search"
          className="shadow-2-l rounded-pill w-full max-w-[800px] bg-white"
          value={config.search}
          onBlur={onBlur}
          onChange={(_, nextValue) => onChange("search", nextValue)}
          placeholder={"Search... (e.g. path: /products AND method: POST)"}
        />
      </div>
    </>
  );
}
