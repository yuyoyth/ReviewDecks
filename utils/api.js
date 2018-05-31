import {AsyncStorage} from 'react-native'
import {generateUUID} from './tools'

//获取所有卡片集数据，返回promise
export function getDecks() {
  return AsyncStorage.getItem('Decks')
    .then((result) => !result ? {} : JSON.parse(result))
}

//获取单个卡片集数据，返回promise
export function getDeck(title) {
  return getDecks().then((result) => result[title])
}

//保存新的卡片集，返回promise
export function saveDeckTitle(title) {
  return new Promise(async (resolve, reject) => {
    //获得卡片集标题
    const newTitle = await newDeckName(title)
    //合并数据
    await AsyncStorage.mergeItem('Decks', JSON.stringify({
      [newTitle]: {
        id: generateUUID(),
        title: newTitle,
        questions: []
      }
    }))
    resolve(true)
  })
}

//生成卡片集标题
async function newDeckName(title, loop = 0) {
  try {
    //初始使用输入的标题，否则添加后缀
    const newTitle = loop === 0 ? title : `${title} ${loop}`
    //查询卡片集是否已存在
    const data = await getDeck(newTitle)
    if (!data) {
      //不存在，返回生成标题
      return newTitle
    } else {
      //存在，重新生成标题
      return newDeckName(title, loop + 1)
    }
  } catch (e) {
    alert(e.message)
  }
}

//添加卡片到已有卡片集，返回promise
export function addCardToDeck({title, card}) {
  return new Promise(async (resolve, reject) => {
    try {
      //检查卡片集是否存在
      const data = await getDeck(title)
      if (!data) {
        resolve(false)
      } else {
        //合并卡片到数据中
        await AsyncStorage.mergeItem('Decks', JSON.stringify({
          [title]: {
            questions: [
              ...data.questions,
              {
                id: generateUUID(),
                question: !card.question ? '' : card.question,
                answer: !card.answer ? '' : card.answer
              }
            ]
          }
        }))
        resolve(true)
      }
    } catch (e) {
      reject(e.message)
    }
  })
}

//学习状态key
const LEARNED_KEY = 'LEARNED_DAY'

//已经学习，记录时间，返回promise
export function learned() {
  return AsyncStorage.setItem(LEARNED_KEY, JSON.stringify(new Date().getDay()))
}

//获得记录的学习时间，返回promise
export function getLearnedDay() {
  return AsyncStorage.getItem(LEARNED_KEY)
}