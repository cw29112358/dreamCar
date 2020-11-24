/**
*
* SettingSceneFeedBack Component
*
*/

import React from 'react';
// import PropTypes from 'prop-types';
// import { compose } from 'redux';
// import { connect } from 'react-redux';
// import { reset } from 'redux-form/immutable';
// import { createPropsSelector } from 'reselect-immutable-helpers';
import {
  TextInput,
} from 'react-native';
import {
  View,
} from 'native-base';

// import { sendContactUsEmail } from 'apis/strapi';

import Button from 'components/Button';
import FullScreenScene from 'components/FullScreenScene';
import TranslateText from 'components/TranslateText';

// import TextInput from 'forms/CompositeTextInput';

import styles from './styles';
export class SettingSceneFeedBack extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      done: true,
      textAreaValue: '',
    };
  }
  onSubmitFeedBack = (value) => console.log(value)
  // onSubmitFeedBack = (formData) => {
  //   const { userInfo } = this.props;
  //   const formObject = {
  //     email: userInfo.email,
  //     firstName: userInfo.firstName,
  //     phoneNumber: userInfo.phoneNumber,
  //     message: formData.get('message'),
  //   };
  //
  //   this.setState({ done: false });
  //   sendContactUsEmail(formObject)
  //     .then(() => {
  //       this.onSubmitFeedBackSuccess();
  //       window.alert('feedBackSuccessTitle', 'feedBackSuccessMessage');
  //     })
  //     .catch(() => {
  //       window.alert('feedBackErrorTitle', 'feedBackErrorMessage');
  //     });
  // }
  // onSubmitFeedBackSuccess() {
  //   const { resetForm } = this.props;
  //   this.setState({ done: true });
  //   resetForm();
  // }
  render() {
    const { textAreaValue } = this.state;
    const { done } = this.state;
    return (
      <FullScreenScene
        isLoading={!done}
        headerTitle="feedBack"
        contentProps={{
          keyboardDismissMode: styles.isIOS ? 'on-drag' : 'none',
          keyboardShouldPersistTaps: 'never',
        }}
        contentStyle={styles.content}
      >
        <TranslateText label="feedBackQuestions" style={styles.titleStyle} />
        <TranslateText label="feedBackText" style={styles.textStyle} numberOfLines={3} />
        <View style={styles.textInputViewStyle}>
          <TextInput
            editable
            autoFocus
            multiline
            numberOfLines={8}
            value={textAreaValue}
            style={styles.textInputStyle}
            onChangeText={(text) => this.setState({ textAreaValue: text })}
          />
        </View>
        <Button
          textLabel="submit"
          style={styles.buttonStyle}
          textStyle={styles.buttonTextStyle}
          onPress={() => this.onSubmitFeedBack(textAreaValue)}
        />
      </FullScreenScene>
    );
  }
}

SettingSceneFeedBack.defaultProps = {
  // userInfo: {},
};

SettingSceneFeedBack.propTypes = {
  // userInfo: PropTypes.object,
};

// const mapStateToProps = createPropsSelector({
// });
//
// const mapDispatchToProps = (dispatch) => ({
// });
// const withConnect = connect(mapStateToProps, mapDispatchToProps);
//
// export default compose(
//   withConnect,
// )(SettingSceneFeedBack);
export default SettingSceneFeedBack;
