import { message } from "antd";
import { useEffect } from "react";
import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PATH } from "../config/path";
import { authService } from '../services/auth.service';
import { userService } from "../services/user.service";
import { clearToken, getUser, setToken, setUser } from "../utils/token";
const Context = createContext({})

export const AuthProvider = ({ children }) => {
    const navigate = useNavigate()
    const [user, _setUser] = useState(getUser)

    useEffect(() => {
        setUser(user || null)
    }, [user])

    const login = async (data) => {
        try {
            const res = await authService.login(data)
            if (res.data) {
                setToken(res.data)
                await getProfile()
            }
        } catch (err) {
            console.error(err);
            if (err?.response?.data?.message) {
                message.error(err.response.data.message)
            }
        }
    }

    const getProfile = async () => {
        const user = await userService.getProfile()
        _setUser(user.data)
        message.success('Đăng nhập tài khoản thành công')
        navigate(PATH.profile.index)
    }

    const logout = () => {
        clearToken()
        _setUser()
        message.success('Đăng xuất tài khoản thành công')
    }

    return (
        <Context.Provider value={{ user, login, logout, setUser: _setUser, getProfile }}>{children}</Context.Provider>
    )
}

export const useAuth = () => useContext(Context)