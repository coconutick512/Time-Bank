import React from 'react';
import { store } from './store';
import { Provider } from 'react-redux';
import Router from './Router/Router';
import { BrowserRouter } from 'react-router';


function App(): React.JSX.Element {
  return (
    <BrowserRouter>
    
    <Provider store={store}>
      <Router />
    </Provider>
    </BrowserRouter>
  );
}

export default App;
