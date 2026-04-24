import { useEffect } from "react";
import { useParams } from "react-router-dom";

export default function MigrationNotesRedirectView() {
  const { id } = useParams();

  useEffect(() => {
    if (!id) {
      window.location.replace("https://api.portal.clubmed/migration-notes");
      return;
    }

    window.location.replace(`https://api.portal.clubmed/migration-notes/${id}`);
  }, [id]);

  return null;
}
