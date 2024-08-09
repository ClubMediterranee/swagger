import type { System } from "@clubmed/swagger-ui-plugins/interfaces/System";

import { Content } from "../../../components/content.component";
import { Page } from "../../../components/page.component";
import { WebhookRoutes } from "./components/webhooks-routes.component";
import { useWebhooks } from "./hooks/webhooks.hook";

export default function WebhooksView(props: System) {
  const { data: events } = useWebhooks();
  const webhooks = useWebhooks();

  return (
    <main>
      <Page {...webhooks} classContainer={"xl:max-w-1220 px-20 m-auto"}>
        {events && events?.length > 0 && (
          <>
            <h2 id="events" className="page-h2">
              Events
            </h2>
            <div>
              {events.map((event) => {
                return (
                  <div key={event.event} className="mb-24">
                    <div className="mb-16">
                      <div className="markdown-body">
                        <h3 id={event.event}>{event.event}</h3>

                        <blockquote>{event.description}</blockquote>
                      </div>
                    </div>
                    <div className="bg-lightSand rounded-16 p-20">
                      <Content markdown={event.notes} />
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}

        <WebhookRoutes {...props} />
      </Page>
    </main>
  );
}
