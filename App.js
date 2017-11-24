import React from 'react';
import { StyleSheet, Text, View, StatusBar } from 'react-native';
import { StackNavigator, TabNavigator } from 'react-navigation'
import { Provider } from 'react-redux';
import { Constants, AppLoading } from 'expo';

import Deck from './views/Deck';
import NewCard from './views/NewCard';
import Quiz from './views/Quiz';
import Decks from './views/Decks';
import NewDeck from './views/NewDeck';

import { initStore } from './store';

const Tabs = TabNavigator({
  Decks: {
    screen: Decks,
  },
  NewDeck: {
    screen: NewDeck,
  }
});

const Nav = StackNavigator({
  Home: {
    screen: Tabs,
  },
  Decks: {
    screen: Decks
  },
  Deck: {
    screen: Deck,
  },
  NewCard: {
    screen: NewCard,
  },
  Quiz: {
    screen: Quiz,
  },
})

const MyStatusBar = ({ backgroundColor, ...props }) => (
  <View style={{backgroundColor, height: Constants.statusBarHeight }}>
    <StatusBar translucent backgroundColor={backgroundColor} {...props} />
  </View>
)

// load the storage to store
// subscriber to store change then update to AsyncStorage
export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isReady: false,
      error: null,
    };
    this.store = null;
    this.unmountStore = () => {};
  }
  componentWillMount() {
    initStore().then(({ store, unmountStore }) => {
      this.store = store;
      this.unmountStore = unmountStore;
      this.setState({ isReady: true });
    }).catch((e) => {
      this.setState({ error: e.message });
    })
  }
  componentWillUnmount() {
    this.unmountStore();
  }
  render() {
    const { isReady, error } = this.state;
    const store = this.store;
    return (
      error 
      ? <View>
          <Text>Error while application initilisation: {error}</Text>
        </View>
      : !isReady
        ? <AppLoading />
        : <Provider store={store}>
            <View style={{flex: 1}}>
              <MyStatusBar backgroundColor={'#292477'} barStyle='light-content' />
              <Nav />
            </View>
          </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
