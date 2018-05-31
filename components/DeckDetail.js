import React, {Component} from 'react'
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native'
import {getDeck, getDecks} from "../utils/api";
import {black, gray, white} from "../utils/color";

//卡片集详情页面
export default class DeckDetail extends Component {
  state = {
    questionNum: 0
  }

  componentDidMount() {
    //获得展示的卡片集标题，初始化数据
    const {title} = this.props.navigation.state.params
    getDeck(title).then((re) => this.setState({questionNum: re.questions.length}))
  }

  componentWillReceiveProps(nextP) {
    const {title} = this.props.navigation.state.params
    getDeck(title).then((re) => this.setState({questionNum: re.questions.length}))
  }

  //测试点击回调，没有卡片时不能测试
  quizBtnClick = (questionNum, title) => {
    if (questionNum === 0) {
      alert('No Card!')
    }else {
      this.props.navigation.navigate('DeckQuiz', {title})
    }
  }

  render() {
    const {title} = this.props.navigation.state.params

    return (
      <View style={styles.container}>
        <View style={styles.detailView}>
          <Text style={{fontSize: 50}}>{title}</Text>
          <Text style={{fontSize: 42, color: gray}}>{this.state.questionNum} cards</Text>
        </View>

        <TouchableOpacity
          style={[styles.btn, styles.addBtn]}
          onPress={() => {
            this.props.navigation.navigate('CardSupply', {title})
          }}
        >
          <Text style={{fontSize: 20}}>Add Card</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.btn, styles.quizBtn]}
          onPress={() => this.quizBtnClick(this.state.questionNum, title)}
        >
          <Text style={{fontSize: 20, color: white}}>Start Quiz</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  detailView: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 125
  },
  btn: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 145,
    height: 60,
    borderWidth: 1,
    borderRadius: 10
  },
  addBtn: {
    marginBottom: 30
  },
  quizBtn: {
    backgroundColor: black,
  }
})