import { createSlice, current } from "@reduxjs/toolkit";

import { userInitialState } from "../../models/user.model";
import { createUser, fetchUserProfile, fetchUserSession, loginUser } from "../../services/user.service";

export const userSlice = createSlice({
  name: 'user',
  initialState: userInitialState,
  reducers: {
    logOut: (state) => {
      localStorage.removeItem('user')
      localStorage.removeItem('access_token')
      state.user = null
    },
    setUser: (state, action) => {
      localStorage.setItem('user', JSON.stringify(action.payload))         
      state.user = action.payload            
    },
    addProject:(state, action) => {
      if(state.user != null) {
        state.user.projects = action.payload
      }      
    },
    addSingleProject:(state, action) => {
      if(state.user != null) {
        state.user.projects = action.payload
      }      
    }
  },
  extraReducers: (build) => {
    /** pending */
    build.addCase(loginUser.pending, (state) => {            
      state.isLoading = true        
    })
    build.addCase(fetchUserProfile.pending, (state) => {            
      state.isLoading = true           
    })
    build.addCase(createUser.pending, (state) => {            
      state.isLoading = true        
    })
    /** fulfilled */
    build.addCase(fetchUserProfile.fulfilled, (state, action) => {
      state.isLoading = false     
      state.user = action.payload         
    })
    build.addCase(loginUser.fulfilled, (state) => {            
      state.isLoading = false    
    })
    /** rejected */
    build.addCase(createUser.rejected, (state) => {            
      state.isLoading = false        
    })
    build.addCase(fetchUserSession.rejected, (state) => {            
      state.isLoading = false        
    })
    build.addCase(fetchUserProfile.rejected, (state) => {            
      state.isLoading = false        
    })
  }
});

export const { logOut, setUser, addProject } = userSlice.actions

export default userSlice.reducer