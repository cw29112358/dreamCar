import * as commonColor from 'commonColor';
import variables from 'platform';
import { headerMarginTop, headerOccupyHeight } from '../SearchHeader/styles';

const {
  isPad,
  deviceWidth,
  deviceHeight,
} = variables;

const topPartHeight = headerOccupyHeight + 70;
const filterBarHeight = headerMarginTop + 70;

export default {
  isPad,
  brand: commonColor.brand,
  listView: {
    paddingLeft: 8,
    height: '100%',
  },
  topPartHeight,
  filterBarHeight,
  deviceWidth,
  deviceHeight,

  emptyList: {
    height: deviceHeight - topPartHeight,
    paddingBottom: 100,
  },
};
