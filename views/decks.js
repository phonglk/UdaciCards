import React, { PureComponent } from 'react';
import { View, Text } from 'react-native';
import { StackNavigator } from 'react-navigation';

class Decks extends PureComponent {
  
  render() {
    return (
      <View>
        <Text>Decks</Text>
        <Text onPress={() => this.props.navigation.navigate('Deck')}>Deck</Text>
      </View>
    )
  }
}

export default Decks;