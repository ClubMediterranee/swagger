import { Header, HeaderNavItemProps } from "@clubmed/ui/organisms/Header";
import { HeaderSectionProps } from "@clubmed/ui/organisms/Header/HeaderSection";
import PropTypes from "prop-types";

import { useConfig } from "../../contexts/config.context";
import { System } from "../../interfaces/System";

export default function Topbar(props: System) {
  let { getComponent, specSelectors } = props;
  const info = specSelectors.info();
  const AuthorizeBtnContainer = getComponent("AuthorizeBtnContainer", true);
  const FilterContainer = getComponent("FilterContainer", true);
  const AdvancedFilterPanel = getComponent("AdvancedFilterPanel", true);
  const RouterLink: HeaderSectionProps["Link"] | undefined = getComponent("RouterLink");
  const config = useConfig();

  const version = info.get("version") as string;
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
    config.showAdvancedFilter && {
      label: "Options",
      url: "",
      position: "right",
      variant: "icon",
      icon: "Filters",
      component: <AdvancedFilterPanel />
    }
  ];

  return (
    <Header Link={RouterLink} homepageUrl="/" openMenu="Open menu" items={items.filter(Boolean)}>
      {config.showSearch && <FilterContainer />}
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
