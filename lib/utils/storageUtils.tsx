/*
    local data storage utils
*/

export const saveUser = (user: object) => {
  localStorage.setItem("user", JSON.stringify(user));
};

export const getUserToken = () => {
  return JSON.parse(localStorage.getItem("user") as string).token;
};

export const removeUser = ()=>{
  localStorage.removeItem("user");
}