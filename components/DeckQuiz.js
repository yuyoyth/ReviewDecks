import React, {Component} from 'react'
import {View, Text, Button, StyleSheet, TouchableOpacity, Animated} from 'react-native'
import Card from './Card'
import {red, green, white} from "../utils/color";
import {getDeck, learned} from "../utils/api";
import {clearLocalNotification} from "../utils/notification";

//测试视图，用于复习过程
function QuizView({questions, current, correctCallBack, incorrectCallBack}) {
  return (
    <View style={styles.QuizView}>
      <Text style={{fontSize: 25}}>{current+1} / {questions.length}</Text>
      <View style={styles.centerView}>
        <Card question={questions[current].question} answer={questions[current].answer}/>
        <View style={styles.btnView}>
          <TouchableOpacity
            style={[styles.btn, styles.goodBtn]}
            onPress={correctCallBack}
          >
            <Text style={{fontSize: 20, color: white}}>Correct</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.btn, styles.badBtn]}
            onPress={incorrectCallBack}
          >
            <Text style={{fontSize: 20, color: white}}>Incorrect</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

//结果视图，用于显示测试结果
function QuizResult({correct, total, resetCallBack}) {
  return (
    <View style={styles.quizResult}>
      <Text style={{fontSize: 27}}>Your score is {Math.ceil(correct / total * 100)}.</Text>
      <TouchableOpacity
        style={[styles.btn, {borderWidth: 1, marginTop: 35}]}
        onPress={resetCallBack}
      >
        <Text style={{fontSize: 20}}>Go Back</Text>
      </TouchableOpacity>
    </View>
  )
}

//卡片集测试视图
export default class DeckQuiz extends Component {
  state = {
    current: 0,
    correct: 0,
    questions: [],
  }

  reset = () => {
    this.props.navigation.goBack()
  }

  //点击正确按钮回调
  correctClick = (current, correct) => {
    this.setState({current: current + 1, correct: correct + 1})
  }

  //点击错误按钮回调
  incorrectClick = (current) => {
    this.setState({current: current + 1})
  }

  //初始化视图
  componentDidMount() {
    const {title} = this.props.navigation.state.params
    getDeck(title).then((re) => this.setState({
      current: 0,
      correct: 0,
      questions: re.questions
    }))
  }

  render() {
    const {current, correct, questions} = this.state

    if (questions.length > 0 && current >= questions.length) {
      //测试结束，记录已学习
      learned().then(clearLocalNotification())
      //没有剩余卡片，测试结束显示结果
      return <QuizResult
        correct={correct}
        total={questions.length}
        resetCallBack={this.reset}/>
    }else if (questions.length > 0) {
      //保证问题数不为零且仍然剩余卡片才能进行测试
      return (
        <QuizView
          questions={questions}
          current={current}
          correctCallBack={() => this.correctClick(current, correct)}
          incorrectCallBack={() => this.incorrectClick(current)}/>
      )
    }else {
      return null
    }
  }
}

const styles = StyleSheet.create({
  quizResult: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  QuizView: {
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'flex-start',
  },
  centerView: {
    flex: 1,
    marginTop: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  btn: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 145,
    height: 60,
    borderRadius: 10
  },
  goodBtn: {
    backgroundColor: green,
    marginBottom: 30
  },
  badBtn: {
    backgroundColor: red,
    marginBottom: 120
  }
})