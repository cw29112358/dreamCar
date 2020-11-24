import * as commonColor from 'commonColor';

export default {
  titleStyle: {
    marginBottom: 12,
    fontSize: 24,
    lineHeight: 33.5,
  },
  textStyle: {
    fontSize: 14,
    lineHeight: 21,
    color: commonColor.grey650,
  },
  textInputStyle: {
    height: 40,
    borderWidth: 0.5,
    borderRadius: 6,
    shadowRadius: 6,
    elevation: 3,
    shadowOpacity: 1,
    shadowOffset: { width: 0, height: 0 },
    shadowColor: commonColor.faintBlack,
    borderColor: commonColor.grey500,
    marginTop: 40,
    paddingHorizontal: 16,
    backgroundColor: commonColor.white,
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
