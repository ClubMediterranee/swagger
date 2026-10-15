import type { System } from "@clubmed/swagger-ui-plugins/interfaces/System";
import { OperationsLoading } from "@clubmed/swagger-ui-plugins/plugins/layout/operations-loading.component";
import { Button } from "@clubmed/trident-ui/ui/buttons/Button";
import { useConfig } from "@clubmed/ui/contexts/config.context";
import { FormEvent, useEffect, useState } from "react";

import { countOperations } from "./catalogue-filters";
import { CatalogueFilterDrawer, CatalogueFilters, useCatalogueFilters } from "./catalogue-filters.component";

export default function CatalogueLayout(props: System) {
  const { getComponent, specSelectors, errSelectors } = props;
  const { config, setConfig } = useConfig();
  const [draft, setDraft] = useState(config.search || "");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const filters = useCatalogueFilters(props);
  useEffect(() => {
    setDraft(config.search || "");
  }, [config.search]);

  const HeroBanner = getComponent("HeroBanner", true);
  const Operations = getComponent("operations", true);
  const Models = getComponent("Models", true);
  const Webhooks = getComponent("Webhooks", true);
  const SvgAssets = getComponent("SvgAssets");
  const VersionPragmaFilter = getComponent("VersionPragmaFilter");
  const Errors = getComponent("errors", true);
  const status = specSelectors.loadingStatus();
  const failed = status === "failed" || status === "failedConfig";
  const loading = !failed && (status === "loading" || !specSelectors.specStr());
  const resultCount = countOperations(specSelectors.taggedOperations());
  const shortQuery = draft.trim().length > 0 && draft.trim().length < 3;
  const submit = (event: FormEvent) => {
    event.preventDefault();
    if (!shortQuery) setConfig({ ...config, search: draft.trim() });
  };
  const clearSearch = () => {
    setDraft("");
    setConfig({ ...config, search: "" });
  };

  return (
    <div className="api-catalogue">
      <SvgAssets />
      <HeroBanner />
      <form role="search" className="catalogue-search" onSubmit={submit}>
        <label className="catalogue-sr-only" htmlFor="catalogue-query">
          Search endpoints
        </label>
        <div className="catalogue-search-controls">
          <input
            id="catalogue-query"
            type="search"
            value={draft}
            onChange={(event) => setDraft(event.target.value)}
            placeholder="Search by endpoint path, method or description"
            aria-describedby="catalogue-search-help"
          />
          <Button type="submit" disabled={shortQuery}>
            Search
          </Button>
          {(draft || config.search) && (
            <button type="button" className="catalogue-clear" onClick={clearSearch}>
              Clear search
            </button>
          )}
        </div>
        <p id="catalogue-search-help">Enter at least 3 characters.</p>
      </form>
      {failed ? (
        <div role="alert" className="catalogue-state">
          <h2>{status === "failedConfig" ? "Failed to load remote configuration." : "Failed to load API definition."}</h2>
          {status === "failedConfig" && <p>{errSelectors.lastError()?.get("message")}</p>}
          <Errors />
        </div>
      ) : loading ? (
        <div role="status" aria-label="Loading API endpoints">
          <OperationsLoading />
        </div>
      ) : (
        <VersionPragmaFilter isSwagger2={specSelectors.isSwagger2()} isOAS3={specSelectors.isOAS3()} alsoShow={<Errors />}>
          <Errors />
          <div className="catalogue-grid" id="swagger-ui-main-body-layout">
            {config.enableAdvancedFilter && (
              <aside className="catalogue-filters" aria-label="Catalogue filters">
                <CatalogueFilters state={filters} />
              </aside>
            )}
            <section className="catalogue-results" aria-label="API endpoints">
              <div className="catalogue-results-toolbar">
                {config.enableAdvancedFilter && (
                  <Button
                    type="button"
                    className="catalogue-mobile-filters"
                    theme="outline"
                    color="black"
                    icon="Filters"
                    onClick={() => setDrawerOpen(true)}
                  >
                    Filters{filters.activeCount ? ` (${filters.activeCount})` : ""}
                  </Button>
                )}
                <p role="status">
                  {resultCount} endpoint{resultCount === 1 ? "" : "s"}
                </p>
                <Button
                  type="button"
                  theme="outline"
                  color="black"
                  icon="PeopleSingle"
                  onClick={() => setConfig({ ...config, showAuthorize: true })}
                >
                  Authorize
                </Button>
              </div>
              {resultCount ? (
                <Operations />
              ) : (
                <div className="catalogue-state">
                  <h2>No endpoints found</h2>
                  <p>
                    {config.search
                      ? `No endpoints match “${config.search}” with the current filters.`
                      : "No endpoints match the current filters."}
                  </p>
                  <button type="button" className="catalogue-reset" onClick={filters.reset}>
                    Reset criteria
                  </button>
                  {config.search && (
                    <button type="button" className="catalogue-reset" onClick={clearSearch}>
                      Clear search
                    </button>
                  )}
                </div>
              )}
              {specSelectors.isOAS31() && (
                <div className="webhooks-container">
                  <Webhooks />
                </div>
              )}
              <Models />
            </section>
          </div>
        </VersionPragmaFilter>
      )}
      {config.enableAdvancedFilter && <CatalogueFilterDrawer state={filters} open={drawerOpen} onClose={() => setDrawerOpen(false)} />}
    </div>
  );
}
