import React, { PureComponent } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { Container, Header, Content, Button, Item, Input, Form, Label, Toast} from 'native-base';
import { connect } from 'react-redux';
import { white, purple } from '../utils/colors';
import { isNullOrBlank } from '../utils';
import { addCardToDeck } from '../actions';
import QuizCard from '../components/QuizCard';

const QuizReport = ({ score, onPressReset }) => (
  <View style={{flex: 1}}>
    <View style={{flex: 1, justifyContent: 'center'}}>
      <View style={{ alignItems: 'center' }}>
        <Text style={{ fontSize: 25 }}>Congratulation</Text>
        <Text style={{ fontSize: 18 }}>Your score is: <Text style={{fontWeight: 'bold'}}>{score}%</Text></Text>
      </View>
    </View>
    <View style={{
      flex: 0,
      justifyContent: 'flex-end',
    }}>
      <Button block onPress={onPressReset}>
        <Text style={{
          color: white,
          fontSize: 16,
        }}>Retake the Quiz!</Text>
      </Button>
    </View>
  </View>
)

class Quiz extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      progress: 0,
      cards: props.cards,
      deck: props.deck,
      correctCount: 0,
    }
  }

  onPressCorrect = () => {
    this.nextCard({ correctCount: this.state.correctCount + 1 });
  }

  onPressIncorrect = () => {
    this.nextCard();
  }

  onPressReset = () => {
    this.setState({
      progress: 0,
      correctCount: 0,
    })
  }

  nextCard = (update = {}) => {
    let { progress } = this.state;
    progress++;
    this.setState({
      progress,
      ...update,
    })
  }
  
  render() {
    const { progress, deck, cards, correctCount } = this.state;
    const total = cards.length;
    if (total === 0) return <View><Text>Empty Deck</Text></View>;
    const isComplete = progress === total;
    const card = isComplete ? {} : cards[progress];
    const score = Math.round(correctCount / total * 10000) / 100;
    return (
      <View style={styles.container}>
        {isComplete
          ? <QuizReport score={score} onPressReset={this.onPressReset} />
          : <QuizCard
              card={card}
              progress={progress + 1}
              total={total}
              onPressCorrect={this.onPressCorrect}
              onPressIncorrect={this.onPressIncorrect}
            />
        }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: white,
    padding: 10,
  },
  
})

const mapDispatchToProps = (dispatch) => ({
  addCardToDeck: (card, deck) => dispatch(addCardToDeck(card, deck)),
})

const mapStateToProps = (state, { navigation }) => {
  let { id } = navigation.state.params.deck;
  const deck = state.deck.refById[id];
  const cards = deck.cards.map(cid => state.card.refById[cid]);
  return { deck, cards };
}

export default connect(mapStateToProps, mapDispatchToProps)(Quiz);