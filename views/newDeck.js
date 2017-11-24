import React, { PureComponent } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import { Container, Header, Content, Button, Item, Input} from 'native-base';
import { addDeck } from '../actions';


class NewDeck extends PureComponent {
  state = {
    title: '',
  }

  addDesk = () => {
    const { title } = this.state;
    const deck = { title };
    this.props.addDeck(deck);
  }

  render() {
    return (
      <Container>
        <Content style={{margin: 10}}>
          <Item>
            <Text style={styles.textTitle}>What is the title of your new deck ?</Text>
          </Item>
          <Item regular>
            <Input
              style={{ backgroundColor: 'white' }}
              placeholder="Deck Title"
              onChangeText={(title) => this.setState({ title })}
            />
          </Item>
          <Button block style={{marginTop: 10}} onPress={this.addDesk}>
            <Text style={styles.textBtn}>Add New Desk</Text>
          </Button>
        </Content>
      </Container>
    )
  }
}

const styles = {
  textTitle: {
    fontSize: 16,
    marginBottom: 10,
  },
  textBtn: {
    fontSize: 20,
    color: 'white',
  }
}

const mapDispatchToProps = (dispatch) => ({
  addDeck: (deck) => dispatch(addDeck(deck)),
})

export default connect(() => ({}), mapDispatchToProps)(NewDeck);