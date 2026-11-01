import { createMigrate, type PersistedState } from "redux-persist";
import { describe, expect, it } from "vitest";
import { migrations, PERSIST_VERSION } from "./migrations";

const migrate = createMigrate(migrations);

const persisted = (version: number, cart: unknown) =>
  ({ _persist: { version, rehydrated: false }, cart }) as PersistedState;

describe("persisted state migrations", () => {
  it("converts a v1 record-based cart into an array, keeping the items", async () => {
    const item = {
      id: 5,
      title: "Shirt",
      price: 4,
      image: "c.png",
      quantity: 2,
    };
    const result = await migrate(
      persisted(1, { items: { 5: item } }),
      PERSIST_VERSION,
    );
    expect(result).toMatchObject({ cart: { items: [item] } });
  });

  it("drops carts saved before v1, ending with an empty array", async () => {
    const result = await migrate(
      persisted(-1, { items: { 1: { id: 1, quantity: 3 } } }),
      PERSIST_VERSION,
    );
    expect(result).toMatchObject({ cart: { items: [] } });
  });

  it("leaves an already-migrated array cart untouched", async () => {
    const items = [
      { id: 1, title: "A", price: 1, image: "a.png", quantity: 1 },
    ];
    const result = await migrate(
      persisted(PERSIST_VERSION, { items }),
      PERSIST_VERSION,
    );
    expect(result).toMatchObject({ cart: { items } });
  });
});
