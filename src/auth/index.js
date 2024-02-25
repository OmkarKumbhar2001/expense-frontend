//check is User already logged in
export const isLoggedIn = ()=>{
    let data=localStorage.getItem("data")
    if(data!=null){
        return true;
    }else{
        return false;
    }
}

//do login set login set localstorage
export const doLogin = (data,next)=>{
    localStorage.setItem('data',JSON.stringify(data));
    next();
}


//do logout set logout
export const doLogout = (next)=>{
    localStorage.removeItem('data');
    next();
}

//get current user
export const getCurrentUser = ()=>{
    if(isLoggedIn()){
        return JSON.parse(localStorage.getItem('data'))?.user?.fullName;
    }else{
        return undefined;
    }
}

//get Toekn
export const getToken = ()=>{
    if(isLoggedIn()){
        return JSON.parse(localStorage.getItem('data'))?.accessToken;
    }else{
        return null;
    }

}