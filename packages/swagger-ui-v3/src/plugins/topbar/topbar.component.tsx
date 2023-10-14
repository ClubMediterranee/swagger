import PropTypes from "prop-types";
import {Header} from "@clubmed/ui/organisms/Header";
import React from "react";
import {System} from "../../interfaces/System";
import {useConfig} from "../../contexts/config.context";
import {routes} from "../../routes";
import {HeaderNavItemProps} from "@clubmed/ui/organisms/Header/HeaderNavPanel";

const nav = routes
  .filter((route) => !route.hidden)
  .map((route) => {
    return {
      ...route,
      label: route.label,
      url: route.path
    };
  });

export default function Topbar(props: System) {
  let {getComponent, specSelectors, getConfigs} = props;
  const info = specSelectors.info();
  const AuthorizeBtnContainer = getComponent("AuthorizeBtnContainer", true);
  const FilterContainer = getComponent("FilterContainer", true);
  const AdvancedFilterPanel = getComponent("AdvancedFilterPanel", true);

  const config = useConfig();

  const version = info.get("version");
  const hasSecurityDefinitions = !!specSelectors.securityDefinitions();

  const HeaderSubLabel = <div className="flex items-center mx-auto ml-3 font-happiness text-b6">
    <span className="mr-8 font-serif uppercase text-ultramarine text-b5">{config.appName}</span>
    {version ? <span className="text-sm ml-5 text-sienna"><small>v{version}</small></span> : null}
  </div>;

  const items: HeaderNavItemProps[] = [...nav, {
    label: "Options",
    url: "",
    position: "right",
    variant: "icon",
    icon: "Edit",
    component: <AdvancedFilterPanel />
  }];

  return (
    <Header homepageUrl={"/"} openMenu={"Open menu"} sublabel={HeaderSubLabel} items={items}>
      <FilterContainer/>
      {hasSecurityDefinitions ? <AuthorizeBtnContainer/> : null}
    </Header>
  );
}

Topbar.propTypes = {
  specSelectors: PropTypes.object.isRequired,
  specActions: PropTypes.object.isRequired,
  getComponent: PropTypes.func.isRequired,
  getConfigs: PropTypes.func.isRequired
};
