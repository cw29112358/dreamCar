import * as commonColor from 'commonColor';
import variables from 'platform';

const {
  deviceHeight,
  headerHeight,
} = variables;

export default {
  formStyle: {
    height: deviceHeight - headerHeight,
    paddingTop: 140,
    alignItems: 'center',
  },
  takeLookButton: {
    position: 'absolute',
    top: 0,
    right: 20,
  },
  takeLookStyle: {
    fontSize: 14,
    color: commonColor.white,
    paddingRight: 0,
  },
  phoneImageStyle: {
    width: 15,
    height: 22,
    marginLeft: 16,
    marginRight: 12,
  },
  passwordImageStyle: {
    width: 19,
    height: 22,
    marginHorizontal: 14,
  },
  loginButtonStyle: {
    width: 160,
    height: 44,
    borderRadius: 25,
    backgroundColor: commonColor.brand,
    justifyContent: 'center',
    marginTop: 59,
  },
  buttonTextStyle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: commonColor.white,
  },
  textInputStyle: {
    marginLeft: 16,
  },
};
