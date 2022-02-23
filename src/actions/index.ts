

export const signIn = (userId:number|string):Object=>{
    return {
        type:'SIGN_IN',
        payload: userId
    }
}

export const signOut = ():Object=>{
    return {
        type:'SIGN_OUT'
    }
}