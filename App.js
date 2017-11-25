import React from 'react';
import { StyleSheet, Text, View, StatusBar } from 'react-native';
import { StackNavigator, TabNavigator } from 'react-navigation'
import { Provider } from 'react-redux';
import Expo, { Constants, AppLoading } from 'expo';
import { FontAwesome } from '@expo/vector-icons';
import { Root } from 'native-base';

import Deck from './views/Deck';
import NewCard from './views/NewCard';
import Quiz from './views/Quiz';
import Decks from './views/Decks';
import NewDeck from './views/NewDeck';

import { purple, black, white } from './utils/colors';

import { initStore } from './store';

// test
import FlipCard from './components/FlipCard';

const Tabs = TabNavigator({
  Decks: {
    screen: Decks,
    navigationOptions: {
      tabBarLabel: 'Decks',
      tabBarIcon: ({ tintColor }) => <FontAwesome name="th-list" size={30} color={tintColor} />
    }
  },
  NewDeck: {
    screen: NewDeck,
    navigationOptions: {
      tabBarLabel: 'New Deck',
      tabBarIcon: ({ tintColor }) => <FontAwesome name="plus-square" size={30} color={tintColor} />
    }
  }
}, {
  navigationOptions: {
    header: null,
  },
  tabBarOptions: {
    activeTintColor: white,
    style: {
      height: 56,
      backgroundColor: purple,
      shadowColor: 'rgba(0, 0, 0, 0.24)',
      shadowOffset: {
        width: 0,
        height: 3
      },
      shadowRadius: 6,
      shadowOpacity: 1,
    }
  }
});

const Nav = StackNavigator({
  Home: {
    screen: Tabs,
  },
  Deck: {
    screen: Deck,
  },
  NewCard: {
    screen: NewCard,
    navigationOptions: {
      title: 'Add Card',
      headerTintColor: white,
      headerStyle: {
        backgroundColor: purple,
      },
    }
  },
  Quiz: {
    screen: Quiz,
    navigationOptions: {
      title: 'Quiz',
      headerTintColor: white,
      headerStyle: {
        backgroundColor: purple,
      },
    }
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
  async componentWillMount() {
    await Expo.Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
      Ionicons: require("@expo/vector-icons/fonts/Ionicons.ttf")
    });
    try {
      const { store, unmountStore } = await initStore();
      this.store = store;
      this.unmountStore = unmountStore;
      this.setState({ isReady: true });
    } catch (e) {
      this.setState({ error: e.message });
    }
  }
  componentWillUnmount() {
    this.unmountStore();
  }
  render() {
    const { isReady, error } = this.state;
    const store = this.store;
    // return <View style={{flex: 1, padding: 20}}><FlipCard question="question" answer="answer" style={{height: 100}} /></View>
    return (
      error 
      ? <View>
          <Text>Error while application initilisation: {error}</Text>
        </View>
      : !isReady
        ? <AppLoading />
        : <Provider store={store}>
            <View style={{flex: 1}}>
              <MyStatusBar backgroundColor={purple} barStyle='light-content' />
              <Root>
                <Nav />
              </Root>
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
