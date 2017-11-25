import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';

export default class FlipCard extends PureComponent {
  static propTypes = {
    question: PropTypes.string.isRequired,
    answer: PropTypes.string.isRequired,
    style: PropTypes.object,
  }
  state = {
    isFlipped: false,
    fadeAnim: new Animated.Value(1),
  }
  onFlip = () => {
    Animated.timing(this.state.fadeAnim, { toValue: 0, duration: 500 }).start(
      () => {
        this.setState({ isFlipped: !this.state.isFlipped })
        Animated.timing(this.state.fadeAnim, { toValue: 1, duration: 500 }).start();
      }
    )
  }
  render() {
    const { question, answer, style={} } = this.props;
    const { isFlipped, fadeAnim } = this.state;
    return (
      <Animated.View style={[
        styles.container,
        style,
        { opacity: fadeAnim }
      ]}>
        <Text style={[styles.txt, isFlipped ? {fontSize: 16} : {}]}>
          {isFlipped
            ? answer
            : question
          }
        </Text>
        <TouchableOpacity onPress={this.onFlip} style={styles.btn}>
          <Text style={styles.txtBtn}>{isFlipped ? 'Question' : 'Answer'}</Text>
        </TouchableOpacity>
      </Animated.View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 0,
    // minHeight: 100,
    padding: 5,
    backgroundColor: 'rgba(240,240,240,0.5)',
    shadowColor: 'rgba(0,0,0,0.3)',
    shadowRadius: 5,
    shadowOpacity: 0.6,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    borderColor: 'rgba(230,230,230,1)',
    borderWidth: 2,
  },
  txt: {
    fontSize: 20,
    color: '#333',
    fontWeight: '600',
    textAlign: 'center',
  },
  btn: {
    marginTop: 10,
  },
  txtBtn: {
    color: 'red',
    fontSize: 14,
    textAlign: 'center',
  }
})