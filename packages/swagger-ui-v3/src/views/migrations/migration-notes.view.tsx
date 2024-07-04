import { Page } from "../../components/page.component";
import { useMigrationNotes } from "./hooks/use-migration-notes.hook";

export default function MigrationNotesView() {
  const hookProps = useMigrationNotes();

  return (
    <main>
      <Page {...hookProps} classContainer={"xl:max-w-1220 px-20 m-auto"}>
        {hookProps.data && hookProps.data.length > 0 && (
          <>
            <h2 id="Routes" className="page-h2">
              Latest Migration Notes
            </h2>

            {hookProps.data.map((migrationNote) => (
              <div key={migrationNote.id}>
                <h3>
                  {migrationNote.published_at} - {migrationNote.title}
                </h3>
              </div>
            ))}
          </>
        )}
      </Page>
    </main>
  );
}
