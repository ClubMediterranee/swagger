import PropTypes from "prop-types";
import React from "react";
import {System} from "../../interfaces/System";
import {Header} from "@clubmed/ui/organisms/Header";
import {useConfig} from "../../contexts/config.context";

export default function Topbar(props: System) {
  let {getComponent, specSelectors, getConfigs} = props;
  const info = specSelectors.info();
  const AuthorizeBtnContainer = getComponent("AuthorizeBtnContainer", true);
  const FilterContainer = getComponent("FilterContainer", true);

  const config = useConfig();

  const version = info.get("version");
  const hasSecurityDefinitions = !!specSelectors.securityDefinitions();

  const HeaderSubLabel = <div className="flex items-center mx-auto ml-3 font-happiness text-b6">
    <span className="mr-8 font-serif uppercase text-ultramarine text-b5">{config.appName}</span>
    {version ? <span className="text-sm ml-5 text-sienna"><small>v{version}</small></span> : null}
  </div>;

  return (
    <Header homepageUrl={"/"} openMenu={false} sublabel={HeaderSubLabel}>
      <FilterContainer />

      {/*<Link className="cursor-pointer flex flex-no-shrink items-center pr-5 text-blue font-happiness">*/}
      {/*  <div className="flex items-center py-2">*/}
      {/*    <div className="overflow-hidden flex items-center relative" style={{height: "40px", top: "-2px"}}>*/}
      {/*      <Icon svg={CLUBMED} width="7rem"/>*/}
      {/*    </div>*/}

      {/*  </div>*/}
      {/*</Link>*/}
      {/*<div className="flex items-center h-full" style={{flex: "1 1 auto"}}>*/}
      {/*  {hasServers ? (<ServersContainer/>) : null}*/}
      {/*  {hasSchemes ? (<SchemesContainer/>) : null}*/}
      {/*</div>*/}
      {/*<div className="flex items-center h-full" style={{width: "40%"}}>*/}
      {/*  {legacyUrl &&*/}
      {/*    <a href={legacyUrl} className={"whitespace-no-wrap pointer hover:text-blue-active h-full flex items-center"}>Legacy*/}
      {/*      doc</a>}*/}
      {/*  {TagsContainer ? <TagsContainer/> : null}*/}
      {/*  {SearchContainer ? <SearchContainer/> : null}*/}
      {/*</div>*/}
      {/*<div className="flex flex-no-shrink relative">*/}
      {hasSecurityDefinitions ? <AuthorizeBtnContainer/> : null}
      {/*</div>*/}
    </Header>
  );
}

Topbar.propTypes = {
  specSelectors: PropTypes.object.isRequired,
  specActions: PropTypes.object.isRequired,
  getComponent: PropTypes.func.isRequired,
  getConfigs: PropTypes.func.isRequired
};
