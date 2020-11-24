import * as commonColor from 'commonColor';
import variables from 'platform';

const {
  deviceWidth,
} = variables;

export default {
  listContainer: {
    flex: 1,
  },
  listContent: {
    paddingBottom: 32,
  },
  // tagText
  tagText: {
    position: 'absolute',
    top: 8,
    left: 12.5,
  },
  typeText: {
    fontSize: 20,
    color: commonColor.white,
    fontWeight: '600',
    marginBottom: 4,
  },
  horizontalLine: {
    height: 1,
    width: 65,
    backgroundColor: commonColor.white,
    marginBottom: 4,
  },
  titleViewStyle: {
    paddingLeft: 0,
    paddingRight: 0,
    paddingTop: 0,
    paddingBottom: 0,
  },
  leftLabelStyle: {
    fontSize: 16,
    color: commonColor.white,
    fontWeight: '600',
    marginRight: 5,
  },
  rightLabelStyle: {
    fontSize: 16,
    color: commonColor.white,
  },
  // itemTag
  tagView: {
    position: 'absolute',
    left: 16,
  },
  tagImage: {
    width: 105,
    height: 75,
  },
  // listItem
  listItem: {
    marginTop: 16,
  },
  image: {
    width: deviceWidth,
    height: (467 * deviceWidth) / 750,
  },
};
