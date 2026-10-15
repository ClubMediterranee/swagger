import { Icon } from "@clubmed/trident-icons";
import { Dropdown } from "@clubmed/trident-ui/ui/Dropdown";
import classnames from "classnames";

import { PORTAL_URL } from "./navigation";

// Portal Languages presentation. These links open the localized portal;
// the API catalogue itself remains in English in this appearance-only phase.
export function Languages() {
  const languages = [
    { code: "en-US", name: "English", selected: true },
    { code: "fr-FR", name: "Français", selected: false }
  ];

  return (
    <Dropdown aria-label="Select language" className="font-sans text-b4 font-semibold text-white" data-name="Languages">
      <span data-slot="label">English</span>
      <div className="flex p-8 w-[340px] max-w-[80vw] flex-col gap-20">
        <span className="text-b3 font-semibold text-black">Language</span>
        <div className="flex flex-col gap-12">
          {languages.map(({ code, name, selected }) => (
            <a
              key={code}
              aria-current={selected ? "true" : undefined}
              aria-label={name}
              className={classnames(
                "flex w-full items-center justify-between rounded-8 text-left text-b3 text-black transition-colors",
                selected ? "font-semibold" : "font-normal hover:font-bold"
              )}
              href={`${PORTAL_URL}/${code}/`}
            >
              {name}
              {selected ? <Icon className="w-24" name="CheckDefault" /> : null}
            </a>
          ))}
        </div>
      </div>
    </Dropdown>
  );
}
