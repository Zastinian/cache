import { describe, it, expect, beforeEach } from "bun:test";
import Cache from "../package/src/index";

describe("Cache", () => {
  let cache: Cache<string, number>;

  beforeEach(() => {
    cache = new Cache<string, number>();
    cache.set("one", 1).set("two", 2).set("three", 3);
  });

  it("should return the correct size", () => {
    expect(cache.size).toBe(3);
  });

  it("should map values correctly", () => {
    const doubled = cache.map((val) => val * 2);
    expect(doubled).toEqual([2, 4, 6]);
  });

  it("should map values and exclude undefined", () => {
    const even = cache.mapVal((val) => (val % 2 === 0 ? val : undefined));
    expect(even).toEqual([2]);
  });

  it("should return the first value", () => {
    expect(cache.first()).toBe(1);
  });

  it("should find a value based on a predicate", () => {
    const found = cache.find((val) => val > 1);
    expect(found).toBe(2);
  });

  it("should filter entries based on a predicate", () => {
    const filtered = cache.filter((val) => val > 1);
    expect(filtered.array()).toEqual([2, 3]);
  });

  it("should filter entries based on a key predicate", () => {
    const filtered = cache.filterKey((key) => key === "one");
    expect(filtered.array()).toEqual([1]);
  });

  it("should return the last value", () => {
    expect(cache.last()).toBe(3);
  });

  it("should return the last key", () => {
    expect(cache.lastKey()).toBe("three");
  });

  it("should execute a function and return the cache instance", () => {
    const tappedCache = cache.tap((map) => map.set("four", 4));
    expect(tappedCache.get("four")).toBe(4);
  });

  it("should check if a key exists", () => {
    expect(cache.has("one")).toBe(true);
    expect(cache.has("four")).toBe(false);
  });

  it("should return an array of values", () => {
    expect(cache.array()).toEqual([1, 2, 3]);
  });

  it("should return an array of keys", () => {
    expect(cache.keyArray()).toEqual(["one", "two", "three"]);
  });

  it("should check if all provided keys exist", () => {
    expect(cache.hasAll("one", "two")).toBe(true);
    expect(cache.hasAll("one", "four")).toBe(false);
  });

  it("should check if any of the provided keys exist", () => {
    expect(cache.hasAny("one", "four")).toBe(true);
    expect(cache.hasAny("four", "five")).toBe(false);
  });

  it("should check if any entry satisfies the predicate", () => {
    expect(cache.some((val) => val > 2)).toBe(true);
    expect(cache.some((val) => val > 5)).toBe(false);
  });

  it("should return a random value", () => {
    const random = cache.random();
    expect([1, 2, 3]).toContain(random);
  });

  it("should remove a key and return true if it existed", () => {
    expect(cache.remove("one")).toBe(true);
    expect(cache.has("one")).toBe(false);
  });

  it("should remove entries based on a predicate", () => {
    cache.removeByValue((val) => val < 2);
    expect(cache.array()).toEqual([2, 3]);
  });

  it("should retrieve a value by key", () => {
    expect(cache.get("one")).toBe(1);
    expect(cache.get("four")).toBeUndefined();
  });

  it("should check if all entries satisfy the predicate", () => {
    expect(cache.every((val) => val > 0)).toBe(true);
    expect(cache.every((val) => val > 2)).toBe(false);
  });

  it("should iterate over each entry and execute a function", () => {
    let sum = 0;
    // biome-ignore lint/suspicious/noAssignInExpressions: <explanation>
    cache.each((val) => (sum += val));
    expect(sum).toBe(6);
  });

  it("should return a random key", () => {
    const randomKey = cache.randomKey();
    expect(["one", "two", "three"]).toContain(randomKey);
  });

  it("should check if another cache is equal", () => {
    const otherCache = new Cache<string, number>();
    otherCache.set("one", 1).set("two", 2).set("three", 3);
    expect(cache.equals(otherCache)).toBe(true);
    otherCache.set("four", 4);
    expect(cache.equals(otherCache)).toBe(false);
  });

  it("should find the difference between caches", () => {
    const otherCache = new Cache<string, number>();
    otherCache.set("two", 2).set("three", 3).set("four", 4);
    expect(cache.difference(otherCache)).toEqual(["four"]);
  });

  it("should find a key based on a predicate", () => {
    const keyFound = cache.findKey((val) => val > 2);
    expect(keyFound).toBe("three");
  });

  it("should sort the cache based on a comparison function", () => {
    cache.sort((a, b) => b - a); // Sort in descending order
    expect(cache.array()).toEqual([3, 2, 1]);
  });

  it("should clear all entries", () => {
    cache.clear();
    expect(cache.size).toBe(0);
  });

  it("should retrieve a value at a specific index", () => {
    expect(cache.at(0)).toBe(1);
    expect(cache.at(2)).toBe(3);
    expect(cache.at(3)).toBeUndefined();
  });

  it("should use the default comparison function", () => {
    expect(Cache.defaultCompareFunction(1, 2)).toBe(-1);
    expect(Cache.defaultCompareFunction(2, 2)).toBe(0);
    expect(Cache.defaultCompareFunction(3, 2)).toBe(1);
  });
});
