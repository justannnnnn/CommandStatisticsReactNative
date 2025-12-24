const API_KEY = 'jSaJ7aOVzP3kyZR3C7EbvKFSaGGbbSJFItVYVWQ3';

export async function searchPlayers(query) {
  if (!query) return [];

  try {
    const response = await fetch(
      `https://api.sportdb.dev/api/transfermarkt/players/search/${encodeURIComponent(query)}`,
      {
        headers: {
          'X-API-Key': API_KEY,
        },
      }
    );

    const data = await response.json();

    // Возвращаем только нужные поля
    return data.results.map((player) => ({
      id: player.id,
      name: player.name,
      sport: 'Football', // API не возвращает вид спорта, можно зафиксировать
      photo: `https://api.sportdb.dev/api/transfermarkt/player/photo/${player.id}`, // можно построить ссылку на фото
      club: player.club?.name || '',
      position: player.position,
      age: player.age,
      nationalities: player.nationalities,
      marketValue: player.marketValue || null,
    }));
  } catch (error) {
    console.error('Ошибка поиска игроков:', error);
    return [];
  }
}

export async function getPlayerProfile(playerId) {
  if (!playerId) return null;

  try {
    const response = await fetch(
      `https://api.sportdb.dev/api/transfermarkt/players/${playerId}/profile`,
      {
        headers: {
          'X-API-Key': API_KEY,
        },
      }
    );

    const data = await response.json();

    // Возвращаем только нужные поля
    return {
      id: data.id,
      name: data.name,
      fullName: data.nameInHomeCountry,
      imageUrl: data.imageUrl,
      club: data.club?.name || '',
      position: data.position?.main || '',
      otherPositions: data.position?.other || [],
      age: data.age || null,
      nationality: data.citizenship?.join(', ') || '',
      marketValue: data.marketValue || null,
      foot: data.foot || '',
      socialMedia: data.socialMedia || [],
      description: data.description || '',
    };
  } catch (error) {
    console.error('Ошибка получения профиля игрока:', error);
    return null;
  }
}