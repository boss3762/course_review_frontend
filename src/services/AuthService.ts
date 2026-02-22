import { baseUrl } from "../config/const";

export async function loginUser(username: string, password: string): Promise<any|null> {
    const res = await fetch(baseUrl + '/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({username:username, password:password}),
        })
    const result = await res.json()
    if(result.accessToken){
        localStorage.accessToken = result.accessToken;
        localStorage.username = result.username;
        return result;
    }else{
        return null;
    }
}

function isUserLoggedIn():boolean{
    return localStorage.accessToken !== null;
}

function getUserName():string|null{
    return localStorage.username;
}

function logout(){
    if (isUserLoggedIn()){
        localStorage.removeItem("accessToken");
        localStorage.removeItem("username");
    }
}

export default {loginUser, isUserLoggedIn, getUserName, logout};