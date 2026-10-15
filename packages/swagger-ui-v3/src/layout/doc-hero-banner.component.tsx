import { Button } from "@clubmed/trident-ui/ui/buttons/Button";
import { useConfig } from "@clubmed/ui/contexts/config.context";

export function DocHeroBanner() {
  const { config } = useConfig();

  return (
    <section className="catalogue-intro" aria-labelledby="catalogue-title">
      <h1 id="catalogue-title" className="title">
        Welcome to our API,
      </h1>

      <div className="text-b3">
        Club Med, renowned for its luxury resort experiences, proudly introduces its dedicated API. This tool offers developers a gateway to
        the diverse services and information provided by Club Med, from vacation bookings to on-site activity details. By using this
        interface, partners and developers can effortlessly integrate Club Med's offerings into their platforms. Whether you're looking for
        destination details, making reservations, or discovering the latest promotions, the Club Med API ensures a streamlined user
        experience. Step into this digital realm and amplify your platforms with the Club Med API.
      </div>

      <div>
        <Button
          onClick={() => {
            window.location.href = `mailto:${config.contact}`;
          }}
        >
          Contact us
        </Button>
      </div>
    </section>
  );
}
