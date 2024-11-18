import { StrictMode } from 'react';
import { App } from 'app';
import { createRoot } from 'react-dom/client';
import { ConfigProvider } from 'antd';
import { BrowserRouter } from 'react-router-dom';
import ruRu from 'antd/locale/ru_RU.js';
import { Provider } from 'react-redux';
import { persistor, store, theme } from 'shared/config';
import { PersistGate } from 'redux-persist/integration/react';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <BrowserRouter>
          <ConfigProvider theme={theme} locale={ruRu}>
            <App />
          </ConfigProvider>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </StrictMode>,
);
