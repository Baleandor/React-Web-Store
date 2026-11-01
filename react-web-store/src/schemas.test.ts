import { describe, expect, it } from "vitest";
import { listingSchema, loginSchema, registerSchema } from "./schemas";

const firstError = (result: {
  success: boolean;
  error?: { issues: { message: string; path: PropertyKey[] }[] };
}) => result.error?.issues[0];

describe("loginSchema", () => {
  it("accepts a valid email and password", () => {
    expect(
      loginSchema.safeParse({ email: "boss@waaagh.com", password: "x" })
        .success,
    ).toBe(true);
  });

  it("rejects an invalid email", () => {
    const result = loginSchema.safeParse({ email: "nope", password: "x" });
    expect(firstError(result)?.message).toBe("You must provide a valid email!");
  });
});

describe("registerSchema", () => {
  const valid = {
    email: "boss@waaagh.com",
    displayName: "Gorbag",
    password: "secret1",
    confirmPassword: "secret1",
  };

  it("accepts matching passwords", () => {
    expect(registerSchema.safeParse(valid).success).toBe(true);
  });

  it("reports mismatched passwords on the confirm field", () => {
    const result = registerSchema.safeParse({
      ...valid,
      confirmPassword: "different",
    });
    expect(firstError(result)).toMatchObject({
      message: "Passwords must match!",
      path: ["confirmPassword"],
    });
  });

  it("trims the display name before checking its length", () => {
    const result = registerSchema.safeParse({
      ...valid,
      displayName: "  ab  ",
    });
    expect(firstError(result)?.path).toEqual(["displayName"]);
  });
});

describe("listingSchema", () => {
  const valid = {
    title: "Uge Choppa",
    price: 749.99,
    description: "Good for slashin' and choppin'.",
    imageurl: "https://example.com/choppa.png",
  };

  it("accepts a valid listing", () => {
    expect(listingSchema.safeParse(valid).success).toBe(true);
  });

  it.each([0, -5])("rejects a non-positive price (%d)", (price) => {
    const result = listingSchema.safeParse({ ...valid, price });
    expect(firstError(result)?.path).toEqual(["price"]);
  });

  it("rejects prices with more than 2 decimals", () => {
    const result = listingSchema.safeParse({ ...valid, price: 1.999 });
    expect(firstError(result)?.message).toBe(
      "Price can have at most 2 decimals!",
    );
  });

  it("rejects NaN from an empty number input", () => {
    const result = listingSchema.safeParse({ ...valid, price: NaN });
    expect(firstError(result)?.path).toEqual(["price"]);
  });

  it.each(["javascript:alert(1)", "ftp://example.com/a.png", "not a url"])(
    "rejects non-http image links (%s)",
    (imageurl) => {
      const result = listingSchema.safeParse({ ...valid, imageurl });
      expect(firstError(result)?.path).toEqual(["imageurl"]);
    },
  );
});
