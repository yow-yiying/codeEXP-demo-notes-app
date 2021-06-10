import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList } from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Entypo } from '@expo/vector-icons';
import * as SQLite from "expo-sqlite";

const db =  SQLite.openDatabase("notes.db");
const SAMPLE_NOTES = [
  {title: "Walk the cat", id: "0", done: false },
  {title: "Walk the dog", id: "1", done: false },
  {title: "water the cat", id: "2", done: false },
  {title: "water the plant", id: "3", done: false },
];

function NotesScreen({ navigation }) {
  const [notes, setNotes] = useState(SAMPLE_NOTES);
  
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={console.log("Hello")}>
          <Entypo
            style={{ marginRight: 10 }}
            name="new-message"
            size={24}
            color="black"
          />
        </TouchableOpacity>
      ),
    });
  });

  function renderItem({ item }) {
    return (
      <View style={styles.listItem}>
        <Text>{item.title}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList style={styles.list} data={notes} renderItem={renderItem} />
    </View>
  );
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
  },

  list: {
    width: "100%",
  },

  listItem: {
    height: 40,
    justifyContent:"center",
    borderBottomWidth: 1,
    borderBottomColor: "#999",
    paddingLeft: 10,
  },
});