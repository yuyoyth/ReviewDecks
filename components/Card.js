import React, {Component} from 'react'
import {View, Text, Button, StyleSheet, TouchableOpacity, Animated} from 'react-native'
import {littleGray, red} from "../utils/color";

const CARD_STATUS = {
  QUESTION: 0,
  ANSWER: 1
}

//卡片问题面
class CardQuestion extends Component {
  state = {
    scaleY: new Animated.Value(0)
  }

  componentDidMount() {
    Animated.timing(this.state.scaleY, {toValue: 1, duration: 500}).start()
  }

  toAnswer = () => {
    Animated.timing(this.state.scaleY, {toValue: 0, duration: 500}).start(this.props.btnCallBack)
  }

  render() {
    return (
      <Animated.View style={[styles.card, {transform: [{scaleY: this.state.scaleY}]}]}>
        <Text style={styles.text}>{this.props.question}</Text>
        <TouchableOpacity onPress={this.toAnswer}>
          <Text style={{fontSize: 20, color: red}}>Answer</Text>
        </TouchableOpacity>
      </Animated.View>
    )
  }
}

//卡片答案面
class CardAnswer extends Component {
  state = {
    scaleY: new Animated.Value(0)
  }

  componentDidMount() {
    Animated.timing(this.state.scaleY, {toValue: 1, duration: 500}).start()
  }

  toQuestion = () => {
    Animated.timing(this.state.scaleY, {toValue: 0, duration: 500}).start(this.props.btnCallBack)
  }

  render() {
    return (
      <Animated.View style={[styles.card, {transform: [{scaleY: this.state.scaleY}]}]}>
        <Text style={styles.text}>{this.props.answer}</Text>
        <TouchableOpacity onPress={this.toQuestion}>
          <Text style={{fontSize: 20, color: red}}>Question</Text>
        </TouchableOpacity>
      </Animated.View>
    )
  }
}

//卡片
export default class Card extends Component {
  state = {
    cardStatus: CARD_STATUS.QUESTION
  }

  toAnswer = () => this.setState({cardStatus: CARD_STATUS.ANSWER})
  toQuestion = () => this.setState({cardStatus: CARD_STATUS.QUESTION})

  render() {
    const {question, answer} = this.props
    const {cardStatus} = this.state

    return {
      [CARD_STATUS.QUESTION]: () =>
        <CardQuestion question={question} btnCallBack={this.toAnswer}/>,
      [CARD_STATUS.ANSWER]: () =>
        <CardAnswer answer={answer} btnCallBack={this.toQuestion}/>,
    }[cardStatus]()
  }
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 10,
    backgroundColor: littleGray,
    alignItems: 'center',
    padding: 15,
    shadowOffset: {width: 5, height: 5},
    shadowOpacity: 0.5,
    shadowRadius: 5,
    shadowColor: 'black',
    elevation: 5,
  },
  text: {
    width: 270,
    fontSize: 27,
    textAlign: 'center',
    marginBottom: 25
  },
})