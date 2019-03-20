import React, { Component } from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native'

export default class LinkButton extends Component {
  render() {
    return (
      <TouchableOpacity onPress={() => this.props.onPress()}>
        <Text style={[styles.title, this.props.style, {color: this.props.color, alignSelf: this.props.align}]}>
          {this.props.title}
        </Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  title: {
    fontWeight: 'bold',
    fontSize: 12,
    color: 'black'
  }
})