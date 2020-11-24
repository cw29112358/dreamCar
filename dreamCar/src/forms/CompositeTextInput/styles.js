import * as commonColor from 'commonColor';

export default {
  viewStyle: {
    width: 290,
    height: 44,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: commonColor.white,
    borderRadius: 6,
    marginBottom: 24,
  },
  defaultTextInputStyle: {
    flex: 1,
    height: 34,
  },
  verificationCodeButtonStyle: {
    width: 100,
    height: 44,
    backgroundColor: commonColor.brand,
    borderTopRightRadius: 6,
    borderBottomRightRadius: 6,
  },
  verificationCodeTextStyle: {
    fontSize: 13,
    color: commonColor.white,
  },
};
