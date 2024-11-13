import { ThemeConfig } from 'antd';

export const theme: ThemeConfig = {
  token: {
    fontFamily: 'Inter',
    colorLink: '#000000',
    colorLinkHover: '#054EDB',
    colorTextDisabled: '#8B96B1',
    colorError: '#E31B4B',
    colorErrorText: '#E31B4B',
    colorBorder: '#D4E3FF',
    controlHeightLG: 44,
    colorTextHeading: '#181818',
  },
  components: {
    Button: {
      colorPrimary: '#054EDB',
      colorPrimaryHover: '#1663F5',
      colorPrimaryActive: '#003BAE',
      borderRadius: 16,
      paddingBlock: 10,
      paddingInline: 24,
      borderRadiusLG: 16,
      fontSizeLG: 14,
      dangerColor: '#E31B4B',
      defaultColor: '#032D80',
    },
    Typography: {
      fontSize: 15,
      colorText: '#171717',
      fontWeightStrong: 700,
      titleMarginBottom: 0,
      titleMarginTop: 0,
    },
    Form: {
      itemMarginBottom: 8,
    },
    Input: {
      borderRadius: 16,
      borderRadiusLG: 16,
      colorTextPlaceholder: '#8B96B1',
      paddingInlineLG: 16,
      paddingBlockLG: 11.5,
      fontSizeLG: 14,
    },
    DatePicker: {
      paddingInlineLG: 16,
      paddingBlockLG: 11.5,
    },
    Card: {
      borderRadius: 16,
      boxShadow: 'none',
    },
  },
};
