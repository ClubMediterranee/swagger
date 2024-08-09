import { useConfig } from "@clubmed/ui/contexts/config.context";
import { Header, HeaderNavItemProps } from "@clubmed/ui/organisms/Header";
import { HeaderSectionProps } from "@clubmed/ui/organisms/Header/HeaderSection";

import { System } from "../../interfaces/System";

export default function Topbar(props: System) {
  let { getComponent, specSelectors } = props;
  const info = specSelectors.info();
  const AuthorizeBtnContainer = getComponent("AuthorizeBtnContainer", true);
  const FilterContainer = getComponent("FilterContainer", true);
  const AdvancedFilterPanel = getComponent("AdvancedFilterPanel", true);
  const RouterLink: HeaderSectionProps["Link"] | undefined = getComponent("RouterLink") || undefined;

  const { config } = useConfig();
  const version = info.get("version") as string;

  const items: HeaderNavItemProps[] = [
    ...(config.nav || []),
    config.enableAdvancedFilter && {
      label: "Options",
      url: "",
      position: "right",
      variant: "icon",
      icon: "Filters",
      component: <AdvancedFilterPanel />
    }
  ];

  const hasSecurityDefinitions = !!specSelectors.securityDefinitions();

  return (
    <Header version={version} Link={RouterLink} homepageUrl="/" openMenu="Open menu" items={items.filter(Boolean)}>
      {config.enableSearch && <FilterContainer />}
      {hasSecurityDefinitions ? <AuthorizeBtnContainer /> : null}
    </Header>
  );
}
