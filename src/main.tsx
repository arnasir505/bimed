import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './app/App';
import { ConfigProvider } from 'antd';
import ruRu from 'antd/locale/ru_RU.js';
import { BrowserRouter } from 'react-router-dom';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
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
            Typography: {},
          },
        }}
        locale={ruRu}
      >
        <App />
      </ConfigProvider>
    </BrowserRouter>
  </StrictMode>,
);
