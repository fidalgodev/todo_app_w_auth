import ReactDOM from 'react-dom';
import React from 'react';
import { ThemeProvider } from 'styled-components';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import styled from 'styled-components';

import theme from './utils/theme';
import GlobalStyles from './utils/global';
import store from './store';

import App from './App';
import Loader from './components/UI/Loader/Loader';

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const root = document.getElementById('root');

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <>
      <Wrapper>
        <Loader />
      </Wrapper>
      <GlobalStyles />
    </>
  </ThemeProvider>,
  root
);

store.firebaseAuthIsReady.then(() => {
  ReactDOM.render(
    <Provider store={store}>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <>
            <App />
            <GlobalStyles />
          </>
        </ThemeProvider>
      </BrowserRouter>
    </Provider>,
    root
  );
});
