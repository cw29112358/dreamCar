/**
 *
 * ProfileScene Container
 *
 */

/* global translate toast */

import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import PhotoUpload from 'react-native-photo-upload';
import DateTimePicker from 'react-native-modal-datetime-picker';
import { createPropsSelector } from 'reselect-immutable-helpers';
import {
  Image,
} from 'react-native';
import {
  View,
  Text,
} from 'native-base';

import avatarImage from 'assets/avatar.png';
import membershipImage from 'assets/membership.png';

import FullScreenScene from 'components/FullScreenScene';
import ModalSelect from 'components/ModalSelect';

import { selectMember } from 'containers/MemberScene/selectors';

import {
  PHOTO_UPLOAD_CONFIG,
  OPTIONS_GENDER,
  DATE_CONFIG,
} from 'utils/constants';
import formValidators from 'utils/formValidators';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';

import NBTextInput from './components/TextInput';

import {
  saveProfilesAction,
  uploadRefFileAction,
} from './actions';

import {
  selectProfile,
  selectIsProfileLoading,
  selectIsUploading,
} from './selectors';

import reducer from './reducer';
import sagas from './sagas';

import styles from './styles';

const {
  isEmail,
} = formValidators;

class ProfileScene extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      avatar: {}, // 头像
      name: '', // 姓名
      gender: '', // 性别
      birthday: '', // 出生日期
      email: '', // 邮箱
      emergencyContact: '', // 紧急联系人
      zipCode: '', // 邮编
      isShowPicker: false, // 性别弹窗的显隐
      isShowDate: false, // 出生日期弹窗的显隐
    };
  }

  componentDidMount() {
    const { profile } = this.props;
    const {
      avatar, name, gender, birthday,
      email, emergencyContact, zipCode,
    } = profile;
    this.setState({
      avatar,
      name,
      gender,
      birthday,
      email,
      emergencyContact,
      zipCode,
    });
  }

  // render
  renderTop = () => (
    <View style={styles.profileTopView}>
      { this.renderAvatar() }
      { this.renderMemberInfo() }
    </View>
  )
  // 头像逻辑可能需要修改，改为懒加载
  renderAvatar = () => {
    const { profile } = this.props;
    return (
      <PhotoUpload
        containerStyle={{ flex: 0, justifyContent: 'flex-start' }}
        onResponse={this.onResponse}
        onResizedImageUri={this.onResizedImageUri}
        maxWidth={400}
        maxHeight={400}
        quality={80}
        format="JPEG"
        {...PHOTO_UPLOAD_CONFIG}
      >
        <Image
          style={styles.avatarStyle}
          resizeMode="cover"
          source={profile.avatar && profile.avatar.uri ? { uri: profile.avatar.uri } : avatarImage}
        />
      </PhotoUpload>
    );
  }
  renderMemberInfo = () => {
    const { profile, authUserMembership } = this.props;
    const {
      isMembership, level, status, createAt,
    } = authUserMembership;
    const isActiveMember = level && status === 'active';
    let membershipText;
    if (isMembership) {
      if (level === 'basic') {
        membershipText = 'basicMember';
      } else if (level === 'premium') {
        membershipText = 'premiumMember';
      } else if (level === 'deluxe') {
        membershipText = 'deluxeMember';
      }
    } else {
      membershipText = 'notMember';
    }
    return (
      <View style={styles.memberInfoView}>
        <View style={styles.member}>
          { isActiveMember && <Image source={membershipImage} style={styles.memberImage} /> }
          <Text style={[styles.memberText, !isActiveMember && styles.notMemberText]}>
            {translate(membershipText)}
          </Text>
        </View>
        <Text style={styles.memberName}>{profile.name}</Text>
        <Text style={styles.memberDate}>
          {moment(isActiveMember && createAt).format('YYYY-MM-DD')} {translate('to')} {moment(isActiveMember && createAt).add(1, 'year').format('YYYY-MM-DD')}
        </Text>
      </View>
    );
  }
  renderForms = () => {
    const {
      name, gender, birthday, email,
      emergencyContact, zipCode,
    } = this.state;
    return (
      <>
        {/* 姓名 */}
        <Text style={styles.label}>{translate('name')}<Text style={styles.star}> *</Text></Text>
        <NBTextInput
          source="name"
          value={name}
          autoFocus
          placeholder="placeholderName"
          onChangeText={this.onChangeText}
        />

        {/* 性别 */}
        <Text style={styles.label}>{translate('gender')}<Text style={styles.star}> *</Text></Text>
        <View style={styles.genderView}>
          <Text
            style={[styles.genderText, gender && styles.genderValue]}
            onPress={() => this.setState({ isShowPicker: true })}
          >
            {(gender && translate(gender)) || translate('placeholderBirthday')}
          </Text>
        </View>

        {/* 出生日期 */}
        <Text style={styles.label}>{translate('birthday')}<Text style={styles.star}> *</Text></Text>
        <View style={styles.genderView}>
          <Text
            style={[styles.genderText, birthday && styles.genderValue]}
            onPress={() => this.setState({ isShowDate: true })}
          >
            {birthday ? moment(birthday).format('YYYY-MM-DD') : translate('placeholderBirthday')}
          </Text>
        </View>

        {/* 邮箱 */}
        <Text style={styles.label}>{translate('email')}<Text style={styles.star}> *</Text></Text>
        <NBTextInput
          source="email"
          value={email}
          placeholder="placeholderEmail"
          onChangeText={this.onChangeText}
        />

        {/* 邮编 */}
        <Text style={styles.label}>{translate('zipCode')}</Text>
        <NBTextInput
          source="zipCode"
          value={zipCode}
          placeholder="placeholderZipCode"
          onChangeText={this.onChangeText}
        />

        {/* 紧急联系人 */}
        <Text style={styles.label}>{translate('emergencyContact')}</Text>
        <NBTextInput
          source="emergencyContact"
          value={emergencyContact}
          placeholder="placeholderEmergencyContact"
          onChangeText={this.onChangeText}
        />
      </>
    );
  }
  renderGenderModal = () => {
    const { gender, isShowPicker } = this.state;
    return (
      <ModalSelect
        isVisible={isShowPicker}
        isTranslate
        title={translate('gender')}
        options={OPTIONS_GENDER}
        selectedValue={gender}
        onConfirm={this.onConfirm}
        onCancel={() => this.onCancel('isShowPicker')}
      />
    );
  }
  renderBirthdayNodal = () => {
    const { birthday, isShowDate } = this.state;
    return (
      <DateTimePicker
        mode="date"
        titleIOS={translate('birthday')}
        maximumDate={new Date()}
        date={(birthday && new Date(birthday)) || new Date()}
        isVisible={isShowDate}
        onConfirm={this.onDateConfirm}
        onCancel={() => this.onCancel('isShowDate')}
        {...DATE_CONFIG}
      />
    );
  }

  // func
  // AppHeader props
  getHeaderProps = () => ({
    hasRight: true,
    rightPress: this.onSave,
    rightText: 'save',
    rightButtonStyle: styles.rightButtonStyle,
    rightTextStyle: styles.rightTextStyle,
  })
  onResponse = (response) => {
    this.file = {
      uri: response.uri,
      name: response.fileName,
      type: response.type,
    };
  }
  onResizedImageUri = (resizedImageUri) => {
    const { onUpload } = this.props;
    this.file.uri = resizedImageUri.uri;
    this.file.name = resizedImageUri.name;
    this.setState({ avatar: this.file });
    onUpload(this.file);
  }
  // 保存表单事件
  onSave = () => {
    const {
      avatar, name, gender, birthday, email,
      emergencyContact, zipCode,
    } = this.state;
    const { saveProfiles, profile } = this.props;
    if (!name) {
      return toast('placeholderName');
    }
    if (!gender) {
      return toast('placeholderGender');
    }
    if (!birthday) {
      return toast('placeholderBirthday');
    }
    if (!email) {
      return toast('placeholderEmail');
    }
    if (!isEmail(email)) {
      return toast('pleaseEnterYourVaildEmail');
    }
    saveProfiles({
      profileId: profile._id,
      avatar,
      name,
      gender,
      birthday,
      email,
      emergencyContact,
      zipCode,
    });
  }
  // 输入框改变值事件
  onChangeText = (text, source) => this.setState({ [source]: text })
  // 性别选择框改变值事件
  onConfirm= ({ value }) => {
    this.setState({
      isShowPicker: false,
      gender: value,
    });
  }
  // 出生日期选择框改变值事件
  onDateConfirm = (pickedDate) => this.setState({ birthday: pickedDate, isShowDate: false })
  // 关闭选择框事件
  onCancel=(type) => this.setState({ [type]: false })
  render() {
    const { isProfileLoading, isUploading } = this.props;
    const isLoading = isProfileLoading || isUploading;

    return (
      <FullScreenScene
        isLoading={isLoading}
        headerTitle="personalCenter"
        headerProps={this.getHeaderProps()}
      >
        { this.renderTop() }
        { this.renderForms() }
        { this.renderGenderModal() }
        { this.renderBirthdayNodal() }
      </FullScreenScene>
    );
  }
}

ProfileScene.defaultProps = {
};

ProfileScene.propTypes = {
  isProfileLoading: PropTypes.bool.isRequired, // loading状态
  isUploading: PropTypes.bool.isRequired, // 上传头像loading状态
  profile: PropTypes.object.isRequired, // 用户信息
  authUserMembership: PropTypes.object.isRequired, // 用户的会员信息
  saveProfiles: PropTypes.func.isRequired, // 保存用户信息
  onUpload: PropTypes.func.isRequired, // 更新头像
};

const mapStateToProps = createPropsSelector({
  isProfileLoading: selectIsProfileLoading,
  isUploading: selectIsUploading,
  profile: selectProfile,
  authUserMembership: selectMember,
});

const mapDispatchToProps = (dispatch) => ({
  saveProfiles: (params) => dispatch(saveProfilesAction(params)),
  onUpload: (fileBuffer) => dispatch(uploadRefFileAction(fileBuffer)),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export const withReducer = injectReducer({ key: 'profileScene', reducer });

export const withSagas = sagas.map((saga) => injectSaga(saga));

export default compose(
  withConnect,
  withReducer,
  ...withSagas,
)(ProfileScene);
