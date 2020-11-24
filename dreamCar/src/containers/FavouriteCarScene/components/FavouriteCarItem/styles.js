import * as commonColor from 'commonColor';
// import variables from 'platform';

// const {
// } = variables;

export default {
  listItem: {
    marginTop: 12,
    marginLeft: 0,
    paddingRight: 0,
    paddingTop: 0,
    paddingBottom: 0,
    borderBottomWidth: 0,
  },
  touchableHighlightStyle: {
    backgroundColor: commonColor.grey200,
  },
  listItemWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  checkBox: {
    marginRight: 26,
  },
  unCheckBox: {
    borderColor: commonColor.greyLight,
  },
  listItemContent: {
    flexDirection: 'row',
    paddingTop: 20,
    paddingBottom: 20,
    width: '100%',
    borderRadius: 6,
    backgroundColor: commonColor.white,
  },
  image: {
    marginRight: 10,
    width: 120,
    height: 90,
  },
  carTitle: {
    marginBottom: 8,
    fontSize: 16,
    lineHeight: 22.5,
    color: commonColor.black,
  },
  mileage: {
    flexDirection: 'row',
  },
  greyText: {
    marginBottom: 8,
    fontSize: 12,
    lineHeight: 16.5,
    color: commonColor.darkGrey,
  },
  priceStyle: {
    fontSize: 13,
    lineHeight: 18.5,
    paddingHorizontal: 5,
    paddingVertical: 2,
    color: commonColor.brand,
    backgroundColor: commonColor.faintBrand,
  },
  dollarStyle: {
    priceText: {
      fontSize: 20,
      color: commonColor.brand,
    },
    dollarUnit: {
      fontSize: 14,
      color: commonColor.brand,
    },
  },
};
