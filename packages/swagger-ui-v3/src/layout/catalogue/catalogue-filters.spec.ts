import { fromJS, Map } from "immutable";
import { describe, expect, it } from "vitest";

import { countOperations, normalizeCatalogueFilters, resetCatalogueFilters, selectedCategories, toggleCategory } from "./catalogue-filters";

const choices = [
  { label: "Bookings", value: "bookings" },
  { label: "Products", value: "products" }
];

describe("catalogue filter behavior", () => {
  it("keeps the admin toggle effective when categories restrict the results", () => {
    expect(normalizeCatalogueFilters(Map({ tags: ["products"], admin: true }), choices).get("tags")).toEqual(["products", "admin"]);
    expect(normalizeCatalogueFilters(Map({ tags: ["products", "admin"], admin: false }), choices).get("tags")).toEqual(["products"]);
  });
  it("normalizes persisted defaults and stale tags to All categories", () => {
    expect(selectedCategories(Map({ tags: ["bookings", "products", "admin"] }), choices)).toEqual([]);
    expect(selectedCategories(Map({ tags: ["removed"] }), choices)).toEqual([]);
    expect(selectedCategories(Map({ tags: ["products", "removed"] }), choices)).toEqual(["products"]);
  });

  it("allows multi-selection and returns to all when the final category is removed", () => {
    const selected = toggleCategory(["bookings"], "products");
    expect(selected).toEqual(["bookings", "products"]);
    expect(toggleCategory(toggleCategory(selected, "bookings"), "products")).toEqual([]);
  });

  it("resets only category and visibility filters", () => {
    const filters = Map({ tags: ["products"], admin: true, deprecated: true, otherSetting: true });
    expect(resetCatalogueFilters(filters).toJS()).toEqual({ tags: [], admin: false, deprecated: false, otherSetting: true });
    expect(filters.get("admin")).toBe(true);
  });

  it("counts an endpoint once across tags and bookmark groups", () => {
    const operation = { method: "get", path: "/products" };
    expect(
      countOperations(
        fromJS({ products: { operations: [operation] }, bookmarks: { operations: [operation, { method: "post", path: "/products" }] } })
      )
    ).toBe(2);
  });
});
