import { createAsyncThunk } from "@reduxjs/toolkit";

import axios, { AxiosError } from 'axios';

import { BASE_URL } from "../utils/constants";

export const fetcProjecstByUser = createAsyncThunk('fetchProjectsByUser',
  async (userToken: string, thunkAPI) => {

  const config = {
    headers: {
      ['x-access-token']: userToken
    }
  }

  const response = await axios.get(`${BASE_URL}/project`, config)

  if(response.status === 200) {    
    return response.data['projects']
  }
  return null    
})

interface ICreateProject {
  projectName: string
  userToken: string
}

export const createNewProject = createAsyncThunk('createNewProject',
  async (createUser: ICreateProject, thunkAPI) => {

  const config = {
    headers: {
      ['x-access-token']: createUser.userToken
    }
  }

  const response = await axios.post(`${BASE_URL}/project/new`, {
     project: createUser.projectName
  }, config)

  if(response.status === 200) {        
    return response.data
  } else {
    return null    
  }
})