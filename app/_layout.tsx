
import Ionicon from '@expo/vector-icons/Ionicons';
import { ConvexProvider, ConvexReactClient } from 'convex/react';
import { Link, Stack } from 'expo-router';
import { TouchableOpacity } from 'react-native';





const convex = new ConvexReactClient(process.env.EXPO_PUBLIC_CONVEX_URL!, 
  {unsavedChangesWarning: false});

export default function RootLayoutNav() {
  

  return (
    <ConvexProvider client={convex}>
      <Stack screenOptions={{
        headerStyle: {
          backgroundColor: "#eea217"
        },
        headerTintColor: "#fff"
      }}>
        <Stack.Screen name="index" options={{ 
          headerTitle: 'My Chats',
          headerRight: () => (
            <Link href="/(modal)/create" asChild>
              <TouchableOpacity>
                <Ionicon name="add" size={24} color="white" />
              </TouchableOpacity>
            </Link>
          )
           }} />
        <Stack.Screen name="(modal)/create" options={{ 
          headerTitle: 'Start a Chat',
          presentation: 'modal',
          headerRight: () => (
            <Link href="/" asChild>
              <TouchableOpacity>
                <Ionicon name="add" size={24} color="white" />
              </TouchableOpacity>
            </Link>
          )
           }} />
        <Stack.Screen name="(chat)/[chatid]" options={{ 
          headerTitle: ''
           }} />       
        
      </Stack>
    </ConvexProvider>
      
   
  );
}
