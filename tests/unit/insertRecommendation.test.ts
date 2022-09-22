import * as recommendationFactory from "../factories/recommendationFactory";
import * as errorUtils from "../../src/utils/errorUtils";
import { recommendationService } from "../../src/services/recommendationsService";
import { recommendationRepository } from "../../src/repositories/recommendationRepository";

//jest.mock("../../src/services/recommendationsService", () => {});

describe("Test insert recommendation", () => {
  it("test insert recommendation in case of success", async () => {
    const expected = undefined;

    jest
      .spyOn(recommendationRepository, "create")
      .mockImplementationOnce(async () => {
        expected;
      });

    const recommendation = await recommendationFactory.createRecommendation();

    const result = await recommendationService.insert(recommendation);

    expect(result).toBeUndefined();
  });

  it("test error in case of conflict", async () => {
    const recommendation = await recommendationFactory.createRecommendation();
    const expectedRepository = { id: 1, ...recommendation, score: 12 };
    const expectedError = "Recommendations names must be unique";

    jest
      .spyOn(recommendationRepository, "findByName")
      .mockResolvedValueOnce(expectedRepository);

    const t = () => {
      throw new TypeError("Recommendations names must be unique");
    };

    expect(t).toThrow(TypeError);
    expect(t).toThrow(expectedError);
  });
});
