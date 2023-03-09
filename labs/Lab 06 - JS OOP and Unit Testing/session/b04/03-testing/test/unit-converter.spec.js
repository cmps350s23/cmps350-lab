import UnitConverter from "../unit-converter.js";
import { expect } from "chai";

const unitConverter = new UnitConverter();

describe("UnitConverter", () => {
  describe("#kgToOunce", () => {
    it("converts kgs to ounces; 1kg = 35.274oz", () => {
      expect(unitConverter.kgToOunce(1)).to.be.equal(35.274);
    });
  });

  describe("#kgToPound", () => {
    it("converts kgs to pounds; 1kg = 35.274oz", () => {
      expect(unitConverter.kgToPound(1)).to.be.equal(2.2046);
    });
  });
});
