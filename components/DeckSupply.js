import React, {Component} from 'react'
import {KeyboardAvoidingView, Text, StyleSheet, TextInput, TouchableOpacity} from 'react-native'
import {black, white} from "../utils/color";
import {saveDeckTitle} from "../utils/api";

//卡片集添加视图
export default class DeckSupply extends Component {
  state = {
    titleInput: ''
  }

  titleInputChange = (text) => {
    this.setState({titleInput: text})
  }

  submitTitle = (title) => {
    saveDeckTitle(title).then(() => {
      this.props.navigation.navigate('Decks', {renderFlag: true})
    })
  }

  render() {
    const {titleInput} = this.state

    return (
      <KeyboardAvoidingView style={styles.container}>
        <Text style={styles.text}>What is the title of your new deck?</Text>
        <TextInput
          style={styles.input}
          placeholder='Deck Title'
          onChangeText={this.titleInputChange}
          onSubmitEditing={() => this.submitTitle(titleInput)}
        />
        <TouchableOpacity
          style={styles.submitBtn}
          onPress={() => this.submitTitle(titleInput)}
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
    justifyContent: 'center',
  },
  text: {
    width: 240,
    textAlign: 'center',
    fontSize: 36,
    marginBottom: 25
  },
  input: {
    width: 250,
    height: 50,
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
    paddingRight: 10,
    marginBottom: 25
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