import * as commonColor from 'commonColor';
import variables from 'platform';

const {
  isPad,
} = variables;

export default {
  container: {
    flex: 1,
  },
  content: {
    backgroundColor: commonColor.lightGrey,
  },
  // renderTopPart
  topPart: {
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: commonColor.white,
    paddingTop: isPad ? 16 : 0,
    paddingBottom: isPad ? 16 : 0,
  },
  // renderAvatar
  avatarView: {
    marginTop: 16,
  },
  avatar: {
    width: 67,
    height: 67,
    borderRadius: 35,
  },
  userName: {
    marginTop: 8,
    fontSize: 20,
    fontWeight: '700',
    color: commonColor.black,
    textAlign: 'center',
  },
  // renderMembership
  membership: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: 16,
    paddingTop: 4,
  },
  membershipImage: {
    width: 11,
    height: 9,
  },
  membershipText: {
    paddingLeft: 4,
    paddingRight: 4,
    fontSize: 13,
    lineHeight: 18.5,
    color: commonColor.membeYellow,
  },
  iconStyle: {
    fontSize: 13,
    marginTop: 2,
    color: commonColor.membeYellow,
  },
  // renderBottomPart
  bottomPart: {
    flex: 1,
    marginTop: 10,
    backgroundColor: commonColor.white,
  },
  // renderRightButton
  rightFieldStyle: {
    paddingRight: 16,
  },
  button: {
    elevation: 0,
    backgroundColor: commonColor.transparent,
    paddingRight: 4,
  },
  badge: {
    backgroundColor: commonColor.deepRed,
    width: 10,
    height: 10,
    borderRadius: 12,
    position: 'absolute',
    right: 0,
    top: 9,
  },
  headerIcon: {
    width: 22,
    height: 18,
  },

  // renderList
  list: {
    borderTopWidth: 0.5,
    borderTopColor: commonColor.greyer,
  },
  // renderItem
  listItem: {
    marginLeft: 16,
    marginRight: 16,
    paddingRight: 0,
    justifyContent: 'space-between',
    alignItems: 'center',
    borderColor: commonColor.greyer,
    minHeight: 60,
  },
  itemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  arrowStyles: {
    color: commonColor.grey650,
    fontSize: 20,
  },
  // renderMainTags
  mainTags: {
    flexDirection: 'row',
    width: '70%',
    alignSelf: 'center',
    paddingTop: isPad ? 16 : 0,
    paddingBottom: isPad ? 16 : 0,
    justifyContent: 'space-around',
  },
  tagImage: {
    width: 40,
    height: 40,
    marginTop: 16,
    marginBottom: 6,
  },
  tagText: {
    textAlign: 'center',
    fontSize: 13,
    marginBottom: 16,
  },
  // constants
  itemImage: {
    width: 20,
    height: 20,
    marginRight: 12,
  },
  itemText: {
    fontSize: 15,
  },
};
