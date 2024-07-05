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

  return {
    ...migrationNotes,
    ...hooks,
    toc: [
      ...migrationNotes.toc,
      {
        level: "3",
        content: "Deprecated routes"
      },
      {
        level: "3",
        content: "Outdated routes"
      }
    ]
  };
}
