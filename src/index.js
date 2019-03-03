import React from 'react';
import { hydrate, render } from 'react-dom';
import App from './components/App';
import * as serviceWorker from './serviceWorker';

const rootElement = document.getElementById('root');

if (rootElement.hasChildNodes()) hydrate(<App />, rootElement);
else render(<App />, rootElement);

// Service Worker
// https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app
serviceWorker.unregister();
