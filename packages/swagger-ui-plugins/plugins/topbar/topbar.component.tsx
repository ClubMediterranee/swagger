import { Button } from "@clubmed/trident-ui/molecules/Buttons/v2/Button";
import { useConfig } from "@clubmed/ui/contexts/config.context";
import { HeaderContainer } from "@clubmed/ui/organisms/HeaderContainer/HeaderContainer";
import React, { useState } from "react";

import { System } from "../../interfaces/System";

export default function Topbar(props: System) {
  let { getComponent, specSelectors } = props;
  const info = specSelectors.info();
  const AuthorizeBtnContainer = getComponent("AuthorizeBtnContainer", true);
  const FilterContainer = getComponent("FilterContainer", true);
  const AdvancedFilterPanel = getComponent("AdvancedFilterPanel", true);
  const RouterLink: any | undefined = getComponent("RouterLink") || undefined;

  const { config } = useConfig();
  const version = info.get("version") as string;

  const hasSecurityDefinitions = !!specSelectors.securityDefinitions();
  const [isVisible, setVisible] = useState(false);

  return (
    <HeaderContainer version={version} Link={RouterLink} homepageUrl="/" items={(config.nav || []).filter(Boolean)}>
      {config.enableAdvancedFilter && (
        <>
          <Button theme="outline" color="black" variant="circle" icon="Filters" onClick={() => setVisible(true)} />
          <AdvancedFilterPanel isVisible={isVisible} onClose={() => setVisible(false)} />
        </>
      )}
      {config.enableSearch && <FilterContainer />}
      {hasSecurityDefinitions ? <AuthorizeBtnContainer /> : null}
    </HeaderContainer>
  );
}
