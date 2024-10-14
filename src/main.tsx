import { StrictMode } from 'react';
import { App } from 'app';
import { createRoot } from 'react-dom/client';
import { ConfigProvider } from 'antd';
import { BrowserRouter } from 'react-router-dom';
import ruRu from 'antd/locale/ru_RU.js';
import { Provider } from 'react-redux';
import { persistor, store } from 'shared/config';
import { PersistGate } from 'redux-persist/integration/react';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <BrowserRouter>
          <ConfigProvider
            theme={{
              token: {
                fontFamily: 'Inter',
                colorLink: '#000000',
                colorLinkHover: '#054EDB',
                colorTextDisabled: '#8B96B1',
              },
              components: {
                Button: {
                  colorPrimary: '#054EDB',
                  colorPrimaryHover: '#1663F5',
                  colorPrimaryActive: '#003BAE',
                  borderRadius: 16,
                  paddingBlock: 10,
                  paddingInline: 24,
                },
              },
            }}
            locale={ruRu}
          >
            <App />
          </ConfigProvider>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </StrictMode>,
);
