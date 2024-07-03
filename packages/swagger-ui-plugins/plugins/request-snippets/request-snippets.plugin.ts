import { requestSnippetGenerator_node_fetch } from "./fetch";
import { requestSnippetGenerator_node_axios } from "./node-axios";
import { requestSnippetGenerator_node_native } from "./node-native";

export const RequestSnippetGeneratorPlugin = {
  fn: {
    requestSnippetGenerator_node_native,
    requestSnippetGenerator_node_axios,
    requestSnippetGenerator_node_fetch
  }
};
