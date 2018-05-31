import React from 'react';
import { StyleSheet, Text, View, StatusBar } from 'react-native';
import {createMaterialTopTabNavigator, createStackNavigator} from 'react-navigation'
import {Constants} from 'expo'
import DecksHome from './components/DecksHome'
import DeckSupply from './components/DeckSupply'
import {black, white, yellow} from "./utils/color";
import DeckDetail from "./components/DeckDetail";
import CardSupply from "./components/CardSupply";
import DeckQuiz from "./components/DeckQuiz";
import {getLearnedDay} from "./utils/api";
import {setLocalNotification} from "./utils/notification";

//状态栏
function AppStatusBar({backgroundColor, ...props}) {
  return (
    <View style={{backgroundColor, height: Constants.statusBarHeight}}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props}/>
    </View>
  )
}

//顶部导航
const Tabs = createMaterialTopTabNavigator({
  Decks: {
    screen: DecksHome,
    navigationOptions: {
      tabBarLabel: 'Decks',
    }
  },
  newDeck: {
    screen: DeckSupply,
    navigationOptions: {
      tabBarLabel: 'New Deck',
    }
  }
}, {
  tabBarOptions: {
    activeTintColor: yellow,
    labelStyle: {
      color: black
    },
    style: {
      height: 50,
      backgroundColor: white
    }
  }
})

//堆栈导航
const MainNavigator = createStackNavigator({
  Home: {
    screen: Tabs,
    navigationOptions: {
      header: null
    }
  },
  DeckDetail: {
    screen: DeckDetail,
    navigationOptions: ({navigation}) => ({
      headerTitle: !navigation.state.params.title
        ? 'Deck Detail'
        : navigation.state.params.title
    })
  },
  CardSupply: {
    screen: CardSupply,
    navigationOptions: ({navigation}) => ({
      headerTitle: !navigation.state.params.title
        ? 'Add Card'
        : `Add Card To ${navigation.state.params.title}`
    })
  },
  DeckQuiz: {
    screen: DeckQuiz,
    navigationOptions: ({navigation}) => ({
      headerTitle: !navigation.state.params.title
        ? 'Quiz'
        : `${navigation.state.params.title} Quiz`
    })
  }
}, {
  navigationOptions: {
    headerTintColor: white,
    headerStyle: {
      backgroundColor: black,
      //我自己调试，堆栈导航貌似自带状态栏，查文档没看到取消的方法，故用样式掩盖
      marginTop: -Constants.statusBarHeight
    }
  },
})

export default class App extends React.Component {

  componentDidMount() {
    getLearnedDay().then((day) => {
      if (!day || day !== JSON.stringify(new Date().getDay())) {
        setLocalNotification()
      }
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <AppStatusBar backgroundColor={black}/>
        <MainNavigator/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'flex-start',
  },
})