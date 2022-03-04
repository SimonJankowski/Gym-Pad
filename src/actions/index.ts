

export const signIn = (userId:number|string, stats:any):Object=>{
    return {
        type:'SIGN_IN',
        payload: {
            userId:userId,
            stats:stats
        }
    }
}

export const signOut = ():Object=>{
    return {
        type:'SIGN_OUT'
    }
}
