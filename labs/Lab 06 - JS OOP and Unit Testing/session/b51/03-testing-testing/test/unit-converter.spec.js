import { expect } from "chai";
import UnitConverter from "../unit-converter.js";

const unitConverter = new UnitConverter();

describe("Unit Converter", () => {
  describe("#kgToOunce", () =>
    it("converts a quantity in kg to ounce", () => {
      const ounces = unitConverter.kgToOunce(1.0);
      expect(ounces).to.equal(35.274);
    }));

  describe("#meterToInch", () =>
    it("converts a length in m to inches", () => {
      const ounces = unitConverter.meterToInch(1.0);
      expect(ounces).to.equal(39.3701);
    }));
});
