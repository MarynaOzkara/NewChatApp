import { api } from '@/convex/_generated/api'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useQuery } from 'convex/react'
import { Link } from 'expo-router'
import React, { useEffect, useState } from 'react'
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Dialog from 'react-native-dialog'

const Page = () => {
    const groups = useQuery(api.groups.get) || [];
    const [name, setName] = useState('')
    const [visible, setVisible] = useState(false);
    useEffect(() => {
      const loadUser = async () => {
        const user = await AsyncStorage.getItem('user');
        if (!user) {
          setTimeout(() => {
            setVisible(true);
          }, 100);
        } else {
          
          setName(user);
        }
      }
      loadUser()
    }, [])
    const setUser = async () => {
      await AsyncStorage.setItem('user', name);
      setName(name);
      setVisible(false);
    }
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <ScrollView style={styles.container}>
        {groups.map((group) => (
            <Link href={{pathname: "/(chat)/[chatid]", params: {chatid: group._id}}} key={group._id.toString()} asChild>
                <TouchableOpacity style={styles.group}>
                    <Image source={{uri: group.icon_url}} style={{width: 50, height: 50}}/>
                    <View >
                        <Text style={{fontSize: 18, fontWeight: 'bold'}}>{group.name}</Text>
                        <Text style={{color: "#888"}}>{group.description}</Text>
                    </View>      
                </TouchableOpacity>
                
            </Link>
        ))}
      </ScrollView>
      <Dialog.Container visible={visible}>
        <Dialog.Title>Enter your name</Dialog.Title>
        <Dialog.Description>Please insert your name to start chating</Dialog.Description>
        <Dialog.Input onChangeText={setName}/>
        <Dialog.Button label="Set Name" onPress={setUser}/>
      </Dialog.Container>
    </View>
  )
}

export default Page

const styles = StyleSheet.create({
 container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
 },
 group: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
 }
})

