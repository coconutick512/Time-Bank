import React from 'react';
import { store } from './store';
import { Provider } from 'react-redux';
import Router from './Router/Router';
import { BrowserRouter } from 'react-router-dom';
import { LanguageInitializer } from './Language/LanguageInitializer';

function App(): React.JSX.Element {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <LanguageInitializer>
          <Router />
        </LanguageInitializer>
      </Provider>
    </BrowserRouter>
  );
}

export default App;
