import * as commonColor from 'commonColor';

export default {
  contentContainer: {
    alignItems: 'center',
    flex: 1,
  },
  // app
  app: {
    marginTop: 130,
    width: 100,
    height: 100,
  },
  // text
  textGrey: {
    fontSize: 13,
    color: commonColor.grey650,
  },
  textGrey2A: {
    color: commonColor.textGrey2A,
  },
  // bottom
  bottomView: {
    position: 'absolute',
    bottom: 68,
    width: '100%',
    alignItems: 'center',
  },
  button: {
    alignSelf: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    width: 255,
    height: 40,
    borderRadius: 6,
    backgroundColor: commonColor.brand,
    shadowColor: commonColor.shadowColorBrand,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 6,
    elevation: 1,
  },
  buttonText: {
    fontSize: 15,
    color: commonColor.white,
  },
};
