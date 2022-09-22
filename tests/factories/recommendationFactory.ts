import { faker } from "@faker-js/faker";

export async function createRecommendation() {
  const recommendation = {
    name: faker.lorem.words(2),
    youtubeLink: faker.internet.url(),
  };

  return recommendation;
}
