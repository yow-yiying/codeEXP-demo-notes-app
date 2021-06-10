import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList, Button, TextInput } from 'react-native';
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



function NotesScreen({ route, navigation }) {
  const [notes, setNotes] = useState(SAMPLE_NOTES);

  function refreshNotes() {
    db.transaction( tx => {
      tx.executeSql("SELECT * FROM notes", null, 
      (txObj, { rows: { _array }}) => setNotes(_array),
      (txObj, error) => console.log("Error ", error)
      );
    });
  }
  
  //Create the DB on first run
  //executes SQL code, if error -> null, if completed -> refreshNotes function
  useEffect(() => {
    db.transaction( tx => {
      tx.executeSql(`
      CREATE TABLE IF NOT EXISTS notes
      (id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT,
        done INT);
      `)
    }, null, refreshNotes);
  }, []);


  
  // Adds the + button in the top right
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={ () => navigation.navigate("Add")}>
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

  // Responds to coming back from the add screen
  useEffect(() => {
    if (route.params?.todoText) {
      // const newNote = {
      //   title: route.params.todoText,
      //   id: notes.length.toString(),
      //   done: false,
      // };
      // setNotes([...notes, newNote]);
     //? is javascript Optional
    db.transaction( tx => {
      tx.executeSql("INSERT INTO notes (done, title) VALUES (0, ?)", [
        route.params.todoText,
      ]);
  }, 
  null, refreshNotes
  );
  }
  }, [route.params?.todoText] //the {} function will only trigger when route.params.todoText changes
  );

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

function AddScreen({ navigation }) {
  const [todoText, setTodoText] = useState("");

  return (
    <View style = {styles.container}>
      <Text>Add your note</Text>
      <TextInput style = {styles.textInput} onChangeText = {(text) => setTodoText(text)}/>
      
      {/* use navigation.navigate() to pass in data to another screen (instead of goback function) */}
      {/* use useEffect to access the data passed */}
      <Button onPress= {() => navigation.navigate("Notes", { todoText })} title = "Submit" /> 
      <Button onPress = {() => navigation.goBack()} title = "Cancel" />

      <Text>{todoText}</Text>
    </View>
  )
}

const Stack = createStackNavigator();
const NotesStack = createStackNavigator();

function NotesStackScreen() {
  return (
    <NotesStack.Navigator >
          <NotesStack.Screen name = "Notes" component = {NotesScreen} options = {{
            headerTitle: "Notes App",
            headerTitleStyle: { //Can put these style options under styles too
              fontWeight: "bold",
              fontSize: 30,
            },
            headerStyle: styles.headerStyle,
          }}
            />
      </NotesStack.Navigator>
  )
}


export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator mode = "modal" headerMode = "none">
        <Stack.Screen name = "NotesStack" component = {NotesStackScreen} options = {{headerShown: false}}/>
        <Stack.Screen name = "Add" component={AddScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create( {
  container: {
    flex: 1,
    backgroundColor: 'pink',
    alignItems: 'center',
    justifyContent: 'center',
  },

  headerStyle: {
    backgroundColor: "lightblue",
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

  textInput: {
    borderColor: "black",
    padding: 10,
    backgroundColor:"white",
    margin: 10,
    width: "90%",
  }
});