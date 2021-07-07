import type { NextApiRequest, NextApiResponse } from 'next'
import cookie from 'cookie'

type Data = {
  success: boolean;
}

const handler =  (req: NextApiRequest, res: NextApiResponse<Data>):void => {
    if (req.method === 'GET') { // here we are checking if the correct method is being used as in the nextjs docs
        res.setHeader( // in the code below we are setting the header to add an http only token to the cookies storage
            "Set-Cookie",
            cookie.serialize("token", "", {// we named the token and passed it and empty value
                httpOnly: true, // we are making the token to be http only token
                secure: process.env.NODE_ENV !== 'production', // here we are securing the token to only be accessed via https and not http, but we want to do this only on production
                expires: new Date(0), // here we are setting the time for the cookie to expire which 0sec like deleteing it as we are setting it
                sameSite:"strict", // here we are setting that the cookie can only be accessed by the same site that it was set
                path: "/",// here we are specifying the path where the cookie can be accessed
            }),
        );
        res.status(200).json({ success: true });
      } else {
        res.status(405).json({ success:false });
      }
  
}

export default handler;
