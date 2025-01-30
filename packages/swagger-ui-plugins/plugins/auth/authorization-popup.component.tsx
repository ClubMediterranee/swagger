import { Popin } from "@clubmed/trident-ui/molecules/Popin";
import { TabPanel, Tabs, TabsBody } from "@clubmed/trident-ui/molecules/Tabs";
import { Tab } from "@clubmed/trident-ui/molecules/Tabs/Tab";
import { TabList } from "@clubmed/trident-ui/molecules/Tabs/TabList";
import { List, Map as M } from "immutable";
import React from "react";

import { System } from "../../interfaces/System.js";
import { getOauthName } from "./get-auth-name.util";

function getAuthsByGroups(authSelectors: System["authSelectors"], specSelectors: System["specSelectors"]) {
  let definitions = authSelectors.shownDefinitions();
  const securityDefinitions = specSelectors.securityDefinitions()!;

  let allDefinitions = M<string, { schemaName: string; others: List<any>; oauth: List<any> }>();

  (definitions.valueSeq() as any).forEach((definition: Map<string, Map<string, any>>) => {
    definition.forEach((schema: any, schemaName: string) => {
      if (!allDefinitions.has(schemaName)) {
        allDefinitions = allDefinitions.set(schemaName, {
          schemaName,
          others: List(),
          oauth: List()
        });
      }

      const group = allDefinitions.get(schemaName)!;

      if (schema.get("type") === "oauth2") {
        if (securityDefinitions?.get(schemaName)?.get("openIdConnectData")) {
          schema = schema.set("endSessionUrl", securityDefinitions?.get(schemaName)?.get("openIdConnectData")?.get("end_session_endpoint"));
        }

        group.oauth = group.oauth!.push(schema);
      } else {
        group.others = group.others.push(
          M({
            [schemaName]: schema
          })
        );
      }
    });
  });

  return allDefinitions;
}

export function AuthorizationPopup(props: System) {
  const close = () => {
    let { authActions } = props;

    authActions.showDefinitions(false);
  };

  let {
    authSelectors,
    authActions,
    getComponent,
    errSelectors,
    specSelectors,
    fn: { AST = {} }
  } = props;

  const Auths = getComponent("auths");
  const allDefinitions = getAuthsByGroups(authSelectors, specSelectors);
  const Oauth2 = getComponent("oauth2", true);
  let authorized = authSelectors.authorized();
  const authorizedIndex = allDefinitions.keySeq().findIndex((name) => {
    return Boolean(authorized && authorized.get(name!));
  });

  return (
    <div className="relative z-3">
      <Tabs max={3} selected={authorizedIndex || 0} compacted={true}>
        <Popin
          title={
            <TabList constrained={true} className={"pt-0"}>
              <div className="px-8 font-sans">
                {allDefinitions
                  .keySeq()
                  .map((name, index) => {
                    const label = getOauthName(name!);
                    const isAuthorized = authorized && authorized.get(name!);

                    return <Tab key={`${index}-${name}`} label={label + (isAuthorized ? " *" : "")} value={index!} />;
                  })
                  .toArray()}
              </div>
            </TabList>
          }
          isVisible={true}
          Footer={false}
          onClose={() => close()}
          closeLabel="Close"
          className={"sm:max-w-[800px]"}
        >
          <TabsBody>
            {allDefinitions
              .valueSeq()
              .map((obj, index) => {
                return (
                  <TabPanel key={"panel-" + index} value={index!}>
                    {obj?.oauth.size ? (
                      <div className="">
                        <Oauth2 authorized={authorized} schemaName={obj.schemaName} flows={obj.oauth} />
                      </div>
                    ) : null}

                    {obj?.others.size
                      ? obj.others
                          .map((definition, key) => (
                            <Auths
                              key={`auth-${key}`}
                              AST={AST}
                              definitions={definition}
                              getComponent={getComponent}
                              errSelectors={errSelectors}
                              authSelectors={authSelectors}
                              authActions={authActions}
                              specSelectors={specSelectors}
                            />
                          ))
                          .toArray()
                      : null}
                  </TabPanel>
                );
              })
              .toArray()}
          </TabsBody>
        </Popin>
      </Tabs>
    </div>
  );
}
