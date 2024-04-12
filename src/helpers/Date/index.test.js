import { getMonth } from "./index";

/**
 test unitaire getMonth 
 */

describe("Date helper", () => {
  describe("When getMonth is called", () => {
    it("the function return janvier for 2022-01-01 as date", () => {
      const date = new Date("2022-01-01T00:00:00"); // Définir le temps à 00:00:00 pour éviter les variations dues au décalage horaire
      expect(getMonth(date)).toBe("janvier");
    });
    it("the function return avril for 2022-04-21 as date", () => {
      const date = new Date("2022-04-21T00:00:00"); // Définir le temps à 00:00:00 pour éviter les variations dues au décalage horaire
      expect(getMonth(date)).toBe("avril");
    });
    it("the function return juillet for 2022-07-05 as date", () => {
      const date = new Date("2022-07-05T00:00:00"); // Définir le temps à 00:00:00 pour éviter les variations dues au décalage horaire
      expect(getMonth(date)).toBe("juillet");
    });
  });
});
