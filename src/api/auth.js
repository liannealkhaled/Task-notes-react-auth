import instance from ".";
import jwt_decode from "jwt-decode";

const login = async (userInfo) => {
  const { data } = await instance.post("/auth/login", userInfo);
  storeToken(data?.token);
  return data;
};

const register = async (userInfo) => {
  const formData = new FormData();
  for (const key in userInfo) formData.append(key, userInfo[key]);

  const { data } = await instance.post("/auth/register", formData);
  storeToken(data?.token);
  return data;
};

const me = async () => {
  const { data } = await instance.get("/auth/me");
  return data;
};

const getAllUsers = async () => {
  const { data } = await instance.get("/auth/users");
  return data;
};

const storeToken = (token) => {
  localStorage.setItem("token", token);
};

const checktoken = () => {
  const token = localStorage.getItem("token");
  if (token) {
    const decode = jwt_decode(token);
    const currentTime = Date.now() / 1000;
    if (decode.exp < currentTime) {
      localStorage.removeItem("token");
      return false;
    } else return true;
  }
  return false;
};

const logout = () => {
  localStorage.removeItem("token");
};

export { login, register, me, getAllUsers, storeToken, checktoken, logout };
