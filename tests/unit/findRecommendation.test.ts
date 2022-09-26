import * as recommendationFactory from "../factories/recommendationFactory";
import { recommendationService } from "../../src/services/recommendationsService";
import { recommendationRepository } from "../../src/repositories/recommendationRepository";

beforeEach(() => {
  jest.clearAllMocks();
});

describe("Test get recommendations", () => {
  it("test get recommendation in case of success", async () => {
    const expected = await recommendationFactory.createRecommendations();

    jest
      .spyOn(recommendationRepository, "findAll")
      .mockImplementationOnce((): any => {
        return expected;
      });

    const result = await recommendationService.get();

    expect(result).toBe(expected);
  });
});

describe("Test get top recommendations", () => {
  it("test get best recommendation in case of recommendation list return", async () => {
    const amount: number = 10;
    const expected = await recommendationFactory.getRecommendationByScore(
      amount,
      true
    );

    jest
      .spyOn(recommendationRepository, "getAmountByScore")
      .mockImplementationOnce((): any => {
        return expected;
      });

    const result = await recommendationService.getTop(amount);

    expect(result).toBe(expected);
  });

  it("test get best recommendation in case of empty list return", async () => {
    const amount: number = 10;
    const expected = await recommendationFactory.getRecommendationByScore(
      amount,
      false
    );

    jest
      .spyOn(recommendationRepository, "getAmountByScore")
      .mockImplementationOnce((): any => {
        return expected;
      });

    const result = await recommendationService.getTop(amount);

    expect(result).toBe(expected);
  });
});

describe("Test get random recommendations", () => {
  it("test get random recommendation in case of recommendation list return", async () => {
    const recommendations =
      await recommendationFactory.getRecommendationRandom();

    const expected = recommendations[0];

    jest
      .spyOn(recommendationRepository, "findAll")
      .mockImplementationOnce((): any => {
        return recommendations;
      });

    const result = await recommendationService.getRandom();

    expect(result).toBe(expected);
  });
});
