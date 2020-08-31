import * as React from "react";
import { render } from "react-dom";
import { Provider as StyletronProvider } from "styletron-react";
import { Client as Styletron } from "styletron-engine-atomic";
import { DarkTheme, BaseProvider } from "baseui";
import App from "./App";

const engine = new Styletron();
const rootElement = document.getElementById("root");

render(
  <StyletronProvider
    value={engine}
    /* debug={new DebugEngine()}
    debugAfterHydration */
  >
    <BaseProvider theme={DarkTheme}>
      <App />
    </BaseProvider>
  </StyletronProvider>,
  rootElement
);
