import { Route, Routes } from "react-router-dom";

import MigrationNotesView from "./migration-note.view";
import MigrationNoteView from "./migration-note.view";

export default function MigrationNotesHome(props: { basePath: string }) {
  return (
    <div>
      <Routes>
        <Route path={props.basePath} element={<MigrationNotesView />} />
        <Route path={props.basePath + "/:id"} element={<MigrationNoteView />} />
      </Routes>
    </div>
  );
}
