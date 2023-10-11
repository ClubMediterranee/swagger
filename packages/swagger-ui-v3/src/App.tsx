import "swagger-ui-react/swagger-ui.css";
import SwaggerUI from "swagger-ui-react";
import {userSwaggerUI} from "./hooks/user-swagger-ui.hook";
import {Button} from "@clubmed/ui/molecules/Buttons/Button";
import "@clubmed/ui/styles/globals.css";

function App() {
  const config = userSwaggerUI();

  return (
    <div className="App">
      <Button>Click me</Button>
      <SwaggerUI {...config}></SwaggerUI>
    </div>
  );
}

export default App;
