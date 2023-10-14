import type {Iterable, List, Map, OrderedMap} from "immutable";

interface Term {
  models: string[];
  tags: string[];
  properties: string[];
  raw: any;
}

function getPayloadModels(operation: OrderedMap<string, any>) {
  return (operation.get("parameters") as List<Map<string, any>>)
    ?.filter((parameter) => {
      return parameter?.get("in") === "body";
    })
    .map((parameter) => {
      return parameter?.get("schema")?.get("$ref")?.replace("#/definitions/", "");
    });
}

function getResponseModel(operation: OrderedMap<string, any>) {
  return (operation.get("responses") as Map<string, any>)
    ?.map((response) => {
      return response?.get("schema")?.get("$ref")?.replace("#/definitions/", "");
    });
}


function filterOperations(operations: List<Map<string, any>>, phrase: string) {
  return operations.filter((operationPath) => {
    if (operationPath) {
      const path = operationPath.get("path");
      const method = operationPath.get("method");
      const operation: OrderedMap<string, any> | undefined = operationPath.get("operation");


      if (path && path.toLowerCase().includes(phrase)) {
        return true;
      }

      if (method && method.includes(phrase)) {
        return true;
      }

      if (operation) {
        if (operation.get("summary")?.toLowerCase().includes(phrase)) {
          return true;
        }

        // TODO add OS3 support to find model
        // search in parameters
        const bodyModels = getPayloadModels(operation);

        if (bodyModels?.find((item) => item?.toLowerCase().includes(phrase))) {
          return true;
        }

        // const responseModels = getResponseModel(operation);

      }
    }

    return false;
  });
}

export function opsAdvancedFilter(taggedOps: Iterable<string, Map<string, any>>, advancedFilters: Map<string, any>) {
  const tags = advancedFilters.get("tags") as string[] | undefined;
  const admin = advancedFilters.get("admin") as boolean;
  const deprecated = advancedFilters.get("deprecated") as boolean;

  return taggedOps
    .filter((tagObj, tag) => {
      if (tag) {
        if (tags?.length && !tags.includes(tag)) {
          return false;
        }

        if (tag === "admin" && !admin) {
          return false;
        }
      }

      return true;
    })
    .map((tagObj) => {
      if (!deprecated && tagObj?.get("operations")) {
        const operations = tagObj.get("operations").filter((operationPath: Map<string, any>) => {
          return operationPath.get("operation")?.get("deprecated") !== true;
        });

        return tagObj.set("operations", operations);
      }

      return tagObj;
    })
    .filter((tagObj) => {
      return tagObj?.get("operations").size > 0;
    });
}

export function opsFilter(taggedOps: Iterable<string, Map<string, any>>, phrase: string) {
  phrase = phrase.toLowerCase();

  return taggedOps
    .map((tagObj) => {
      if (tagObj) {
        return tagObj.set("operations", filterOperations(tagObj.get("operations"), phrase));
      }

      return tagObj;
    })
    .filter((tagObj) => {
      return tagObj?.get("operations").size > 0;
    });
}
