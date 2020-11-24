/**
 *
 * SettingSceneFeedBack Component
 *
 */

import React from 'react';
import {
  TextInput,
} from 'react-native';
import {
  View,
} from 'native-base';

import Button from 'components/Button';
import TranslateText from 'components/TranslateText';

import styles from './styles';
export class RecommendationCodeModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      recommendationCode: '',
    };
  }
  onSubmitFeedBack = (value) => console.log(value)

  render() {
    const { recommendationCode } = this.state;
    return (
      <View>
        <TranslateText label="recommendationCodeTitle" style={styles.titleStyle} />
        <TranslateText label="recommendationCodeTip" style={styles.textStyle} numberOfLines={3} />
        <TextInput
          autoFocus
          value={recommendationCode}
          style={styles.textInputStyle}
          onChangeText={(text) => this.setState({ recommendationCode: text })}
        />
        <Button
          textLabel="confirmAdd"
          style={styles.buttonStyle}
          textStyle={styles.buttonTextStyle}
          onPress={() => this.onSubmitFeedBack(recommendationCode)}
        />
      </View>
    );
  }
}

RecommendationCodeModal.defaultProps = {
};

RecommendationCodeModal.propTypes = {
};

export default RecommendationCodeModal;
