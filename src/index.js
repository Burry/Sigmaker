import React from 'react';
import { hydrate, render } from 'react-dom';
import Amplify from 'aws-amplify';
import App from './components/App';
import awsExports from './aws-exports';
import * as serviceWorker from './serviceWorker';

const rootElement = document.getElementById('root');

if (rootElement.hasChildNodes()) hydrate(<App />, rootElement);
else render(<App />, rootElement);

// Configure AWS Amplify
Amplify.configure(awsExports);

Amplify.Logger.LOG_LEVEL =
    process.env.NODE_ENV === 'development' ? 'DEBUG' : 'ERROR';

// Service Worker
// https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app
serviceWorker.unregister();
