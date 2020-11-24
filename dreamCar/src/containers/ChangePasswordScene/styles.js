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
  passwordView: {
    width: 290,
    alignItems: 'flex-end',
  },
  button: {
    height: 18,
  },
  forgetPasswordTextStyle: {
    fontSize: 13,
    color: commonColor.white,
    paddingRight: 0,
  },
  formStyle: {
    paddingTop: 200,
  },
  successImage: {
    width: 90,
    height: 90,
    // marginTop: 90,
  },
  changeSuccess: {
    fontSize: 20,
    marginTop: 16,
    marginBottom: 70,
    color: commonColor.white,
  },
  changePasswordTip: {
    fontSize: 12,
    marginTop: 32,
    fontWeight: '600',
    color: commonColor.white,
  },
};
