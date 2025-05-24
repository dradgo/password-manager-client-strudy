export const setToken = (token: string) => {
    localStorage.setItem("token", token);
};

export const getToken = (): string | null => localStorage.getItem("token");

export const removeToken = () => {
    localStorage.removeItem("token");
};

export const isLoggedIn = (): boolean => !!getToken();
