import React, { PureComponent } from 'react';
import { View, Text } from 'react-native';
import { Container, Header, Content, Button, Item, Input} from 'native-base';

class Deck extends PureComponent {
  render() {
    return (
      <Container>
        <Header />
        <Content>
          <Button block>
            <Text>Add New Desk</Text>
          </Button>
        </Content>
      </Container>
    );
  }
}

export default Deck;