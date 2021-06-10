import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Entypo } from '@expo/vector-icons';

function NotesScreen({ navigation }) {

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => ( //round brackets short for return something
        <TouchableOpacity onPress = {console.log("Hello")}>
          <Entypo name = "new-message" size = {24} color = "black" /> 
        </TouchableOpacity>
    )
    });
  });

  return <View style = {styles.container}></View>;

}

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name = "Notes" component = {NotesScreen} options = {{
          headerTitle: "Notes App",
          headerTitleStyle: { //Can put these style options under styles too
            fontWeight: "bold",
            fontSize: 30,
          },
          headerStyle: styles.headerStyle,
        }}
          />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create( {
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  headerStyle: {
    backgroundColor: "lightyellow",
    alignItems: 'center',
    justifyContent: 'center',
  }
});