import { faker } from "@faker-js/faker";

export async function createRecommendation() {
  const recommendation = {
    name: faker.lorem.words(2),
    youtubeLink: faker.internet.url(),
  };

  return recommendation;
}

export async function createRecommendations() {
  const expected = [];
  for (let i = 1; i < 11; i++) {
    expected.push({
      id: i,
      name: faker.lorem.word(3),
      youtubeLink: faker.internet.url(),
      score: getRandom(10),
    });
  }

  return expected;
}

export async function getRecommendationByScore(
  score: number,
  hasElements: boolean
) {
  const expected = hasElements
    ? [
        {
          id: 1,
          name: faker.lorem.word(3),
          youtubeLink: faker.internet.url(),
          score,
        },
      ]
    : [];

  return expected;
}

function getRandom(max: number) {
  return Math.floor(Math.random() * max + 1);
}
