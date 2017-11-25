import React, { PureComponent } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Container, Header, Content, Button, Item, Input} from 'native-base';
import { connect } from 'react-redux';
import { white, purple, black } from '../utils/colors'
import DeckItem from '../components/DeckItem';

class Deck extends PureComponent {
  static navigationOptions = ({ navigation }) => {
    const { title } = navigation.state.params.deck;
    return {
      title,
      headerTintColor: white,
      headerStyle: {
        backgroundColor: purple,
      },
    }
  }

  goToAddCard = () => {
    const { deck } = this.props;
    this.props.navigation.navigate('NewCard', { deck });
  }
  goToQuiz = () => {
    const { deck } = this.props;
    this.props.navigation.navigate('Quiz', { deck });
  }
  render() {
    const { deck } = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.card}>
          <DeckItem {...deck} />
        </View>
        <View style={styles.btns}>
          <Button success block style={styles.btn} onPress={this.goToAddCard}>
            <Text style={styles.txtBtn}>Add Card</Text>
          </Button>
          <Button primary block style={styles.btn} onPress={this.goToQuiz} disabled={deck.cards.length === 0}>
            <Text style={styles.txtBtn}>Start Quiz</Text>
          </Button>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: white,
  },
  card: {
    flex: 2,
    justifyContent: 'center',
  },
  btns: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 5,
  },
  btn: {
    marginTop: 5,
    marginBottom: 5,
    marginLeft: 10,
    marginRight: 10,
  },
  txtBtn: {
    color: white,
    fontSize: 14,
  }
})

const mapStateToProps = (state, { navigation }) => {
  let { id } = navigation.state.params.deck;
  if (id === 'latest') id = state.deck.lastId;
  const deck = state.deck.refById[id];
  return { deck };
}

export default connect(mapStateToProps)(Deck);