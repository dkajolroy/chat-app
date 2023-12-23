import { useDispatch } from "react-redux";
import useSWR from "swr";
import { removeUser } from "../slices/authSlice";
import { fetcher } from "../utils/service";

export const useGroup = () => {
  const { data, isLoading } = useSWR("/api/group", fetcher, {
    revalidateOnFocus: false,
  });

  const dispatch = useDispatch();
  if (data && data?.message) {
    dispatch(removeUser());
    return {
      data: [],
      isLoading,
    };
  } else {
    return {
      data: data as Group[],
      isLoading,
    };
  }
};
