import { render } from 'react-dom';
import { getVersionManifest } from './wealthsimple/auth';
import App from './App';

// WS app calls this on startup
getVersionManifest();

render(<App />, document.getElementById('root'));
