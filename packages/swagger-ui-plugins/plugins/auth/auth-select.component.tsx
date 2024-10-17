import { Radio, RadioGroup } from "@clubmed/trident-ui/molecules/Forms/Radios";

import { System } from "../../interfaces/System";
import { decodeToken } from "../../utils/decode-token";
import { getOauthName } from "./get-auth-name.util";

export function AuthSelectComponent(props: System) {
  const { authSelectors } = props;
  const auths = authSelectors.authorized();

  function onChange(_: string, value: string) {
    props.authActions.setCurrentAuth(value);
  }

  return (
    <RadioGroup className={"mt-16"} value={auths.keySeq().first()} onChange={onChange}>
      {auths
        .sort((a, b) => {
          return (a?.get("name") as any) > (b?.get("name") as any) ? 1 : -1;
        })
        .map((value, connection) => {
          const profile = decodeToken(value?.getIn(["token", "id_token"]) as string | undefined);
          const token = decodeToken(value?.getIn(["token", "access_token"]) as string) || decodeToken(value?.getIn(["value"]) as string);
          const authName = getOauthName(connection!).replace("OAuth ", "");
          const scopes = token.scope;
          const cmAuthName = authName === "GO" ? (scopes.includes("partner") ? "Partner" : "GO") : authName;

          return (
            <Radio key={connection} className="mb-16" value={connection}>
              <span className={"flex flex-col"}>
                <span className="block text-b4">
                  {cmAuthName} {profile ? "-" + profile.given_name + " " + profile.family_name : "Application"}
                </span>
                <small className="text-b5 font-normal">
                  {cmAuthName === "GO"
                    ? profile?.clubmed_id
                    : cmAuthName === "Partner"
                      ? profile?.partner_id
                      : profile?.sub || "Application"}
                </small>
                <small className="text-b6 font-normal">{scopes}</small>
              </span>
            </Radio>
          );
        })
        .toArray()}
    </RadioGroup>
  );
}
