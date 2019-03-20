import React, { Component } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';

export default class TextBox extends Component {
  handleChange(text) {
    this.props.handleChange(text);
  }
  render() {
    return (
      <View style={[styles.container, this.props.style]}>
        <TextInput
          style={styles.textInput}
          placeholder={this.props.placeholder}
          onChangeText={(text) => this.handleChange(text)}
          value={this.props.value}
          secureTextEntry={this.props.isSecure}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: '#F8F8F8',
    borderWidth: 0.5,
    borderColor: '#BCBCBC',
    borderRadius: 3
  },
  textInput: {
    paddingTop: 14,
    paddingBottom: 14,
    paddingLeft: 20
  }
})