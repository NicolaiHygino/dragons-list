import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { DragonsProvider } from 'context/Dragons';
import { ProvideAuth } from 'context/Auth';
import { BrowserRouter } from 'react-router-dom';
import { GlobalStyle } from 'globalStyles';

ReactDOM.render(
  <React.StrictMode>
    <GlobalStyle />
    <BrowserRouter>
      <DragonsProvider>
        <ProvideAuth>
          <App />
        </ProvideAuth>
      </DragonsProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
