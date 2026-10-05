import { describe, expect, it } from "vitest";
import type { Ingredient } from "@/types";
import {
  formatAmount,
  formatMinutes,
  formatPrice,
  ingredientQuantity,
  recipeImage,
} from "./recipe";
import { normalizeQuery } from "./query";

describe("normalizeQuery", () => {
  it("trims, lowercases and collapses whitespace", () => {
    expect(normalizeQuery("  Chicken   CURRY ")).toBe("chicken curry");
  });
});

describe("formatAmount", () => {
  it.each([
    [1, "1"],
    [0.5, "½"],
    [1.5, "1 ½"],
    [0.333, "⅓"],
    [2.666, "2 ⅔"],
    [0.97, "1"],
    [1.45, "1.5"],
    [425.24, "425"],
    [0, ""],
  ])("%d -> %s", (input, expected) => {
    expect(formatAmount(input)).toBe(expected);
  });
});

describe("ingredientQuantity", () => {
  const ingredient: Ingredient = {
    id: 1,
    name: "black beans",
    amount: 15,
    unit: "ounce",
    measures: {
      us: { amount: 15, unitShort: "oz" },
      metric: { amount: 425.243, unitShort: "g" },
    },
  };

  it("uses the chosen unit system", () => {
    expect(ingredientQuantity(ingredient, "us")).toEqual({
      amount: "15",
      unit: "oz",
    });
    expect(ingredientQuantity(ingredient, "metric")).toEqual({
      amount: "425",
      unit: "g",
    });
  });

  it("scales amounts", () => {
    expect(ingredientQuantity(ingredient, "metric", 2).amount).toBe("850");
    expect(
      ingredientQuantity(
        { id: 2, name: "salt", amount: 1, unit: "tsp" },
        "us",
        0.5,
      ),
    ).toEqual({ amount: "½", unit: "tsp" });
  });
});

describe("recipeImage", () => {
  it("upgrades Spoonacular image sizes", () => {
    expect(
      recipeImage(
        "https://img.spoonacular.com/recipes/716627-312x231.jpg",
        "636x393",
      ),
    ).toBe("https://img.spoonacular.com/recipes/716627-636x393.jpg");
  });

  it("leaves other URLs alone", () => {
    const url = "https://images.unsplash.com/photo-1?w=800";
    expect(recipeImage(url)).toBe(url);
    expect(recipeImage(undefined)).toBeUndefined();
  });
});

describe("formatting", () => {
  it("formats minutes", () => {
    expect(formatMinutes(45)).toBe("45 min");
    expect(formatMinutes(60)).toBe("1 hr");
    expect(formatMinutes(75)).toBe("1 hr 15 min");
  });

  it("formats cents per serving", () => {
    expect(formatPrice(106.02)).toBe("$1.06");
    expect(formatPrice(undefined)).toBeUndefined();
  });
});
