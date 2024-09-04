import { Iterable, List, Map, OrderedMap } from "immutable";
import { FunctionComponent } from "react";
import { SwaggerUIProps } from "swagger-ui-react";

import type { logoutPopup } from "../plugins/auth/actions/auth-popup.action";
import type { opsAdvancedFilter, opsFilter } from "../plugins/filter/ops-filter";

export interface AllowedFlowOpts {
  id: number;
  flow: string;
  names: string[];
  scopes: string[];
}

export interface InitOAuthOptions {
  clientId?: string;
  clientSecret?: string;
  realm?: string;
  appName?: string;
  scopeSeparator?: string;
  scopes?: string;
  additionalQueryStringParams?: Record<string, string>;
  useBasicAuthenticationWithAccessCodeGrant?: boolean;
  usePkceWithAuthorizationCodeGrant?: boolean;
  allowedFlows?: (string | Partial<AllowedFlowOpts>)[];
  allowedScopes?: string[];
  defaultSelectedScopes?: string[];
  redirectUrl?: string;
  postLogoutRedirectUrl?: string;
}

export interface AuthSelectors extends Record<string, unknown> {
  shownDefinitions: () => List<Map<string, Map<string, any>>>;

  authorized(): Map<string, Map<string, unknown>>;

  definitionsToAuthorize(): Record<string, any>;

  definitionsForRequirements(security: string): Record<string, any>;

  getConfigs(): InitOAuthOptions;

  setCurrentAuth(auth: string): void;

  getCurrentAuth(): string;
}

export interface ErrSelectors extends Record<string, any> {
  lastError(): any;

  allErrors(): Iterable<string, Map<string, any>>;
}

export interface LayoutSelectors extends Record<string, any> {
  currentFilter(): string | null | boolean | "false";

  currentAdvancedFilters(): Map<string, any>;
}

export interface Oas3Selectors extends Record<string, any> {
  selectedServer(): any;
}

export interface SpecSelectors extends Record<string, unknown> {
  url(): string;

  info(): Map<string, unknown>;

  loadingStatus(): string;

  servers(): Map<string, any> | undefined;

  schemes(): Map<string, any> | undefined;

  securityDefinitions(): Map<string, any> | undefined;

  isSwagger2(): boolean;

  isOAS3(): boolean;

  isOAS31(): boolean;

  specStr(): string;

  operationsWithTags(): Map<string, OrderedMap<string, Map<string, unknown>>>;

  validOperationMethods(): List<string>;

  taggedOperations(): Map<string, Map<string, unknown>>;

  security(): List<Map<string, any>>;
}

/**
 * Actions
 */
export interface AuthActions extends Record<string, any> {
  logoutPopup: typeof logoutPopup;

  showDefinitions(security: Record<string, any>): void;

  showDefinitions(show: false): void;

  logoutWithPersistOption(auth: Record<string, any>): void;

  authPopup(
    authUrl: string,
    options: {
      auth: any;
      state: string;
      redirectUrl: string;
      callback: () => void;
      errCb: (err: Error) => void;
    }
  ): void;
}

export interface SpecActions extends Record<string, any> {
  updatePathFields(name: string, value: unknown): void;
}

export interface LayoutActions extends Record<string, any> {
  updateFilter(value: string): void;

  updateAdvancedFilters(value: Map<string, any>): void;
}

export interface ErrActions extends Record<string, any> {
  clear(opts: { authId: string; type: string; source: string }): void;
}

export interface Fn extends Record<string, any> {
  AST: any;
  opsFilter: typeof opsFilter;
  opsAdvancedFilter: typeof opsAdvancedFilter;
}

export interface System {
  specUrl: string;
  /**
   * Selectors
   */
  authSelectors: AuthSelectors;
  specSelectors: SpecSelectors;
  errSelectors: ErrSelectors;
  layoutSelectors: LayoutSelectors;
  oas3Selectors: Oas3Selectors;
  /**
   * Actions
   */
  authActions: AuthActions;
  layoutActions: LayoutActions;
  errActions: ErrActions;
  specActions: SpecActions;

  specPath: {
    get(i: number): string;
  };

  fn: Fn;

  /**
   * Methods
   */
  /**
   * You can configure OAuth 2.0 authorization by calling the initOAuth method.
   * @see https://swagger.io/docs/open-source-tools/swagger-ui/usage/oauth2/
   * @param options
   */
  initOAuth(options: InitOAuthOptions): void;

  getConfigs(): Record<string, any> & SwaggerUIProps;

  /**
   * Retrieve a component by name
   * @param name
   * @param bool
   */
  getComponent<Component = FunctionComponent<any> | React.ComponentClass<any>>(name: string, bool?: boolean): Component;

  getSystem(): System;
}
