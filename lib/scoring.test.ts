import { expect, test } from "vitest";
import { calculateAgariPoints, calculateBasicPoints } from "./scoring";

test("1翻30符の基本点は240", () => {
  expect(calculateBasicPoints(1, 30)).toBe(240);
});

test("2翻40符の基本点は640", () => {
  expect(calculateBasicPoints(2, 40)).toBe(640);
});

test("子ロン 1翻30符 0本場", () => {
  const result = calculateAgariPoints(1, 30, false, false, 0);

  expect(result.ronPayment).toBe(1000);
  expect(result.winnerGain).toBe(1000);
});

test("親ロン 3翻40符 1本場", () => {
  const result = calculateAgariPoints(3, 40, true, false, 1);

  expect(result.ronPayment).toBe(8000);
  expect(result.winnerGain).toBe(8000);
});

test("子ツモ 2翻30符 2本場", () => {
  const result = calculateAgariPoints(2, 30, false, true, 2);

  expect(result.tsumoFromChild).toBe(700);
  expect(result.tsumoFromParent).toBe(1200);
  expect(result.winnerGain).toBe(2600);
});

test("親ツモ 2翻30符 0本場", () => {
  const result = calculateAgariPoints(2, 30, true, true, 0);

  expect(result.tsumoFromChild).toBe(1000);
  expect(result.winnerGain).toBe(3000);
});
