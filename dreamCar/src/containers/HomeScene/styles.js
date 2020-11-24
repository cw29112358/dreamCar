import * as commonColor from 'commonColor';
import variables from 'platform';

const {
  deviceWidth,
  isIOS,
} = variables;

export default {
  slideLength: deviceWidth - 64,
  contentContainer: {
    flex: 1,
  },

  // renderFilterPrice
  filterView: {
    paddingBottom: 16,
    borderBottomWidth: isIOS ? 0 : 0.5,
    borderBottomColor: commonColor.greyer,
    backgroundColor: commonColor.white,
    shadowColor: 'rgba(0, 0, 0, 0.04)',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 1,
    shadowRadius: 3,
  },
};
