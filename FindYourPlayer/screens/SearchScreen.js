import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { searchPlayers } from '../services/sportdbApi';

export default function SearchScreen({ navigation }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [timer, setTimer] = useState(null);

  useEffect(() => {
    if (timer) clearTimeout(timer);

    const newTimer = setTimeout(async () => {
      if (query.length > 0) {
        const players = await searchPlayers(query);
        setResults(players);
      } else {
        setResults([]);
      }
    }, 3000); // debounce 3 сек

    setTimer(newTimer);

    return () => clearTimeout(newTimer);
  }, [query]);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.item}
      onPress={() => navigation.navigate('Player', { playerId: item.id })}
    >
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.club}>{item.club}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Введите имя игрока"
        value={query}
        onChangeText={setQuery}
        style={styles.input}
      />
      <Text style={styles.header}>Найдены по запросу</Text>
      <FlatList
        data={results}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 8,
    marginBottom: 16,
  },
  header: { fontSize: 16, fontWeight: 'bold', marginBottom: 8 },
  item: { paddingVertical: 8, borderBottomWidth: 1, borderBottomColor: '#eee' },
  name: { fontSize: 16, fontWeight: 'bold' },
  club: { fontSize: 14, color: 'gray' },
});
