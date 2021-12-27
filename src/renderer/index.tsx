import { render } from 'react-dom';
import { ColorModeScript } from '@chakra-ui/react';
import theme from './theme';
import App from './App';

render(
  <>
    <ColorModeScript initialColorMode={theme.config.initialColorMode} />
    <App />
  </>,
  document.getElementById('root')
);
