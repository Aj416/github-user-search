import { useState, useEffect, createContext, useContext } from "react";
import reducer from "./reducer";
import mockUser from "./mockData.js/mockUser";
import mockRepos from "./mockData.js/mockRepos";
import mockFollowers from "./mockData.js/mockFollowers";
import axios from "axios";
import {
  SET_LOADING,
  SET_ERROR,
  SET_FOLLOWERS,
  SET_REPOS,
  SET_GITHUB_USER,
  SET_REQUEST_LIMIT,
} from "../action";
import { useReducer } from "react";

const rootUrl = "https://api.github.com";

const initialState = {
  repos: mockRepos,
  followers: mockFollowers,
  user: mockUser,
  requestLimit: 0,
  error: { show: false, msg: "" },
  loading: false,
};

const GitHubContext = createContext();

const GitHubProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const fetchRateLimit = async () => {
    const url = `${rootUrl}/rate_limit`;

    await axios(url)
      .then(({ data: { rate } }) =>
        dispatch({ type: SET_REQUEST_LIMIT, payload: rate.remaining })
      )
      .catch((err) => console.log(err));
  };

  const fetchGithubUser = async (user) => {
    dispatch({ type: SET_LOADING, payload: true });
    const url = `${rootUrl}/users/${user}`;
    const response = await axios(url).catch((err) => console.log(err));

    if (response) {
      dispatch({ type: SET_GITHUB_USER, payload: response.data });
      const { followers_url, repos_url } = response.data;
      fetchFollowers(followers_url);
      fetchRepos(repos_url);
    } else {
      dispatch({
        type: SET_ERROR,
        payload: { show: true, msg: "user not found" },
      });
    }
    fetchRateLimit();
    dispatch({ type: SET_LOADING, payload: false });
  };

  const fetchFollowers = async (url) => {
    await axios(`${url}?per_page=100`)
      .then((response) =>
        dispatch({ type: SET_FOLLOWERS, payload: response.data })
      )
      .catch((err) => console.log(err));
  };

  const fetchRepos = async (url) => {
    await axios(`${url}?per_page=100`)
      .then((response) => dispatch({ type: SET_REPOS, payload: response.data }))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchRateLimit();
  }, []);

  return (
    <GitHubContext.Provider value={{ ...state, fetchGithubUser }}>
      {children}
    </GitHubContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(GitHubContext);
};

export { GitHubContext, GitHubProvider };
