import * as recommendationFactory from "../factories/recommendationFactory";
import { recommendationService } from "../../src/services/recommendationsService";
import { recommendationRepository } from "../../src/repositories/recommendationRepository";

describe("Test insert recommendation", () => {
  it("test insert recommendation in case of success", async () => {
    jest
      .spyOn(recommendationRepository, "create")
      .mockImplementationOnce((): any => {});

    const recommendation = await recommendationFactory.createRecommendation();

    await recommendationService.insert(recommendation);

    expect(recommendationRepository.create).toBeCalled();
  });

  it("test error in case of conflict", async () => {
    const recommendation = await recommendationFactory.createRecommendation();
    const expectedRepository = { id: 1, ...recommendation, score: 12 };
    const expectedError = {
      type: "conflict",
      message: "Recommendations names must be unique" ?? "",
    };

    jest
      .spyOn(recommendationRepository, "findByName")
      .mockImplementationOnce((): any => {
        return expectedRepository;
      });

    const promise = recommendationService.insert(recommendation);

    expect(promise).rejects.toEqual(expectedError);
  });
});
