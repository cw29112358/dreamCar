import * as commonColor from 'commonColor';
import variables from 'platform';
import { SHADOW } from 'utils/constants';

const {
  deviceWidth,
} = variables;

export default {
  rightButtonStyle: {
    height: 18,
  },
  rightTextStyle: {
    paddingRight: 10,
    fontSize: 16,
    color: commonColor.red400,
  },
  profileTopView: {
    width: deviceWidth - 32,
    height: 160,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'center',
    marginTop: 15,
  },
  avatarStyle: {
    borderRadius: 0,
    width: 130,
    height: 130,
  },
  memberInfoView: {
    width: deviceWidth - 178,
    height: 130,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: commonColor.white,
    borderRadius: 6,
    ...SHADOW,
  },
  member: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  memberImage: {
    width: 16,
    height: 13,
    marginRight: 4,
  },
  memberText: {
    fontSize: 16,
    color: commonColor.memberYellow,
  },
  notMemberText: {
    color: commonColor.black,
  },
  memberName: {
    fontSize: 24,
    color: commonColor.black,
    lineHeight: 33.5,
    marginTop: 4.5,
  },
  memberDate: {
    fontSize: 10,
    color: commonColor.grey650,
    marginTop: 23,
  },
  label: {
    fontSize: 13,
    marginTop: 20,
    marginLeft: 16,
    color: commonColor.grey650,
  },
  star: {
    fontSize: 13,
    color: commonColor.errorRed,
  },
  genderView: {
    width: deviceWidth - 32,
    height: 46,
    marginHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: commonColor.greyF0,
  },
  genderText: {
    fontSize: 14,
    height: 46,
    paddingTop: 15,
    color: commonColor.greyLight,
  },
  genderValue: {
    color: commonColor.black,
  },
};
