import { Button } from "@clubmed/trident-ui/molecules/Buttons/v2/Button";
import { TextField } from "@clubmed/trident-ui/molecules/Forms/TextField";
import { DebouncedTextField } from "@clubmed/ui/molecules/Forms/TextField/DebouncedTextField";
import { ApikeyField } from "@clubmed/ui/organisms/Forms/ApiKeyField";
import { FunctionComponent } from "react";

import { System } from "../../interfaces/System";

export function wrapJsonschemaStringComponent(Base: FunctionComponent, system: System) {
  return (props: Record<string, any>) => {
    let { value, schema, errors, description, disabled, required } = props;
    const enumValue = schema && schema.get ? schema.get("enum") : null;
    const format = schema && schema.get ? schema.get("format") : null;
    const type = schema && schema.get ? schema.get("type") : null;
    const name = description.split("-")[0];

    if (enumValue) {
      return <Base {...props} />;
    }

    if (type === "file" || format === "binary") {
      return (
        <TextField
          disabled={disabled}
          required={required}
          type="file"
          className={errors.size ? "invalid" : ""}
          placeholder={description}
          validationStatus={errors.size > 0 ? "error" : "default"}
          errorMessage={errors.get(0) || ""}
          onChange={(_: string, value: any) => {
            props?.onChange(value);
          }}
        />
      );
    }

    if (description === "authorization") {
      if (system.authSelectors.authorized().size === 0) {
        const { authActions, authSelectors, specSelectors } = system;

        const securityDefinitions = specSelectors.securityDefinitions();
        const authorizableDefinitions = authSelectors.definitionsToAuthorize();

        return securityDefinitions ? (
          <Button
            theme="outline"
            color="black"
            className="mt-4"
            style={{ minWidth: "340px" }}
            onClick={() => authActions.showDefinitions(authorizableDefinitions)}
          >
            Connect
          </Button>
        ) : null;
      }

      const AuthSelect = system.getComponent("AuthSelect", true);

      return <AuthSelect />;
    }

    if (description === "api_key" || description === "x-api-key") {
      return (
        <ApikeyField
          name={name}
          disabled={disabled}
          required={required}
          className={errors.size ? "invalid" : ""}
          type="text"
          value={value || ""}
          minLength={0}
          debounceTimeout={350}
          placeholder={description}
          validationStatus={errors.size > 0 ? "error" : "default"}
          errorMessage={errors.get(0) || ""}
          onChange={(_: string, value: any) => {
            props?.onChange(value);
          }}
        />
      );
    }

    return (
      <DebouncedTextField
        disabled={disabled}
        required={required}
        type={format && format === "password" ? "password" : "text"}
        className={errors.size ? "invalid" : ""}
        value={value || ""}
        minLength={0}
        debounceTimeout={350}
        placeholder={description}
        validationStatus={errors.size > 0 ? "error" : "default"}
        errorMessage={errors.get(0) || ""}
        onChange={(_: string, value: any) => {
          props?.onChange(value);
        }}
      />
    );
  };
}
