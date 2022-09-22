import * as recommendationFactory from "../factories/recommendationFactory";
import { recommendationService } from "../../src/services/recommendationsService";
import { recommendationRepository } from "../../src/repositories/recommendationRepository";

//jest.mock("../../src/services/recommendationsService", () => {});

describe("Test insert recommendation", () => {
  it("test insert recommendation in case of success", async () => {
    jest
      .spyOn(recommendationRepository, "create")
      .mockImplementationOnce(async () => {});

    const recommendation = await recommendationFactory.createRecommendation();

    const result = await recommendationService.insert(recommendation);

    //primeiro passo insere
    //segndo compara com o crpo que retornou

    expect(result).toBeUndefined();
  });
});
