import { Dispatch } from "redux";
import * as UserApi from "../../api/UserApi";

export async function login(dispatch: Dispatch, params: UserApi.LoginParams) {
    const user = await UserApi.login(params);
    dispatch({ type: 'LOGIN', payload: user });
}

export async function logout(dispatch: Dispatch) {
    const user = await UserApi.logout();
    dispatch({ type: 'LOGOUT' });
}

export async function signup(dispatch: Dispatch, params: UserApi.SignUpParams) {
    const user = await UserApi.signup(params);
    dispatch({ type: 'SIGNUP', payload: user });
}