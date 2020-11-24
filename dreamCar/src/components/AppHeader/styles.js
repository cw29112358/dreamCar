import commonColor from 'commonColor';
import variables from 'platform';
import { getScaleSize } from 'utils/helpers';
import { APP_HEADER_SHADOW } from 'utils/constants';

const {
  isIOS,
  statusbarHeight,
} = variables;

export default {
  isIOS,
  headerStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'visible',
    paddingLeft: 16,
    paddingRight: 16,
    marginTop: statusbarHeight,
    paddingTop: isIOS ? 18 : 0,
    backgroundColor: commonColor.white,
    borderBottomWidth: 1,
  },
  shadow: {
    ...APP_HEADER_SHADOW,
  },
  headerBorder: {
    borderBottomWidth: 0,
  },
  button: {
    elevation: 0,
    paddingTop: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    paddingRight: 0,
    backgroundColor: commonColor.transparent,
  },
  transparentTitle: {
    fontSize: getScaleSize(16),
    color: commonColor.black,
  },
  imageSize: {
    width: getScaleSize(22),
    height: getScaleSize(18),
  },
  iconNormal: {
    color: commonColor.black,
    fontSize: 30,
    marginLeft: 0,
  },
  iconLarge: {
    fontSize: 48,
    height: 48,
  },
  rightButton: {
    paddingRight: getScaleSize(16),
  },
};
