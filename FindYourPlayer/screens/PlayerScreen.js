import React, { useEffect, useState } from 'react';
import { View, Text, Image, ScrollView, StyleSheet, Button } from 'react-native';
import { getPlayerProfile } from '../services/sportdbApi';

export default function PlayerScreen({ route, navigation }) {
  const { playerId } = route.params;
  const [player, setPlayer] = useState(null);

  useEffect(() => {
    (async () => {
      const profile = await getPlayerProfile(playerId);
      setPlayer(profile);
    })();
  }, [playerId]);

  if (!player) {
    return (
      <View style={styles.container}>
        <Text>Загрузка...</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Button title="Назад" onPress={() => navigation.goBack()} />
      <Image source={{ uri: player.imageUrl }} style={styles.photo} />
      <Text style={styles.name}>{player.name}</Text>
      <Text style={styles.details}>
        {player.position}, {player.club}, {player.nationality}
      </Text>
      <Text style={styles.description}>{player.description}</Text>
      <Text>Возраст: {player.age}</Text>
      <Text>Основная нога: {player.foot}</Text>
      <Text>Рыночная стоимость: {player.marketValue ? `€${player.marketValue}k` : 'нет данных'}</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, alignItems: 'center', padding: 16 },
  photo: { width: 150, height: 150, borderRadius: 75, marginBottom: 12 },
  name: { fontSize: 20, fontWeight: 'bold' },
  details: { fontSize: 14, color: 'gray', marginBottom: 8 },
  description: { marginVertical: 8, textAlign: 'center' },
});