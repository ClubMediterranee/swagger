import { Button } from "@clubmed/trident-ui/molecules/Buttons/Button";
import { useConfig } from "@clubmed/ui/contexts/config.context";

import { Container } from "../components/container.component";
import { HeroBanner } from "../components/hero-banner.component";

export function DocHeroBanner() {
  const { config } = useConfig();

  return (
    <Container>
      <HeroBanner
        className={"-mb-24 wrapper"}
        srcSet="https://media.api.clubmed/?url=https%3A%2F%2Fns.clubmed.com%2Fdream%2FPRODUCT_CENTER%2FDESTINATIONS%2FSUN%2FEurope___Mediterranee%2FEspagne%2FMagna_Marbella%2F348391-9pbn8qy28t-swhr.jpg&format=webp&width=300&height=300&quality=70 300w, https://media.api.clubmed/?url=https%3A%2F%2Fns.clubmed.com%2Fdream%2FPRODUCT_CENTER%2FDESTINATIONS%2FSUN%2FEurope___Mediterranee%2FEspagne%2FMagna_Marbella%2F348391-9pbn8qy28t-swhr.jpg&format=webp&width=600&height=600&quality=70 600w, https://media.api.clubmed/?url=https%3A%2F%2Fns.clubmed.com%2Fdream%2FPRODUCT_CENTER%2FDESTINATIONS%2FSUN%2FEurope___Mediterranee%2FEspagne%2FMagna_Marbella%2F348391-9pbn8qy28t-swhr.jpg&format=webp&width=900&height=900&quality=85 900w"
        sizes="(min-width: 1220px) calc(50vw - 160px), (min-width: 1024px) calc(50vw - 120px), (min-width: 640px) calc(50vw - 20px), 100vw"
        src="https://media.api.clubmed/?url=https%3A%2F%2Fns.clubmed.com%2Fdream%2FPRODUCT_CENTER%2FDESTINATIONS%2FSUN%2FEurope___Mediterranee%2FEspagne%2FMagna_Marbella%2F348391-9pbn8qy28t-swhr.jpg&format=webp&width=900&height=900&quality=70"
        alt=""
      >
        <h1 className="title">Welcome to our API,</h1>

        <div className="text-b3">
          Club Med, renowned for its luxury resort experiences, proudly introduces its dedicated API. This tool offers developers a gateway
          to the diverse services and information provided by Club Med, from vacation bookings to on-site activity details. By using this
          interface, partners and developers can effortlessly integrate Club Med's offerings into their platforms. Whether you're looking
          for destination details, making reservations, or discovering the latest promotions, the Club Med API ensures a streamlined user
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
      </HeroBanner>
    </Container>
  );
}
