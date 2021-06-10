import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

function NotesScreen() {
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