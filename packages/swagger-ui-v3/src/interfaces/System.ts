import {SwaggerUIProps} from "swagger-ui-react";
import {FunctionComponent} from "react";
import {Iterable, Map} from "immutable";

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

  currentAdvancedFilters(): Map<string, any>;
}

export interface LayoutActions extends Record<string, any> {
  updateFilter(value: string): void;

  updateAdvancedFilters(value: Map<string, any>): void;
}

export interface Oas3Selectors extends Record<string, any> {
  selectedServer(): any;
}

export interface System {
  specSelectors: SpecSelectors;
  errSelectors: ErrSelectors;
  layoutSelectors: LayoutSelectors,
  layoutActions: LayoutActions;
  oas3Selectors: Oas3Selectors;
  authActions: {
    showDefinitions(security: Record<string, any>): void;
  }
  authSelectors: {
    definitionsForRequirements(security: string): Record<string, any>;
  },
  specPath: {
    get(i: number): string;
  }
  fn: {
    opsFilter(taggedOps: Iterable<string, Map<string, any>>, phrase: string): Iterable<string, Map<string, any>>;
    opsAdvancedFilter(taggedOps: Iterable<string, Map<string, any>>, advancedFilters: Map<string, any>): Iterable<string, Map<string, any>>;
  };

  specUrl: string;

  getConfigs(): Record<string, any> & SwaggerUIProps;

  getComponent(name: string, bool?: boolean): FunctionComponent<any> | React.ComponentClass<any>;

  getSystem(): System;
}
