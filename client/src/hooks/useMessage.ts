import useSWR from "swr";
import { fetcher } from "../utils/service";

export const useMessage = (groupId: string) => {
  const { data, isLoading } = useSWR(`/api/message/${groupId}`, fetcher, {
    revalidateOnFocus: false,
  });

  if (data && data?.message) {
    return {
      isLoading,
      data: [],
    };
  } else {
    return {
      data: data as Message[],
      isLoading,
    };
  }
};
