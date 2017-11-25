import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { View, Text, StyleSheet } from 'react-native';

export default class DeckItem extends PureComponent {
  static propTypes = {
    title: PropTypes.string.isRequired,
    cards: PropTypes.array.isRequired,
    style: PropTypes.any,
  }
  render() {
    const { title, cards, style } = this.props;
    return (
      <View style={[styles.container, style]}>
        <Text style={styles.txtTitle}>{title}</Text>
        <Text style={styles.txtCount}>{cards.length} cards</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: 'white'
  },
  txtTitle: {
    marginTop: 10,
    marginBottom: 5,
    fontSize: 16,
    color: '#333',
    fontWeight: '600',
    textAlign: 'center',
  },
  txtCount: {
    marginTop: 5,
    marginBottom: 10,
    fontSize: 13,
    color: '#999',
    fontWeight: '300',
    textAlign: 'center',
  }
})