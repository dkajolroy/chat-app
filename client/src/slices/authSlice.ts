import { createSlice } from "@reduxjs/toolkit";

interface Init {
  user: User | null;
  isLoading: boolean;
}
const initialState: Init = {
  user: null,
  isLoading: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    addUser: (state, { payload }: { payload: User }) => {
      state.user = payload;
    },
    removeUser: (state) => {
      state.user = null;
    },
  },
});

export default authSlice.reducer;
export const { addUser, removeUser } = authSlice.actions;
