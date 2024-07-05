import { Loader } from "@clubmed/trident-ui/molecules/Loader";

import { Page } from "../../components/page.component";
import { useMigrationNote } from "./hooks/use-migration-note.hook";

export default function MigrationNoteView() {
  const hookProps = useMigrationNote();

  return (
    <main>
      <Loader isVisible={hookProps.isActive} />
      <Page {...hookProps} classContainer={"xl:max-w-1220 px-20 m-auto"} />
    </main>
  );
}
