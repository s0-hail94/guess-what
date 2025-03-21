import React, { useState } from "react";
import { View, Text, TextInput, Button, Alert, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const hiddenWord = "جمشید";
const maxAttempts = 5;
const hintText = "یه ربطی به شاهنامه داره";

const getColor = (char, index, hidden, guessed) => {
  if (char === hidden[index]) return "green";
  else if (hidden.includes(char)) return "gold";
  else return "red";
};

export default function App() {
  const [guess, setGuess] = useState("");
  const [history, setHistory] = useState([]);

  const handleSubmit = () => {
    if (guess.length !== hiddenWord.length) {
      Alert.alert("Each guess must be 5 letters long.");
      return;
    }

    const formattedGuess = guess.toUpperCase();
    const result = formattedGuess.split("").map((char, idx) => ({
      char,
      color: getColor(char, idx, hiddenWord, formattedGuess),
    }));

    const newHistory = [...history, result];
    setHistory(newHistory);
    setGuess("");

    if (formattedGuess === hiddenWord) {
      Alert.alert("نبردی، من خواستم که ببری خوشحال بشی. :))");
    } else if (newHistory.length >= maxAttempts) {
      Alert.alert("باختی. قهوه بعد از تعطیلات.");
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, padding: 20, justifyContent: "center" }}>
      <Text style={{ fontSize: 24, fontWeight: "bold", textAlign: "center" }}>
        کلمه چیه؟
      </Text>
      {history.length >= 3 && history.length < maxAttempts && (
        <Text style={{ color: "#555", textAlign: "center", marginTop: 10 }}>
          راهنمایی: {hintText}
        </Text>
      )}

      <FlatList
        data={history}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={{ flexDirection: "row", justifyContent: "center", marginTop: 10 }}>
            {item.map((letter, idx) => (
              <View
                key={idx}
                style={{
                  backgroundColor: letter.color,
                  padding: 10,
                  margin: 2,
                  borderRadius: 5,
                  minWidth: 40,
                  alignItems: "center",
                }}
              >
                <Text style={{ color: "white", fontWeight: "bold" }}>{letter.char}</Text>
              </View>
            ))}
          </View>
        )}
      />

      {history.length < maxAttempts && (
        <View style={{ marginTop: 20 }}>
          <TextInput
            style={{
              borderWidth: 1,
              borderColor: "#ccc",
              padding: 10,
              marginBottom: 10,
              textAlign: "center",
              fontSize: 18,
            }}
            maxLength={5}
            value={guess}
            onChangeText={setGuess}
            autoCapitalize="characters"
            placeholder="کلمه ۵ حرفی"
          />
          <Button title="حدست رو بگو" onPress={handleSubmit} />
        </View>
      )}
    </SafeAreaView>
  );
}

