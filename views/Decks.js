import React, { PureComponent } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { StackNavigator } from 'react-navigation';
import { connect } from 'react-redux';
import { Container} from 'native-base';

import DeckItem from '../components/DeckItem';

class Decks extends PureComponent {
  onPressDeck = (deck) => {
    this.props.navigation.navigate('Deck', { deck });
  }
  render() {
    const { decks } = this.props;
    return (
      <View style={{flex: 1}}>
        <FlatList
          style={styles.list}
          data={decks}
          keyExtractor={({id}) => id}
          renderItem={({item: deck}) => 
            <TouchableOpacity
              style={styles.deck}
              onPress={() => this.onPressDeck(deck)}
            >
              <DeckItem {...deck} />
            </TouchableOpacity>
          }
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  list: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 1)',
  },
  deck: {
    marginTop: 0,
    marginBottom: 15,
    shadowColor: 'rgba(0, 0, 0, 0.3)',
    shadowOffset: {
      width: 0, height: 2,
    },
    shadowRadius: 3,
    shadowOpacity: 1,
  }
})

const mapStateToProps = (state) => {
  const { list, refById } = state.deck;
  const decks = list.map(id => refById[id]);
  return {
    decks,
  }
}

export default connect(mapStateToProps)(Decks);