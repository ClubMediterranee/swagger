import { Header, HeaderNavItemProps } from "@clubmed/ui/organisms/Header";
import PropTypes from "prop-types";

import { useConfig } from "../../contexts/config.context";
import { System } from "../../interfaces/System";
// import { routes } from "../../routes";
//

export default function Topbar(props: System) {
  let { getComponent, specSelectors } = props;
  const info = specSelectors.info();
  const AuthorizeBtnContainer = getComponent("AuthorizeBtnContainer", true);
  const FilterContainer = getComponent("FilterContainer", true);
  const AdvancedFilterPanel = getComponent("AdvancedFilterPanel", true);
  const config = useConfig();

  const version = info.get("version");
  const hasSecurityDefinitions = !!specSelectors.securityDefinitions();

  const items: HeaderNavItemProps[] = [
    ...(config.nav || []),
    version && {
      position: "right",
      label: (
        <span>
          <span className="uppercase text-red">{config.appName}</span> v{version}
        </span>
      ),
      className: "inline-block flex items-center text-b4 font-sans shrink-0 bg-transparent text-grayDarker h-auto py-12 px-8"
    },
    {
      label: "Options",
      url: "",
      position: "right",
      variant: "icon",
      icon: "Filters",
      component: <AdvancedFilterPanel />
    }
  ];

  return (
    <Header homepageUrl="/" openMenu="Open menu" items={items.filter(Boolean)}>
      <FilterContainer />
      {hasSecurityDefinitions ? <AuthorizeBtnContainer /> : null}
    </Header>
  );
}

Topbar.propTypes = {
  specSelectors: PropTypes.object.isRequired,
  specActions: PropTypes.object.isRequired,
  getComponent: PropTypes.func.isRequired,
  getConfigs: PropTypes.func.isRequired
};
