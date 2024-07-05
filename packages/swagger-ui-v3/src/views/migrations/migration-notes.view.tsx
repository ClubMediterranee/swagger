import { Page } from "../../components/page.component";
import { BreakingChanges } from "./components/breaking-changes.component";
import { useMigrationNotes } from "./hooks/use-migration-notes.hook";

export default function MigrationNotesView() {
  const hookProps = useMigrationNotes();

  return (
    <main>
      <Page {...hookProps} classContainer={"xl:max-w-1220 px-20 m-auto"}>
        {hookProps.data && hookProps.data.length > 0 && <BreakingChanges data={hookProps.data} />}
      </Page>
    </main>
  );
}
