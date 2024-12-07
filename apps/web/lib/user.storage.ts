import {User} from "@/types/user";


export const persistUserToLocalStorage = (user: User) => {
    localStorage.setItem('user', JSON.stringify(user));
};

export const loadUserFromLocalStorage = () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
};

export const deleteUserFromLocalStorage = () => {
    localStorage.removeItem('user');
};