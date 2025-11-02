import { api } from '@/convex/_generated/api'
import { useQuery } from 'convex/react'
import { Link } from 'expo-router'
import React from 'react'
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

const Page = () => {
    const groups = useQuery(api.groups.get) || [];
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

