import * as commonColor from 'commonColor';
import variables from 'platform';

import loginBgImage from 'assets/loginBg.png';

const {
  deviceWidth,
  deviceHeight,
} = variables;

export default {
  bgImageProps: {
    source: loginBgImage,
    style: {
      width: deviceWidth,
      height: deviceHeight + 50,
    },
  },
  headerStyle: {
    backgroundColor: commonColor.translate,
  },
  titleStyle: {
    color: commonColor.white,
  },
  passwordTip: {
    fontSize: 12,
    color: commonColor.white,
  },
};
