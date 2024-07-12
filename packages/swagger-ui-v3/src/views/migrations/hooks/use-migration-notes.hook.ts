import { useMarkdown } from "@clubmed/swagger-ui-plugins/hooks/use-markdown.hook";
import { useFetch } from "@clubmed/ui/hooks/useFetch";
import { useEffect } from "react";

import * as migrationNotes from "../../../../docs/migration-notes.md";
import type { MigrationNote } from "../interfaces/migration-note";

export function useMigrationNotes() {
  const hooks = useFetch<MigrationNote[]>({ url: "https://www.dataviz.clubmed/rest/migration-notes" });

  hooks.data = (hooks.data || []).sort((a, b) => {
    return b.route.deletion_date < a.route.deletion_date ? -1 : 1;
  });

  useEffect(() => {
    hooks.fetchData();
  }, []);

  const { content, toc } = useMarkdown({
    source: migrationNotes.markdown
  });

  return {
    attributes: migrationNotes.attributes,
    html: content,
    ...hooks,
    toc: [
      ...(toc || []),
      {
        depth: 3,
        id: "deprecated-routes",
        value: "Deprecated routes"
      },
      {
        depth: 3,
        id: "outdated-routes",
        value: "Outdated routes"
      }
    ]
  };
}
