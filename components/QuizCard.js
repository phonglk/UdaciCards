import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { View, Text, StyleSheet } from 'react-native';
import { Button } from 'native-base';
import FlipCard from './FlipCard';
import { white, purple } from '../utils/colors';

export default class DeckItem extends PureComponent {
  static propTypes = {
    card: PropTypes.object.isRequired,
    progress: PropTypes.number.isRequired,
    total: PropTypes.number.isRequired,
    onPressCorrect: PropTypes.func.isRequired,
    onPressIncorrect: PropTypes.func.isRequired,
  }
  render() {
    const { 
      card,
      progress,
      total,
      onPressCorrect,
      onPressIncorrect,
    } = this.props;
    return (
      <View style={styles.container}>
        <Text style={styles.txtProgress}>Card: {progress}/{total}</Text>
        <View style={{ flex: 2, justifyContent: 'center' }}>
          <FlipCard {...card} />
        </View>
        <View style={{ justifyContent: 'flex-end', flex: 1 }}>
          <Button block danger style={styles.btn} onPress={onPressIncorrect}>
            <Text style={styles.txtBtn}>Incorrect</Text>
          </Button>
          <Button block success style={styles.btn} onPress={onPressCorrect}>
            <Text style={styles.txtBtn}>Correct</Text>
          </Button>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  txtProgress: {
    marginTop: 5,
    marginBottom: 5,
    fontSize: 14,
    color: '#333',
    fontWeight: '600',
    textAlign: 'center',
  },
  btn: {
    marginTop: 10,
    marginBottom: 0,
  },
  txtBtn: {
    color: white,
    fontSize: 16,
  }
})