import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { supabaseClient } from "../supabase/client";
import { useAppSelector } from "../store/hooks";
import type { Listing } from "../types";

/** Offers and wishlist items live as arrays on the Supabase user's metadata. */
export type UserListKey = "offers" | "wishlist";

const userQueryKey = (userId: string | undefined) => ["user", userId];

async function fetchUser() {
  const { data, error } = await supabaseClient.auth.getUser();
  if (error) throw error;
  return data.user;
}

const readList = (
  user: Awaited<ReturnType<typeof fetchUser>>,
  key: UserListKey,
) => (user.user_metadata?.[key] ?? []) as Listing[];

export function useUserList(key: UserListKey) {
  const userId = useAppSelector((state) => state.auth.user?.id);

  return useQuery({
    queryKey: userQueryKey(userId),
    queryFn: fetchUser,
    enabled: Boolean(userId),
    select: (user) => readList(user, key),
  });
}

export function useUpdateUserList(key: UserListKey) {
  const queryClient = useQueryClient();
  const userId = useAppSelector((state) => state.auth.user?.id);

  return useMutation({
    // Re-read the latest metadata before writing so concurrent tabs don't clobber each other.
    mutationFn: async (update: (items: Listing[]) => Listing[]) => {
      const user = await fetchUser();
      const { data, error } = await supabaseClient.auth.updateUser({
        data: { ...user.user_metadata, [key]: update(readList(user, key)) },
      });
      if (error) throw error;
      return data.user;
    },
    onSuccess: (user) => queryClient.setQueryData(userQueryKey(userId), user),
  });
}
