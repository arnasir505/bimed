import { ThemeConfig } from 'antd';

export const theme: ThemeConfig = {
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
    Typography: {
      fontSize: 15,
      colorText: '#171717',
      fontWeightStrong: 700,
    },
  },
};
