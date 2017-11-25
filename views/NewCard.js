import React, { PureComponent } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { Container, Header, Content, Button, Item, Input, Form, Label, Toast} from 'native-base';
import { connect } from 'react-redux';
import { white, purple } from '../utils/colors';
import { isNullOrBlank } from '../utils';
import { addCardToDeck } from '../actions';

const checkStatus = (state) => state === null || state.trim() !== '' ? {} :  { error: true };

class newCard extends PureComponent {
  state = {
    question: null,
    answer: null,
    // status: null,
    // showToast: false,
  }

  onPressHandler = () => {
    const { deck } = this.props.navigation.state.params;
    const { question, answer } = this.state;
    if (isNullOrBlank(question) || isNullOrBlank(answer)) {
      return Alert.alert('Invalid Card', 'Question and Answer must not be empty');
    }
    const card = { question, answer };
    this.props.addCardToDeck(card, deck);
    Toast.show({
      text: 'New question is added',
      position: 'top',
      buttonText: 'Okay',
    });
    this.setState({
      question: null,
      answer: null,
    })
  }
  
  render() {
    const { question, answer } = this.state;
    const { title } = this.props.navigation.state.params.deck;
    const status = {
      question: checkStatus(question),
      answer: checkStatus(answer)
    };

    return (
      <View style={styles.container}>
        <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{title}</Text>
        <View style={{flex: 1}}>
          <Form style={{flex: 1}}>
            <Item floatingLabel {...status.question}>
              <Label>Question</Label>
              <Input value={question} onChangeText={question => this.setState({ question })}/>
            </Item>
            <Item floatingLabel {...status.answer}>
              <Label>Answer</Label>
              <Input value={answer} onChangeText={answer => this.setState({ answer })}/>
            </Item>
          </Form>
          <Button block style={styles.btn} onPress={this.onPressHandler}>
            <Text style={styles.txtBtn}>Add Card</Text>
          </Button>
        </View>
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
  btn: {
    marginTop: 10,
    marginBottom: 5,
  },
  txtBtn: {
    color: white,
    fontSize: 14,
  }
})

const mapDispatchToProps = (dispatch) => ({
  addCardToDeck: (card, deck) => dispatch(addCardToDeck(card, deck)),
})

export default connect(() => ({}), mapDispatchToProps)(newCard);