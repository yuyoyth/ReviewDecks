import React, {Component} from 'react'
import {KeyboardAvoidingView, Text, StyleSheet, TextInput, TouchableOpacity} from 'react-native'
import {black, white} from "../utils/color";
import {addCardToDeck} from "../utils/api";

//卡片添加视图
export default class CardSupply extends Component {
  state = {
    questionInput: '',
    answerInput: ''
  }

  //提交
  submitCard = (question, answer) => {
    const {title} = this.props.navigation.state.params
    addCardToDeck({title, card: {question, answer}}).then((re) => {
      if (re) {
        this.props.navigation.navigate('DeckDetail', {renderFlag: true})
      }
    })
  }

  render() {
    const {questionInput, answerInput} = this.state

    return (
      <KeyboardAvoidingView style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder='Question'
          onChangeText={(questionInput) => this.setState({questionInput})}
        />
        <TextInput
          style={styles.input}
          placeholder='Answer'
          onChangeText={(answerInput) => this.setState({answerInput})}
        />
        <TouchableOpacity
          style={styles.submitBtn}
          onPress={() => this.submitCard(questionInput, answerInput)}
        >
          <Text style={{fontSize: 20, color: white}}>Submit</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 50
  },
  input: {
    width: 270,
    height: 50,
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
    paddingRight: 10,
    marginBottom: 50
  },
  submitBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 145,
    height: 60,
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: black
  }
})