import { useDispatch, useSelector } from "react-redux";
import { appApi } from "../api";
import { onChecking, onLogin, onLogout } from "../store";
import { useNavigate } from "react-router-dom";

export const useAuthStore = () => {
    const { status, user, errorMessage } = useSelector(state => state.auth);
    
    const dispatch = useDispatch();

    const startLogin = async({ email, password }) => {
        dispatch(onChecking());
        try {
            const { data } = await appApi.post('/login/', { email, password });
            localStorage.setItem('access_token', data.access);
            localStorage.setItem('refresh_token', data.refresh);
            dispatch(onLogin(data.user));
        } catch (error) {
            dispatch(onLogout(error.response.data.error));
        }   
    };

    const startRegister = async({ username, email, first_name, last_name, password, phone, gender }) => {
        dispatch(onChecking());
        try {
            const { data } = await appApi.post('/register/', { username, email, first_name, last_name, password, phone, gender });
            localStorage.removeItem('access_token');
            localStorage.removeItem('refresh_token');
            dispatch(onLogout());
            return true
        } catch (error) {
            const errorMessage = error.response.data?.email?.[0] || error.response.data?.username?.[0] || 'Registration error';
            dispatch(onLogout(errorMessage));
            return false
        }   
    };

    const checkoutToken = async() => {
        const refreshToken = localStorage.getItem('refresh_token');
        if (!refreshToken) return dispatch(onLogout());
        try {
            const { data } = await appApi.post('/token/refresh/', { refresh: refreshToken });
            localStorage.setItem('access_token', data.access);
            dispatch(onLogin(data.user));
        } catch (error) {
            localStorage.clear();
            dispatch(onLogout());
        }
    };

    const startLogout = async() => {
        localStorage.clear();
        dispatch(onLogout());
    };

    return {
        status,
        user,
        errorMessage,
        checkoutToken,
        startLogin,
        startRegister,
        startLogout
    };
};