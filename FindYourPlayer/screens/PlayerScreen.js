import React, { useEffect, useState } from 'react';
import { View, Text, Image, ScrollView, StyleSheet, Button } from 'react-native';
import { getPlayerProfile } from '../services/sportdbApi';
import placeholder from '../assets/images/ic_person.png';

export default function PlayerScreen({ route, navigation }) {
  const { playerId } = route.params;
  const [player, setPlayer] = useState(null);
  const [imageError, setImageError] = useState(false);

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

      <Image
        source={
          !imageError && player.imageUrl
            ? { uri: player.imageUrl }
            : placeholder
        }
        style={styles.photo}
        onError={() => setImageError(true)}
      />

      {/* Имя */}
      <Text style={styles.name}>{player.name}</Text>

      {/* Список информации */}
      <View style={styles.infoBlock}>
        <View style={styles.infoItem}>
          <Text style={styles.bullet}>•</Text>
          <Text style={styles.infoText}>Позиция: {player.position}</Text>
        </View>

        <View style={styles.infoItem}>
          <Text style={styles.bullet}>•</Text>
          <Text style={styles.infoText}>Клуб: {player.club}</Text>
        </View>

        <View style={styles.infoItem}>
          <Text style={styles.bullet}>•</Text>
          <Text style={styles.infoText}>Гражданство: {player.nationality}</Text>
        </View>

        <View style={styles.infoItem}>
          <Text style={styles.bullet}>•</Text>
          <Text style={styles.infoText}>Основная нога: {player.foot}</Text>
        </View>

        <View style={styles.infoItem}>
          <Text style={styles.bullet}>•</Text>
          <Text style={styles.infoText}>
            Рыночная стоимость:{' '}
            {player.marketValue ? `€${player.marketValue}k` : 'нет данных'}
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    padding: 16,
  },

  photo: {
    width: 220,
    height: 220,
    borderRadius: 110,
    marginVertical: 16,
  },

  name: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 12,
    textAlign: 'center',
  },

  infoBlock: {
    width: '100%',
    marginBottom: 12,
  },

  infoItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 6,
  },

  bullet: {
    fontSize: 18,
    lineHeight: 22,
    marginRight: 8,
  },

  infoText: {
    fontSize: 16,
    flex: 1,
  },

  description: {
    marginTop: 12,
    fontSize: 14,
    color: 'gray',
    textAlign: 'center',
  },
});
