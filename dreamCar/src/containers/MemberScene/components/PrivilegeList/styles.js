import * as commonColor from 'commonColor';
import variables from 'platform';

const {
  deviceHeight,
  isIOS,
  isPad,
  smallScreen,
} = variables;

const isShowAllBUtton = !smallScreen;
export default {
  isIOS,
  deviceHeight,
  isShowAllBUtton,
  contentBottomView: {
    marginTop: isPad ? 24 : 20,
  },
  privilegeTitle: {
    marginTop: 20,
    marginLeft: 16,
    fontSize: 20,
    lineHeight: 28,
    fontWeight: '700',
    color: commonColor.grey750,
  },
  scrollView: {
    marginTop: isShowAllBUtton ? 0 : 10,
    height: isShowAllBUtton || isIOS ? 350 : 240,
  },
  contentPrivilegeView: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    flexWrap: 'wrap',
  },
  childView: {
    marginTop: 16,
    marginBottom: 8,
    alignItems: 'center',
    width: '33%',
  },
  privilegeImage: {
    marginBottom: 8,
    width: 45,
    height: 45,
  },
  privilegeText: {
    fontSize: 12,
    color: commonColor.grey750,
  },
};
