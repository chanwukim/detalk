import { describe, it, expect } from "vitest";

import { isEqual, isObject } from "./is";

describe("isEqual", () => {
  it("기본 타입을 올바르게 비교해야 한다", () => {
    expect(isEqual(1, 1)).toBe(true);
    expect(isEqual(1, 2)).toBe(false);
    expect(isEqual("a", "a")).toBe(true);
    expect(isEqual("a", "b")).toBe(false);
    expect(isEqual(true, true)).toBe(true);
    expect(isEqual(true, false)).toBe(false);
    expect(isEqual(null, null)).toBe(true);
    expect(isEqual(undefined, undefined)).toBe(true);
    expect(isEqual(NaN, NaN)).toBe(true);
  });

  it("타입 불일치를 올바르게 처리해야 한다", () => {
    expect(isEqual(1, "1")).toBe(false);
    expect(isEqual(true, 1)).toBe(false);
    expect(isEqual(null, undefined)).toBe(false);
  });

  it("배열을 올바르게 비교해야 한다", () => {
    expect(isEqual([], [])).toBe(true);
    expect(isEqual([1, 2, 3], [1, 2, 3])).toBe(true);
    expect(isEqual([1, 2, 3], [1, 2, 4])).toBe(false);
    expect(isEqual([1, 2, 3], [1, 2, 3, 4])).toBe(false);
    expect(isEqual([1, [2, 3]], [1, [2, 3]])).toBe(true);
    expect(isEqual([1, [2, 3]], [1, [2, 4]])).toBe(false);
  });

  it("객체를 올바르게 비교해야 한다", () => {
    expect(isEqual({}, {})).toBe(true);
    expect(isEqual({ a: 1, b: 2 }, { a: 1, b: 2 })).toBe(true);
    expect(isEqual({ a: 1, b: 2 }, { b: 2, a: 1 })).toBe(true);
    expect(isEqual({ a: 1, b: 2 }, { a: 1, b: 3 })).toBe(false);
    expect(isEqual({ a: 1, b: 2 }, { a: 1, c: 2 })).toBe(false);
    expect(isEqual({ a: { b: 2 } }, { a: { b: 2 } })).toBe(true);
    expect(isEqual({ a: { b: 2 } }, { a: { b: 3 } })).toBe(false);
  });

  it("중첩 구조를 올바르게 처리해야 한다", () => {
    expect(isEqual({ a: [1, { b: 2 }] }, { a: [1, { b: 2 }] })).toBe(true);
    expect(isEqual({ a: [1, { b: 2 }] }, { a: [1, { b: 3 }] })).toBe(false);
    expect(isEqual([{ a: 1 }, [2, { b: 3 }]], [{ a: 1 }, [2, { b: 3 }]])).toBe(
      true,
    );
    expect(isEqual([{ a: 1 }, [2, { b: 3 }]], [{ a: 1 }, [2, { b: 4 }]])).toBe(
      false,
    );
  });

  it("Date 객체를 올바르게 비교해야 한다", () => {
    expect(isEqual(new Date("2023-01-01"), new Date("2023-01-01"))).toBe(true);
    expect(isEqual(new Date("2023-01-01"), new Date("2023-01-02"))).toBe(false);
  });

  it("RegExp 객체를 올바르게 비교해야 한다", () => {
    expect(isEqual(/abc/, /abc/)).toBe(true);
    expect(isEqual(/abc/, /def/)).toBe(false);
    expect(isEqual(/abc/g, /abc/g)).toBe(true);
    expect(isEqual(/abc/g, /abc/i)).toBe(false);
  });

  it("Set 객체를 올바르게 비교해야 한다", () => {
    expect(isEqual(new Set([1, 2, 3]), new Set([1, 2, 3]))).toBe(true);
    expect(isEqual(new Set([1, 2, 3]), new Set([1, 2, 4]))).toBe(false);
    expect(isEqual(new Set([1, 2, 3]), new Set([3, 2, 1]))).toBe(true);
  });

  it("Map 객체를 올바르게 비교해야 한다", () => {
    expect(
      isEqual(
        new Map([
          ["a", 1],
          ["b", 2],
        ]),
        new Map([
          ["a", 1],
          ["b", 2],
        ]),
      ),
    ).toBe(true);
    expect(
      isEqual(
        new Map([
          ["a", 1],
          ["b", 2],
        ]),
        new Map([
          ["a", 1],
          ["b", 3],
        ]),
      ),
    ).toBe(false);
    expect(
      isEqual(
        new Map([
          ["a", 1],
          ["b", 2],
        ]),
        new Map([
          ["b", 2],
          ["a", 1],
        ]),
      ),
    ).toBe(true);
  });
});

describe("isObject", () => {
  it("객체를 올바르게 판별해야 한다", () => {
    expect(isObject({})).toBe(true);
    expect(isObject(null)).toBe(false);
    expect(isObject(undefined)).toBe(false);
    expect(isObject(1)).toBe(false);
    expect(isObject("a")).toBe(false);
    expect(isObject(true)).toBe(false);
  });
});
