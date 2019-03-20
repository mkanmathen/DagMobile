import React, { Component } from 'react';
import { TouchableOpacity, StyleSheet, Text } from 'react-native';

export default class Button extends Component {
  render() {
    return (
      <TouchableOpacity disabled={this.props.disabled} style={[!this.props.disabled ? styles.container : styles.disabled, {color: this.props.color}]} onPress={() => this.props.onPress()}>
        <Text style={[styles.title, {color: this.props.textColor}]}>
          {this.props.title}
        </Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#E6720F',
    width: '100%',
    borderRadius: 3,  
  },
  title: {
    marginTop: 14,
    marginBottom: 14,
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  disabled: {
    backgroundColor: '#BCBCBC',
    width: '100%',
    borderRadius: 3, 
  }
})