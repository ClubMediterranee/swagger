import { Iterable, List, Map } from "immutable";
import { FunctionComponent } from "react";
import { SwaggerUIProps } from "swagger-ui-react";

import type { logoutPopup } from "../plugins/auth/auth-popup.action";

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
  allowedFlows?: string[];
  allowedScopes?: string[];
  defaultSelectedScopes?: string[];
  redirectUrl?: string;
  postLogoutRedirectUrl?: string;
}

export interface AuthSelectors extends Record<string, unknown> {
  authorized(): Map<string, boolean>;
  shownDefinitions: () => List<Map<string, Map<string, any>>>;
  definitionsToAuthorize(): Record<string, any>;
  definitionsForRequirements(security: string): Record<string, any>;
  getConfigs(): InitOAuthOptions;
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

/**
 * Actions
 */
export interface AuthActions extends Record<string, any> {
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
  logoutPopup: typeof logoutPopup;
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
  opsFilter(taggedOps: Iterable<string, Map<string, any>>, phrase: string): Iterable<string, Map<string, any>>;
  opsAdvancedFilter(taggedOps: Iterable<string, Map<string, any>>, advancedFilters: Map<string, any>): Iterable<string, Map<string, any>>;
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
