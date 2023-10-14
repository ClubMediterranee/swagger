import {Switch} from "@clubmed/ui/molecules/Switch";
import {Map} from "immutable";
import {HeaderNavColumn} from "@clubmed/ui/organisms/Header/HeaderNavPanel";
import React from "react";
import {Button} from "@clubmed/ui/molecules/Buttons";
import {GroupButtons} from "@clubmed/ui/molecules/GroupButtons/GroupButtons";
import {System} from "../../interfaces/System";
import {useLocalStorage} from "@clubmed/ui/hooks/storage/useLocaleStorage";


function useAdvancedFilterPanel(props: System) {
  const {layoutSelectors, layoutActions} = props;
  const [, setStoreValue] = useLocalStorage<Object>("swagger_advancedFilters", {});
  const filters: Map<string, any> = layoutSelectors.currentAdvancedFilters();

  const {tags, hasAdmin, defaultChoices} = (() => {
    const tags = props.layoutSelectors.tagsChoices().toArray();

    return {
      tags: tags.filter(({value}: any) => value !== "admin").sort((a: any, b: any) => a.label.localeCompare(b.label)),
      hasAdmin: tags.some(({value}: any) => value === "admin"),
      defaultChoices: tags.map(({value}: any) => value)
    };
  })();

  const tagsValue = filters.has("tags") ? filters.get("tags") : defaultChoices;
  const onReset = () => {
    const newFilter = filters
      .set("deprecated", false)
      .set("admin", false)
      .set("tags", defaultChoices);

    layoutActions.updateAdvancedFilters(newFilter);
    setStoreValue(newFilter.toJS());
  };

  const onChangeSelection = (name: string, value: any) => {
    const newFilter = filters.set(name, value)
    layoutActions.updateAdvancedFilters(newFilter);

    setStoreValue(newFilter.toJS());
  };

  return {layoutActions, filters, tags, hasAdmin, tagsValue, onReset, onChangeSelection};
}

export function AdvancedFilterPanel(props: System) {
  const {layoutActions, filters, tags, hasAdmin, tagsValue, onChangeSelection, onReset} = useAdvancedFilterPanel(props);

  return <>
    <HeaderNavColumn>
      <strong className={"block font-bold pb-20"}>Display routes</strong>

      <div className={"space-y-8"}>
        <label className="flex items-center">
          <Switch
            name="deprecated"
            className="mr-20"
            onChange={onChangeSelection}
            value={!!filters.get("deprecated")}/> Deprecated
        </label>

        {
          hasAdmin && (
            <label className="flex items-center mb-20">
              <Switch
                name="admin"
                className="mr-20"
                onChange={onChangeSelection}
                value={!!filters.get("admin")}/> Admin
            </label>
          )
        }
      </div>

    </HeaderNavColumn>
    <HeaderNavColumn className={"max-w-1/3"}>
      <strong className={"block font-bold pb-20"}>Tags</strong>

      <GroupButtons name={"tags"} value={tagsValue} choices={tags} onChange={onChangeSelection}/>

    </HeaderNavColumn>

    <HeaderNavColumn>
      <Button theme={"black"} className={"text-b5 py8 px-20"} onClick={onReset}>
        Reset
      </Button>
    </HeaderNavColumn>
  </>;
}
