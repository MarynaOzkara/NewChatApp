import { api } from '@/convex/_generated/api'
import { Doc, Id } from '@/convex/_generated/dataModel'
import Ionicons from '@expo/vector-icons/Ionicons'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useConvex, useMutation, useQuery } from 'convex/react'
import { useLocalSearchParams, useNavigation } from 'expo-router'
import React, { useEffect, useState } from 'react'
import { FlatList, KeyboardAvoidingView, ListRenderItem, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const Page = () => {
    const {chatid} = useLocalSearchParams()
    const [user, setUser] = useState('')
    const [newMessage, setNewMessage] = useState('')
    const convex = useConvex()
    const navigation = useNavigation()
    const addMessage = useMutation(api.messages.sendMessage)
    const messages = useQuery(api.messages.get, {chatId: chatid as Id<'groups'>}) || []
   useEffect(() => {
    const loadGroup = async () => {
      const groupInfo = await convex.query(api.groups.getGroup, {id: chatid as Id<'groups'>})
      console.log("Group Info:", groupInfo);
      navigation.setOptions({headerTitle: groupInfo?.name || 'Chat'})
    }
    loadGroup()
   }, [chatid]) 
    
   useEffect(() => {
    const loadUser = async () => {
       const user = await AsyncStorage.getItem('user');
         setUser(user || '');
      }
      loadUser()
   }, [])

   const handleSendMessage = () => {
    addMessage({content: newMessage, group_id: chatid as Id<'groups'>, user})
    // setNewMessage('')
   }

   const renderMessage: ListRenderItem<Doc<'messages'>> = ({item}) => {
    const isUserMessage = item.user === user;
    return (
      <View>
        <Text>{item.content}</Text>
      </View>
    )
   }
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
      <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === "ios" ? "padding" : "height"}>
        {/* Messages List */}
        <FlatList data={messages} renderItem={renderMessage} keyExtractor={(item) => item._id.toString()}/>

        {/* Input Button */}
        <View style={styles.inputContainer}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <TextInput
              style={styles.textInput}
              placeholder="Type a message"
              value={newMessage}
              onChangeText={setNewMessage}
              multiline={true}
            />
            <TouchableOpacity style={styles.sendButton} onPress={handleSendMessage}>
              <Ionicons name='send-outline' style={styles.sendButtonText}/>
            </TouchableOpacity>
          </View>
        </View>
          
          
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

export default Page

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  inputContainer: {
    backgroundColor: '#fff',
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -8 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  textInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    paddingHorizontal: 10,
    minHeight: 40,
    backgroundColor: '#fff',
    paddingTop: 10,
  },
  sendButton: {
    backgroundColor: '#EEA217',
    borderRadius: 5,
    padding: 10,
    marginLeft: 10,
    alignSelf: 'flex-end',
  },
  sendButtonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
  messageContainer: {
    padding: 10,
    borderRadius: 10,
    marginTop: 10,
    marginHorizontal: 10,
    maxWidth: '80%',
  },
  userMessageContainer: {
    backgroundColor: '#791363',
    alignSelf: 'flex-end',
  },
  otherMessageContainer: {
    alignSelf: 'flex-start',
    backgroundColor: '#fff',
  },
  messageText: {
    fontSize: 16,
    flexWrap: 'wrap',
  },
  userMessageText: {
    color: '#fff',
  },
  timestamp: {
    fontSize: 12,
    color: '#c7c7c7',
  },
})

