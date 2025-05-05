import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserInfo {
  name: string;
  email: string;
}

const initialState: UserInfo = {
  name: "",
  email: "",
};

const userInfo = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, actions: PayloadAction<UserInfo>) => {
      state.name = actions.payload.name;
      state.email = actions.payload.email;
    },
    // setPhysicsQuizz : (state,actions : PayloadAction<UserInfo>)=>{

    // }
  },
});

export const { setUser } = userInfo.actions;

export default userInfo.reducer;
