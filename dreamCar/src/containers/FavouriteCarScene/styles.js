import * as commonColor from 'commonColor';
import variables from 'platform';

const {
  headerHeight,
  statusbarHeight,
  deviceHeight,
  deviceWidth,
  isPad,
  isIOS,
  isIphoneX,
} = variables;
export default {
  deviceWidth,
  isIphoneX,
  contentContainer: {
    minHeight: deviceHeight - headerHeight - statusbarHeight,
  },
  rightButton: {
    height: 18,
    paddingRight: 0,
    paddingTop: 0,
    paddingLeft: 0,
    paddingBottom: 0,
    backgroundColor: 'transparent',
    elevation: 0,
  },
  rightText: {
    fontSize: 16,
    color: commonColor.black,
    paddingRight: 0,
    paddingLeft: 0,
  },
  content: {
    backgroundColor: commonColor.grey200,
  },
  tabsStyle: {
    flex: 0,
  },
  tabBarUnderlineStyle: {
    display: 'none',
  },
  tabBarStyle: {
    position: 'absolute',
    bottom: 0,
    left: '15%',
    width: isIOS ? '20%' : '25%',
    height: 3,
    backgroundColor: commonColor.brand,
    borderRadius: 6,
  },
  tab: {
    backgroundColor: commonColor.white,
  },
  tabTextStyle: {
    fontSize: 16,
  },
  tabActiveTextStyle: {
    fontSize: 16,
    color: commonColor.brand,
  },
  scrollView: {
    height: deviceHeight - headerHeight - statusbarHeight - 45,
  },
  list: {
    flexGrow: 0,
    paddingRight: isPad ? 24 : 16,
    paddingLeft: isPad ? 24 : 16,
  },
  separatorStyle: {
    height: 1,
  },
  footerShadow: {
    borderTopWidth: 0,
    shadowColor: commonColor.faintBlack,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 3,
  },
  allChecked: {
    flex: 1.6,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  buttonFooter: {
    height: 55,
  },
  allCheckedBox: {
    left: 16,
  },
  unAllCheckBox: {
    borderColor: commonColor.greyLight,
  },
  selectAll: {
    marginLeft: 28,
    fontSize: 16,
  },
  footerDisableButtonStyle: {
    borderRadius: 0,
    backgroundColor: commonColor.greyLight,
  },
  footerButtonStyle: {
    borderRadius: 0,
    backgroundColor: commonColor.errorRed,
  },
  iPhoneXFooterButton: {
    flex: 0.9,
    height: 40,
    borderRadius: 20,
    marginLeft: 20,
    paddingLeft: 8,
    paddingRight: 8,
  },
  footerButtonText: {
    fontSize: 16,
    lineHeight: 16,
    color: commonColor.white,
  },
};
