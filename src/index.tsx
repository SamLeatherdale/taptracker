import * as React from 'react';
import { render } from 'react-dom';
import { Provider as StyletronProvider, DebugEngine } from 'styletron-react';
// @ts-ignore
import { Client as Styletron } from 'styletron-engine-monolithic';
import { DarkTheme, BaseProvider } from 'baseui';
import App from './components/App';

const engine = new Styletron();
const rootElement = document.getElementById('root');
const debug = process.env.NODE_ENV === 'production' ? void 0 : new DebugEngine();

render(
	<StyletronProvider value={engine} debug={debug} debugAfterHydration>
		<BaseProvider theme={DarkTheme}>
			<App />
		</BaseProvider>
	</StyletronProvider>,
	rootElement
);
