import axiosInstance from "./api";
import TokenService from "./token.service";
import { refreshToken } from "../actions/auth";
import axios from "axios";

const setup = (store) => {
  axios.interceptors.request.use(
    (config) => {
      const token = TokenService.getLocalAccessToken();
      //console.log("Tokennnn", token);
      if (token) {
        // config.headers["Authorization"] = 'Bearer ' + token;  // for Spring Boot back-end
        config.headers["x-access-token"] = token; // for Node.js Express back-end
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  const { dispatch } = store;
  axios.interceptors.response.use(
    (res) => {
      return res;
    },
    async (err) => {
      const originalConfig = err.config;

      //console.log("originalConfig", originalConfig);

      if (originalConfig.url !== "/auth/signin" && err.response) {
        // Access Token was expired
        if (err.response.status === 401 && !originalConfig._retry) {
          originalConfig._retry = true;

          try {
            const Reftoken = TokenService.getLocalRefreshToken();
            //console.log(Reftoken);
            await axios
              .post(
                "http://172.27.76.46:8000/refresh/",
                Reftoken,
                {
                  headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                  },
                }
                /* {
                refreshToken: TokenService.getLocalRefreshToken(),
              } */
              )
              .then((response) => {
                if (response.data) {
                  //console.log("Newww ACCESS ", response.data.access_token);
                  //console.log("Newww REFRESH ", response.data.refresh_token);

                  const access_token = response.data.access_token;
                  const refresh_token = response.data.refresh_token;

                  dispatch(refreshToken(access_token, refresh_token));
                  TokenService.updateLocalAccessToken(access_token);
                  TokenService.updateLocalRefreshToken(refresh_token);

                  /* localStorage.setItem("user", JSON.stringify(response.data)); */
                }
              });

            /* const { accessToken } = rs.data.access_token;

            console.log("AAAAA", accessToken);

            dispatch(refreshToken(accessToken));
            TokenService.updateLocalAccessToken(accessToken); */

            return axiosInstance(originalConfig);
          } catch (_error) {
            return Promise.reject(_error);
          }
        }
      }

      return Promise.reject(err);
    }
  );
};

export default setup;
