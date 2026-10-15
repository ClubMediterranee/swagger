import type { System } from "@clubmed/swagger-ui-plugins/interfaces/System";
import { Button } from "@clubmed/trident-ui/ui/buttons/Button";
import { Switch } from "@clubmed/trident-ui/ui/forms/Switch";
import { useLocalStorage } from "@clubmed/ui/hooks/storage/useLocaleStorage";
import { Map } from "immutable";
import { useEffect, useId, useRef } from "react";

import { CategoryChoice, normalizeCatalogueFilters, resetCatalogueFilters, selectedCategories, toggleCategory } from "./catalogue-filters";

export function useCatalogueFilters({ layoutSelectors, layoutActions }: System) {
  const filters: Map<string, any> = layoutSelectors.currentAdvancedFilters();
  const choices: CategoryChoice[] = layoutSelectors.tagsChoices().toArray();
  const categories = choices.filter(({ value }) => value !== "admin").sort((a, b) => a.label.localeCompare(b.label));
  const selected = selectedCategories(filters, categories);
  const { setItem } = useLocalStorage<object>("swagger_advancedFilters", {});
  const update = (next: Map<string, any>) => {
    const normalized = normalizeCatalogueFilters(next, categories);
    layoutActions.updateAdvancedFilters(normalized);
    setItem(normalized.toJS());
  };
  // Reconcile saved selections with the current specification, once it has loaded.
  useEffect(() => {
    if (
      categories.length &&
      JSON.stringify(filters.get("tags") || []) !== JSON.stringify(normalizeCatalogueFilters(filters, categories).get("tags"))
    ) {
      update(filters);
    }
  });
  return {
    filters,
    categories,
    selected,
    hasAdmin: choices.some(({ value }) => value === "admin"),
    activeCount: selected.length + Number(!!filters.get("admin")) + Number(!!filters.get("deprecated")),
    reset: () => update(resetCatalogueFilters(filters)),
    change: (name: string, value: unknown) => update(filters.set(name, value))
  };
}

export function CatalogueFilters({ state }: { state: ReturnType<typeof useCatalogueFilters> }) {
  const id = useId();
  const { filters, categories, selected, hasAdmin, reset, change } = state;
  return (
    <div className="catalogue-filter-content">
      <div className="catalogue-filter-heading">
        <h2>Filters</h2>
        <button type="button" className="catalogue-reset" onClick={reset}>
          Reset criteria
        </button>
      </div>
      <fieldset>
        <legend>Category</legend>
        <div className="catalogue-category-list">
          <button type="button" className="catalogue-category" aria-pressed={!selected.length} onClick={() => change("tags", [])}>
            All categories{!selected.length && <span aria-hidden="true"> ✓</span>}
          </button>
          {categories.map(({ label, value }) => (
            <button
              key={value}
              type="button"
              className="catalogue-category"
              aria-pressed={selected.includes(value)}
              onClick={() => change("tags", toggleCategory(selected, value))}
            >
              {label}
              {selected.includes(value) && <span aria-hidden="true"> ✓</span>}
            </button>
          ))}
        </div>
      </fieldset>
      <fieldset className="catalogue-route-options">
        <legend>Display routes</legend>
        <label htmlFor={`${id}-deprecated`}>
          <Switch
            id={`${id}-deprecated`}
            name="deprecated"
            checked={!!filters.get("deprecated")}
            onChange={(_, value) => change("deprecated", value)}
          />
          Deprecated
        </label>
        {hasAdmin && (
          <label htmlFor={`${id}-admin`}>
            <Switch id={`${id}-admin`} name="admin" checked={!!filters.get("admin")} onChange={(_, value) => change("admin", value)} />
            Admin
          </label>
        )}
      </fieldset>
    </div>
  );
}

export function CatalogueFilterDrawer({
  state,
  open,
  onClose
}: {
  state: ReturnType<typeof useCatalogueFilters>;
  open: boolean;
  onClose: () => void;
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    if (open) dialog.current?.showModal();
    else dialog.current?.close();
  }, [open]);
  return (
    <dialog ref={dialog} className="catalogue-filter-drawer" aria-label="Catalogue filters" onClose={onClose}>
      <div className="catalogue-drawer-close">
        <Button type="button" variant="circle" icon="CrossDefault" aria-label="Close filters" onClick={onClose} />
      </div>
      <CatalogueFilters state={state} />
      <Button type="button" onClick={onClose}>
        Show results
      </Button>
    </dialog>
  );
}
