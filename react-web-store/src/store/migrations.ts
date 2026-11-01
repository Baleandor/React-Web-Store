import type { MigrationManifest, PersistedState } from "redux-persist";

/** Current version of the persisted state shape. Bump it together with a new migration. */
export const PERSIST_VERSION = 2;

type PersistedCart = { cart?: { items?: unknown } };

export const migrations: MigrationManifest = {
  // v1 stores a product snapshot in each cart item; carts saved before that are dropped.
  1: (state) => ({ ...state, cart: { items: {} } }) as PersistedState,
  // v2 stores cart items as an ordered array instead of a record keyed by product id.
  2: (state) => {
    const items = (state as PersistedCart | undefined)?.cart?.items;
    return {
      ...state,
      cart: {
        items: Array.isArray(items)
          ? items
          : Object.values((items ?? {}) as Record<string, unknown>),
      },
    } as PersistedState;
  },
};
