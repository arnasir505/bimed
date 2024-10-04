import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './app/App';
import { ConfigProvider } from 'antd';
import ruRu from 'antd/locale/ru_RU.js';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ConfigProvider
      theme={{
        token: {
          fontFamily: 'Inter',
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
  </StrictMode>,
);
