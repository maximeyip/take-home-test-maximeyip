import { Drugs } from "./constant";

export class Drug {
  /**
   * @param {string} name
   * @param {number} expiresIn
   * @param {number} benefit
   */
  constructor(name, expiresIn, benefit) {
    this.name = name;
    this.expiresIn = expiresIn;
    this.benefit = benefit;
  }

  /**
   * @return {boolean}
   */
  isExpired() {
    return this.expiresIn <= 0;
  }

  lowerExpiresInByOne() {
    this.expiresIn -= 1;
  }

  /**
   * @param {number} value
   */
  lowerBenefit(value) {
    this.benefit = this.benefit - value >= 0 ? this.benefit - value : 0;
  }

  /**
   * @param {number} value
   */
  addBenefit(value) {
    this.benefit = this.benefit + value <= 50 ? this.benefit + value : 50;
  }

  /**
   * @param {number} value
   */
  setBenefit(value) {
    this.benefit = value < 0 ? 0 : value;
  }

  /**
   * @param {number} value
   * @return {boolean}
   */
  expiresInIsLessThanOrEqual(value) {
    return this.expiresIn <= value;
  }
}

export class Pharmacy {
  /**
   * @param {Drug[]} drugs
   */
  constructor(drugs = []) {
    this.drugs = drugs;
  }

  updateBenefitValue() {
    this.drugs.forEach((drug) => {
      if (drug.name === Drugs.MAGIC_PILL) {
        return;
      }

      if (![Drugs.HERBAL_TEA, Drugs.FERVEX].includes(drug.name)) {
        let valueToLower = drug.name === Drugs.DAFALGGAN ? 2 : 1;
        valueToLower = drug.isExpired() ? valueToLower * 2 : valueToLower;
        drug.lowerBenefit(valueToLower);
      }

      if (drug.name === Drugs.HERBAL_TEA) {
        const valueToAdd = drug.isExpired() ? 2 : 1;
        drug.addBenefit(valueToAdd);
      }

      if (drug.name === Drugs.FERVEX) {
        if (drug.isExpired()) {
          drug.setBenefit(0);
        } else if (drug.expiresInIsLessThanOrEqual(5)) {
          drug.addBenefit(3);
        } else if (drug.expiresInIsLessThanOrEqual(10)) {
          drug.addBenefit(2);
        } else {
          drug.addBenefit(1);
        }
      }

      drug.lowerExpiresInByOne();
    });

    return this.drugs;
  }
}
