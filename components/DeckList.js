import React, {Component} from 'react'
import {View, Text, StyleSheet, FlatList, TouchableOpacity} from 'react-native'
import {gray} from '../utils/color'

//卡片集概要信息
function DeckSummary({title, questions, callBackFun}) {
  return (
    <TouchableOpacity
      style={styles.deckItem}
      onPress={() => callBackFun(title)}
    >
      <Text style={{fontSize: 32}}>{title}</Text>
      <Text style={{fontSize: 25, color: gray}}>{questions.length} cards</Text>
    </TouchableOpacity>
  )
}

//卡片集显示列表
export default function DeckList({decks, deckClickCallBack = (title)=>{alert(title)}}) {
  return (
    <View style={styles.container}>
      <FlatList
        data={decks}
        renderItem={({item}) => <DeckSummary {...item} callBackFun={deckClickCallBack}/>}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'center',
  },
  deckItem: {
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 1,
    paddingTop: 40,
    paddingBottom: 40
  },
})