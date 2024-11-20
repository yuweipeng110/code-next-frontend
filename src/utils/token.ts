import { DEFAULT_USER } from "@/constants/user";

const loginUserInfoStorageKey = 'loginUserInfo';

export const loginUserInfoStorage = {
    saveUserInfo(info: string) {
        localStorage.setItem(loginUserInfoStorageKey, info);
    },
    getUserInfo() {
        const info = localStorage.getItem(loginUserInfoStorageKey);
        return info !== null ? info : JSON.stringify(DEFAULT_USER);
    },
    removeUserInfo() {
        localStorage.removeItem(loginUserInfoStorageKey);
    }
}