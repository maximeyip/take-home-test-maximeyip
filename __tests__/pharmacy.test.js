import { Drug, Pharmacy } from "../src/pharmacy";
import { Drugs } from "../src/constant";

describe("Pharmacy", () => {
  describe("Classic drug", () => {
    it("should decrease the benefit and expiresIn", () => {
      expect(new Pharmacy([new Drug("test", 2, 3)]).updateBenefitValue()).toEqual(
        [new Drug("test", 1, 2)],
      );
    });

    it("should not decrease the benefit below 0", () => {
      expect(new Pharmacy([new Drug("test", 2, 0)]).updateBenefitValue()).toEqual(
        [new Drug("test", 1, 0)],
      );
    });

    it("should decrease by 2 when drug is expired", () => {
      expect(new Pharmacy([new Drug("test", 0, 3)]).updateBenefitValue()).toEqual(
        [new Drug("test", -1, 1)],
      );
    });

    it("should not decrease the benefit below 0 when drug is expired", () => {
      expect(new Pharmacy([new Drug("test", 0, 1)]).updateBenefitValue()).toEqual(
        [new Drug("test", -1, 0)],
      );
    });
  });

  describe("Magic pill", () => {
    it("should not decrease the benefit nor the expiresIn", () => {
      expect(new Pharmacy([new Drug(Drugs.MAGIC_PILL, 1, 1)]).updateBenefitValue()).toEqual(
        [new Drug(Drugs.MAGIC_PILL, 1, 1)],
      );
    });
  });

  describe("Herbal tea", () => {
    it("should increase the benefit", () => {
      expect(new Pharmacy([new Drug(Drugs.HERBAL_TEA, 2, 3)]).updateBenefitValue()).toEqual(
        [new Drug(Drugs.HERBAL_TEA, 1, 4)],
      );
    });

    it("should not increase the benefit above 50", () => {
      expect(new Pharmacy([new Drug(Drugs.HERBAL_TEA, 2, 50)]).updateBenefitValue()).toEqual(
        [new Drug(Drugs.HERBAL_TEA, 1, 50)],
      );
    });

    it("should increase by 2 when drug is expired", () => {
      expect(new Pharmacy([new Drug(Drugs.HERBAL_TEA, 0, 3)]).updateBenefitValue()).toEqual(
        [new Drug(Drugs.HERBAL_TEA, -1, 5)],
      );
    });

    it("should not increase the benefit above 50 when drug is expired", () => {
      expect(new Pharmacy([new Drug(Drugs.HERBAL_TEA, 0, 49)]).updateBenefitValue()).toEqual(
        [new Drug(Drugs.HERBAL_TEA, -1, 50)],
      );
    });
  });

  describe("Fervex", () => {
    it("should increase the benefit by 1 when expiresIn is greater than 10", () => {
      expect(new Pharmacy([new Drug(Drugs.FERVEX, 11, 3)]).updateBenefitValue()).toEqual(
        [new Drug(Drugs.FERVEX, 10, 4)],
      );
    });

    it("should increase the benefit by 2 when expiresIn is less than or equal to 10", () => {
      expect(new Pharmacy([new Drug(Drugs.FERVEX, 10, 3)]).updateBenefitValue()).toEqual(
        [new Drug(Drugs.FERVEX, 9, 5)],
      );
    });

    it("should increase the benefit by 3 when expiresIn is less than or equal to 5", () => {
      expect(new Pharmacy([new Drug(Drugs.FERVEX, 5, 3)]).updateBenefitValue()).toEqual(
        [new Drug(Drugs.FERVEX, 4, 6)],
      );
    });

    it("should not increase the benefit above 50", () => {
      expect(new Pharmacy([new Drug(Drugs.FERVEX, 5, 49)]).updateBenefitValue()).toEqual(
        [new Drug(Drugs.FERVEX, 4, 50)],
      );
    });

    it("should set the benefit to 0 when drug is expired", () => {
      expect(new Pharmacy([new Drug(Drugs.FERVEX, 0, 10)]).updateBenefitValue()).toEqual(
        [new Drug(Drugs.FERVEX, -1, 0)],
      );
    });
  });

  describe("Dafalgan", () => {
    it("should decrease the benefit by 2", () => {
      expect(new Pharmacy([new Drug(Drugs.DAFALGGAN, 2, 3)]).updateBenefitValue()).toEqual(
        [new Drug(Drugs.DAFALGGAN, 1, 1)],
      );
    });

    it("should not decrease the benefit below 0", () => {
      expect(new Pharmacy([new Drug(Drugs.DAFALGGAN, 2, 0)]).updateBenefitValue()).toEqual(
        [new Drug(Drugs.DAFALGGAN, 1, 0)],
      );
    });

    it("should decrease by 4 when drug is expired", () => {
      expect(new Pharmacy([new Drug(Drugs.DAFALGGAN, 0, 4)]).updateBenefitValue()).toEqual(
        [new Drug(Drugs.DAFALGGAN, -1, 0)],
      );
    });
  });
});
