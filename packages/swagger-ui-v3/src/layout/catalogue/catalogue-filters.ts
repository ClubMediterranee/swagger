import { Map } from "immutable";

export interface CategoryChoice {
  label: string;
  value: string;
}

// An empty selection explicitly means all categories, matching the Swagger selector.
export function selectedCategories(filters: Map<string, any>, choices: CategoryChoice[]): string[] {
  const available = choices.map(({ value }) => value);
  const selected = ((filters.get("tags") || []) as string[]).filter((tag) => available.includes(tag));
  return selected.length === available.length ? [] : selected;
}

export function toggleCategory(selected: string[], category: string): string[] {
  return selected.includes(category) ? selected.filter((tag) => tag !== category) : [...selected, category];
}

export function normalizeCatalogueFilters(filters: Map<string, any>, choices: CategoryChoice[]) {
  const selected = selectedCategories(filters, choices);
  return filters.set("tags", selected.length && filters.get("admin") ? [...selected, "admin"] : selected);
}

export function resetCatalogueFilters(filters: Map<string, any>) {
  return filters.set("tags", []).set("admin", false).set("deprecated", false);
}

export function countOperations(groups: any): number {
  const operations = new Set<string>();
  groups.forEach((group: any) => {
    group.get("operations")?.forEach((operation: any) => {
      operations.add(`${operation.get("method")} ${operation.get("path")}`);
    });
  });
  return operations.size;
}
