import * as commonColor from 'commonColor';
import variables from 'platform';

import loginBgImage from 'assets/loginBg.png';

const {
  deviceWidth,
  deviceHeight,
} = variables;
const basicWidth = 290;

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
  footer: {
    width: basicWidth,
    height: 80,
    paddingTop: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    borderTopColor: commonColor.white,
    borderTopWidth: 1,
    position: 'absolute',
    bottom: 0,
  },
  noAccountText: {
    fontSize: 13,
    color: commonColor.white,
  },
  signUpButton: {
    width: 60,
    alignItems: 'flex-start',
  },
  signUpText: {
    fontSize: 13,
    color: commonColor.brand,
  },
  passwordTip: {
    fontSize: 12,
    color: commonColor.white,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 100,
  },
  brand: {
    color: commonColor.brand,
  },
  tipText: {
    fontSize: 12,
    lineHeight: 18.5,
    color: commonColor.white,
  },
};
