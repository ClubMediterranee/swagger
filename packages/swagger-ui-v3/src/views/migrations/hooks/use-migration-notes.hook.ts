import { useFetch } from "@clubmed/ui/hooks/useFetch";
import { useEffect, useMemo } from "react";

import * as migrationNotes from "../../../../docs/migration-notes.md";

export interface MigrationNote {
  id: string;
  number: number;
  title: string;
  published_at: string;
  updated_at: string;
  content: string;
  category: string;
  route: {
    path: string;
    method: string;
    deprecated: boolean;
    discussion_id: string;
    replacement_route: string;
    deletion_date: string;
    id: string;
  };
}

export function useMigrationNotes() {
  const hooks = useFetch<MigrationNote[]>({ url: "https://www.dataviz.clubmed/rest/migration-notes" });
  const toc = useMemo(() => {
    return [...migrationNotes.toc];
  }, [hooks.data]);

  useEffect(() => {
    hooks.fetchData();
  }, []);

  return {
    ...migrationNotes,
    ...hooks,
    toc
  };
}
