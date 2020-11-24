// import * as commonColor from 'commonColor';
// import variables from 'platform';
import { APP_HEADER_SHADOW } from 'utils/constants';

// const {
//   isIOS,
// } = variables;

export default {
  headerStyle: {
    paddingLeft: 16,
    paddingRight: 16,
    ...APP_HEADER_SHADOW,
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 25,
  },
};
