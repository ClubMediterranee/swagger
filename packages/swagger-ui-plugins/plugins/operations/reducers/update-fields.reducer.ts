import { fromJS, Map } from "immutable";

export const ALLOW_SYNCED_FIELDS = ["accept-language", "api_key", "booking_id", "customer_id", "proposal_id", "product_id"];

export interface UpdateFieldsAction {
  type: string;
  payload: {
    path: string[];
    isXml: boolean;
    param: Map<string, any>;
    paramIn: string;
    paramName: string;
    value: any;
  };
}

type Parameters = Map<string, Map<string, string>>;
type Operation = Map<string, Parameters>;
type Methods = Map<string, Operation>;
type Paths = Map<string, Methods>;
type Json = Map<"paths", Paths>;
type State = Map<"json", Json>;

export function paramToIdentifier(param: any, { returnAll = false, allowHashes = true } = {}) {
  if (!Map.isMap(param)) {
    throw new Error("paramToIdentifier: received a non-Im.Map parameter as input");
  }
  const paramName = param.get("name");
  const paramIn = param.get("in");

  let generatedIdentifiers = [];

  // Generate identifiers in order of most to least specificity

  if (param && param.hashCode && paramIn && paramName && allowHashes) {
    generatedIdentifiers.push(`${paramIn}.${paramName}.hash-${param.hashCode()}`);
  }

  if (paramIn && paramName) {
    generatedIdentifiers.push(`${paramIn}.${paramName}`);
  }

  generatedIdentifiers.push(paramName);

  // Return the most preferred identifier, or all if requested

  return returnAll ? generatedIdentifiers : generatedIdentifiers[0] || "";
}

export function updateFields(state: State, action: UpdateFieldsAction) {
  const { payload } = action;
  let { path: pathMethod, paramName, paramIn, param, value, isXml } = payload;

  let paramKey = param ? paramToIdentifier(param) : `${paramIn}.${paramName}`;

  const valueKey = isXml ? "value_xml" : "value";

  state = state.setIn(["meta", "paths", ...pathMethod, "parameters", paramKey, valueKey], fromJS(value));

  paramName = paramName || param.get("name");
  paramIn = paramIn || param.get("in");

  if (!ALLOW_SYNCED_FIELDS.includes(paramName)) {
    return state;
  }

  state
    .get("json")
    .get("paths")
    .forEach((methods, path) => {
      methods?.forEach((operation, method) => {
        if (operation?.get("parameters")) {
          operation
            .get("parameters")
            .filter((parameter) => parameter?.get("in") === paramIn && parameter?.get("name") === paramName)
            .forEach((parameter) => {
              const paramKey = paramToIdentifier(parameter);

              state = state.setIn(["meta", "paths", path, method, "parameters", paramKey, "value"], value);
            });
        }
      });
    });

  return state;
}
