import { Button } from "@clubmed/trident-ui/molecules/Buttons/v2/Button";
import { Switch } from "@clubmed/trident-ui/molecules/Forms/Switch";
import { useLocalStorage } from "@clubmed/ui/hooks/storage/useLocaleStorage";
import { GroupButtons } from "@clubmed/ui/molecules/GroupButtons";
import { Popin } from "@clubmed/ui/molecules/Popin/Popin";
import { Map } from "immutable";
import React from "react";

import { System } from "../../interfaces/System";

function useAdvancedFilterPanel(props: System) {
  const { layoutSelectors, layoutActions } = props;
  const { setItem } = useLocalStorage<Object>("swagger_advancedFilters", {});
  const filters: Map<string, any> = layoutSelectors.currentAdvancedFilters();

  const { tags, hasAdmin, defaultChoices } = (() => {
    const tags = props.layoutSelectors.tagsChoices().toArray();

    return {
      tags: tags.filter(({ value }: any) => value !== "admin").sort((a: any, b: any) => a.label.localeCompare(b.label)),
      hasAdmin: tags.some(({ value }: any) => value === "admin"),
      defaultChoices: tags.map(({ value }: any) => value)
    };
  })();

  const tagsValue = filters.has("tags") ? filters.get("tags") : defaultChoices;
  const onReset = () => {
    const newFilter = filters.set("deprecated", false).set("admin", false).set("tags", defaultChoices);

    layoutActions.updateAdvancedFilters(newFilter);
    setItem(newFilter.toJS());
  };

  const onChangeSelection = (name: string, value: any) => {
    const newFilter = filters.set(name, value);
    layoutActions.updateAdvancedFilters(newFilter);

    setItem(newFilter.toJS());
  };

  return { layoutActions, filters, tags, hasAdmin, tagsValue, onReset, onChangeSelection };
}

export function AdvancedFilterPanel(props: System & { isVisible: boolean; onClose: () => void }) {
  const { filters, tags, hasAdmin, tagsValue, onChangeSelection, onReset } = useAdvancedFilterPanel(props);

  return (
    <Popin
      title="Advanced filters"
      closeLabel="Close advanced filters"
      onClose={props.onClose}
      isVisible={props.isVisible}
      className={"sm:max-w-[800px]"}
    >
      <div className="flex flex-col gap-16">
        <div>
          <strong className={"block font-bold pb-20"}>Display routes</strong>
          <div className={"gap-16 flex"}>
            {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
            <label className="flex items-center">
              <Switch name="deprecated" onChange={onChangeSelection} checked={!!filters.get("deprecated")} /> Deprecated
            </label>

            {hasAdmin && (
              // eslint-disable-next-line jsx-a11y/label-has-associated-control
              <label className="flex items-center">
                <Switch name="admin" onChange={onChangeSelection} checked={!!filters.get("admin")} /> Admin
              </label>
            )}
          </div>
        </div>

        <div>
          <div className="flex justify-between items-center">
            <strong className="block font-bold pb-20">Tags</strong>
            <Button size="small" variant="pill" theme="outline" color="black" className="text-b5 py8 px-20" onClick={onReset}>
              Reset
            </Button>
          </div>

          <GroupButtons name={"tags"} value={tagsValue} choices={tags} onChange={onChangeSelection} />
        </div>
      </div>
    </Popin>
  );
}
