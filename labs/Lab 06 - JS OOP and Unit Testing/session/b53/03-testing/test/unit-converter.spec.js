import UnitConverter from "../unit-converter.js";
import { expect } from "chai";

const unitConverter = new UnitConverter();

describe("Unit Converter", () => {
  describe("#kgToPound()", () => {
    it("converts kg to pound using 1 kg = 2.2046lb", () => {
      expect(unitConverter.kgToPound(1)).to.be.equal(2.2046);
    });
  });
});
