import type { System } from "@clubmed/swagger-ui-plugins/interfaces/System";
import { useConfig } from "@clubmed/ui/contexts/config.context";
import React, { useEffect } from "react";

function useAuthorize(props: System) {
  const { config, setConfig } = useConfig();
  const { authSelectors, authActions } = props;

  const showPopup = !!authSelectors.shownDefinitions();

  useEffect(() => {
    if (config.showAuthorize) {
      const authorizableDefinitions = authSelectors.definitionsToAuthorize();
      authActions.showDefinitions(authorizableDefinitions);
    }
  }, [config.showAuthorize]);

  useEffect(() => {
    if (!showPopup) {
      setConfig({
        ...config,
        showAuthorize: false
      });
    }
  }, [showPopup]);

  return showPopup;
}

function useSearch(props: System) {
  const { config } = useConfig();

  useEffect(() => {
    // push current search to history
    const search = config.search ? "?search=" + config.search : "";

    window.history.replaceState(null, "", window.location.pathname + search);

    props.layoutActions.updateFilter(config.search);

    if (config.search) {
      const el = document.getElementById("swagger-ui-main-body-layout");

      if (el) {
        window.scrollTo({
          behavior: "smooth",
          top: el.offsetTop - 100
        });
      }
    }
  }, [config.search]);
}

export default function CustomStandaloneLayout(props: System) {
  const { config, setConfig } = useConfig();
  const { getComponent, specSelectors } = props;
  const BaseLayout = getComponent("BaseLayout", true);
  const info = specSelectors.info();
  const version = info?.get("version") as string;
  const AuthorizationPopup = getComponent("authorizationPopup", true);
  const AdvancedFilterPanel = getComponent("AdvancedFilterPanel", true);

  useEffect(() => {
    setConfig({
      ...config,
      version
    });
  }, [version]);

  const showPopup = useAuthorize(props);
  useSearch(props);

  const onClickAdvancedFilter = () => {
    setConfig({
      ...config,
      showAdvancedFilters: false
    });
  };

  return (
    <>
      {config.enableAdvancedFilter && config.showAdvancedFilters ? (
        <div role="presentation" className={"fixed top-[64px] bottom-0 inset-x-0 z-2"} onClick={onClickAdvancedFilter}>
          <div
            role="presentation"
            className="w-full bg-white py-20"
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <AdvancedFilterPanel />
          </div>
        </div>
      ) : null}
      {config.subView ? <config.subView {...props} /> : <BaseLayout />}
      {showPopup && <AuthorizationPopup />}
    </>
  );
}
