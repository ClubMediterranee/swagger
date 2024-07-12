import { Icon } from "@clubmed/trident-ui/atoms/Icons";
import { TextField } from "@clubmed/trident-ui/molecules/Forms/TextField";
import { Link } from "@clubmed/trident-ui/molecules/Link";
import classnames from "classnames";
import moment from "moment/moment";
import { useState } from "react";

import { RouterLink } from "../../../layout/router-link.component";
import type { MigrationNote } from "../interfaces/migration-note";

function Row({ migrationNote, outdated }: { migrationNote: MigrationNote; outdated?: boolean }) {
  return (
    <li className={"mb-16 odd:bg-lightSand px-12 py-8 flex items-center rounded-16"}>
      <div className={"flex-1"}>
        <div className="text-b4 font-bold mb-4">{migrationNote.title}</div>
        <small className={"text-b5 flex gap-8 items-center"}>
          <Icon name="ClockBack" />
          <span className="text-black pt-2">Deletion date:</span>
          <span className={classnames("pt-2", { "text-red": outdated })}>
            {moment(migrationNote.route.deletion_date).format("MMMM Do YYYY")}
          </span>
        </small>
      </div>
      <div className={"text-b6 text-right w-[120px]"}>
        <Link href={`/migration-notes/${migrationNote.id}`} label={"See more"} icon={"ArrowDefaultRight"} component={RouterLink} />
      </div>
    </li>
  );
}

export function BreakingChanges({ data }: { data: MigrationNote[] }) {
  const [search, setSearch] = useState<string>("");

  data = data.filter((migration) => {
    return !search || migration.title.includes(search);
  });

  const deprecatedRoutes = data.filter((migrationNote) => {
    return migrationNote.route.deletion_date && moment().isBefore(migrationNote.route.deletion_date);
  });
  const outdatedRoutes = data.filter((migrationNote) => {
    return migrationNote.route.deletion_date && moment().isAfter(migrationNote.route.deletion_date);
  });

  return (
    <>
      <div className="mb-24">
        <TextField
          type="search"
          placeholder="Search"
          value={search}
          onChange={(_, value) => {
            setSearch(value);
          }}
        />
      </div>

      <h3 id="deprecated-routes" className="page-h3">
        Deprecated routes
      </h3>

      {deprecatedRoutes.length === 0 ? (
        <div className="text-center">No deprecated route found</div>
      ) : (
        <ul>
          {deprecatedRoutes.map((migrationNote) => {
            return <Row migrationNote={migrationNote} key={migrationNote.id} />;
          })}
        </ul>
      )}

      <h3 id="outdated-routes" className="page-h3">
        Outdated routes
      </h3>

      {outdatedRoutes.length === 0 ? (
        <div className="text-center">No outdated route found</div>
      ) : (
        <ul>
          {outdatedRoutes.map((migrationNote) => {
            return <Row migrationNote={migrationNote} key={migrationNote.id} outdated={true} />;
          })}
        </ul>
      )}
    </>
  );
}
