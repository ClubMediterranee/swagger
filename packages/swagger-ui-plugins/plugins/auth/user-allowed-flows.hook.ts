import { AllowedFlowOpts, AuthSelectors } from "../../interfaces/System";
import { getOauthId } from "./get-auth-name.util";

interface UseAllowedFlowsProps {
  schemaName: string;
  authSelectors: AuthSelectors;
}

export function useAllowedFlows({ schemaName, authSelectors }: UseAllowedFlowsProps) {
  const authConfigs = authSelectors.getConfigs() || {};

  if (authConfigs.allowedFlows) {
    const allowedFlows = authConfigs.allowedFlows as AllowedFlowOpts[];
    const flowId = getOauthId(schemaName).toLowerCase();

    return allowedFlows.filter(({ names }) => {
      return names.length ? names.includes(flowId) : true;
    }) as AllowedFlowOpts[];
  }
}
