const cookieConfig = () => {
    return { 
        httpOnly: true,
    secure: process.env.NODE_ENV !== 'production',
    maxAge: 60 *60,
    sameSite: "strict",
    path: "/",
    }
};


export default cookieConfig