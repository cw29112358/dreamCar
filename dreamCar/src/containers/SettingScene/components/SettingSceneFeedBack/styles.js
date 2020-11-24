import * as commonColor from 'commonColor';
import variables from 'platform';

const {
  isIOS,
  deviceWidth,
  scenePaddingWidth,
} = variables;

export default {
  isIOS,
  content: {
    paddingHorizontal: scenePaddingWidth,
  },
  titleStyle: {
    paddingTop: 20,
    marginBottom: 12,
    fontSize: 24,
    lineHeight: 33.5,
  },
  textStyle: {
    fontSize: 14,
    lineHeight: 21,
    color: commonColor.grey650,
  },
  textInputViewStyle: {
    width: deviceWidth - 32,
    height: 215,
    alignSelf: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderWidth: 0.5,
    marginTop: 32,
    borderRadius: 6,
    borderColor: commonColor.grey500,
  },
  textInputStyle: {
    height: 40,
    fontSize: 16,
  },
  buttonStyle: {
    width: 120,
    height: 44,
    marginTop: 32,
    justifyContent: 'center',
    alignSelf: 'center',
    borderRadius: 25,
    backgroundColor: commonColor.brand,
  },
  buttonTextStyle: {
    fontSize: 15,
    lineHeight: 21,
    color: commonColor.white,
  },
};
