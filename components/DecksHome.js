import React, {Component} from 'react'
import {View, Text, StyleSheet} from 'react-native'
import DeckList from './DeckList'
import {getDecks} from "../utils/api";

//展示卡片集列表视图
export default class DecksHome extends Component{
  state = {
    decks: {}
  }

  //初始化视图
  componentDidMount() {
    getDecks().then((result) => this.setState({decks: result}))
  }

  //更新视图
  componentWillReceiveProps(nextP) {
    getDecks().then((result) => this.setState({decks: result}))
  }

  //卡片集点击回调
  deckClick = (title) => this.props.navigation.navigate('DeckDetail', {title})

  render() {
    return (
      <View style={styles.container}>
        <DeckList
          decks={Object.values(this.state.decks)}
          deckClickCallBack={(title) => this.deckClick(title)}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'center',
  },
})