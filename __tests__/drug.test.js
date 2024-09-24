import { Drug } from "../src/pharmacy";

describe("Drug", () => {
  describe("isExpired", () => {
    it("should return true when expiresIn is 0", () => {
      expect(new Drug("test", 0, 0).isExpired()).toEqual(true);
    });

    it("should return true when expiresIn is negative", () => {
      expect(new Drug("test", -1, 0).isExpired()).toEqual(true);
    });

    it("should return false when expiresIn is positive", () => {
      expect(new Drug("test", 1, 0).isExpired()).toEqual(false);
    });
  });

  describe("lowerExpiresInByOne", () => {
    it("should decrease expiresIn by 1", () => {
      const drug = new Drug("test", 1, 0);
      drug.lowerExpiresInByOne();
      expect(drug.expiresIn).toEqual(0);
    });
  });

  describe("lowerBenefit", () => {
    it("should decrease benefit by value", () => {
      const drug = new Drug("test", 1, 1);
      drug.lowerBenefit(1);
      expect(drug.benefit).toEqual(0);
    });

    it("should not decrease benefit below 0", () => {
      const drug = new Drug("test", 1, 0);
      drug.lowerBenefit(1);
      expect(drug.benefit).toEqual(0);
    });

    it("should decrease benefit by value but not below 0", () => {
      const drug = new Drug("test", 1, 1);
      drug.lowerBenefit(2);
      expect(drug.benefit).toEqual(0);
    });
  });

  describe("addBenefit", () => {
    it("should increase benefit by value", () => {
      const drug = new Drug("test", 1, 1);
      drug.addBenefit(1);
      expect(drug.benefit).toEqual(2);
    });

    it("should not increase benefit above 50", () => {
      const drug = new Drug("test", 1, 49);
      drug.addBenefit(2);
      expect(drug.benefit).toEqual(50);
    });

    it("should increase benefit by value but not above 50", () => {
      const drug = new Drug("test", 1, 49);
      drug.addBenefit(2);
      expect(drug.benefit).toEqual(50);
    });
  });

  describe("expiresInIsLessThanOrEqual", () => {
    it("should return true when expiresIn is less than day", () => {
      expect(new Drug("test", 1, 0).expiresInIsLessThanOrEqual(2)).toEqual(true);
    });

    it("should return true when expiresIn is equal to day", () => {
      expect(new Drug("test", 1, 0).expiresInIsLessThanOrEqual(1)).toEqual(true);
    });

    it("should return false when expiresIn is greater than day", () => {
      expect(new Drug("test", 2, 0).expiresInIsLessThanOrEqual(1)).toEqual(false);
    });
  });
});