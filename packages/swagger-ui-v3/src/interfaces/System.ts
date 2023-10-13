import {SwaggerUIProps} from "swagger-ui-react";
import {FunctionComponent} from "react";

export interface SpecSelectors extends Record<string, any> {
  info(): any;

  loadingStatus(): string;

  servers(): Map<string, any> | undefined;

  schemes(): Map<string, any> | undefined;

  securityDefinitions(): Map<string, any> | undefined;

  isSwagger2(): boolean;

  isOAS3(): boolean;

  isOAS31(): boolean;

  specStr(): string;
}

export interface ErrSelectors extends Record<string, any> {
  lastError(): any;
}

export interface LayoutSelectors extends Record<string, any> {
  currentFilter(): string | null | boolean | "false";
}

export interface LayoutActions extends Record<string, any> {
  updateFilter(value: string): void
}

export interface System {
  specSelectors: SpecSelectors;
  errSelectors: ErrSelectors;
  layoutSelectors: LayoutSelectors,
  layoutActions: LayoutActions;

  getConfigs(): Record<string, any> & SwaggerUIProps;

  getComponent(name: string, bool?: boolean): FunctionComponent<any> | React.ComponentClass<any>;
}
