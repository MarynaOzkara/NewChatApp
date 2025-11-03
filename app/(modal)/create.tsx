import { api } from '@/convex/_generated/api'
import { useMutation } from 'convex/react'
import { useRouter } from 'expo-router'
import React, { useState } from 'react'
import { KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity } from 'react-native'

const Page = () => {
  const [name, setName] = useState('') 
  const [desc, setDesc] = useState('')  
  const [icon, setIcon] = useState('')
  const router = useRouter()
  const startGroup = useMutation(api.groups.create)
  const onCreateGroup = async () => {
    await startGroup({name, description: desc, icon_url: icon})
    router.back()
  }
  return (
    <KeyboardAvoidingView style={styles.container}>
      <Text style={styles.label}>Name</Text>
      <TextInput style={styles.textInput} value={name} onChangeText={setName}/>

      <Text style={styles.label}>Description</Text>
      <TextInput style={styles.textInput} value={desc} onChangeText={setDesc}/>

      <Text style={styles.label}>Icon</Text>
      <TextInput style={styles.textInput} value={icon} onChangeText={setIcon}/>

      <TouchableOpacity style={styles.button} onPress={onCreateGroup}>
        <Text style={styles.buttonText}>Create</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  )
}

export default Page

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  label: {
    marginVertical: 10,
    fontSize: 16,
    fontWeight: 'bold',
  },
  textInput: {
    minHeight: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: '#eea217',
    borderRadius: 5,
    padding: 15,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    alignItems: 'center',
  }
})

