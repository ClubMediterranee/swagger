import type {Iterable, List, Map, OrderedMap} from "immutable";
import {System} from "../../interfaces/System";

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

        const responseModels = getResponseModel(operation);

      }
    }

    return false;
  });
}

export function opsFilter(taggedOps: Iterable<string, Map<string, any>>, phrase: string, system: System) {
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

//
// // if (!mapFilters.has(keyword)) {
// //   mapFilters.set(keyword, getLucene(keyword));
// // }
//
// // const filter = mapFilters.get(keyword);
// // return taggedOps.filter((taggedOps) => {
// //   return filter(mapTerms(taggedOps));
// // });
// // }
//
// function getModels(item, set = new Set()) {
//   if (!item) {
//     return set;
//   }
//
//   if (typeof item === "string" && item.indexOf("#/definitions") > -1) {
//     set.add(item.replace("#/definitions/", ""));
//     return set;
//   }
//
//   if (typeof item === "object") {
//     Object
//       .values(item)
//       .forEach((value) => {
//         getModels(value, set);
//       });
//   }
//
//   return set;
// }
