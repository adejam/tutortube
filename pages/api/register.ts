import type { NextApiRequest, NextApiResponse } from 'next'
import cookie from 'cookie'

type Data = {
  success: boolean;
}

const handler =  (req: NextApiRequest, res: NextApiResponse<Data>):void => {
    const { body } = req; // here we get the token from the request
    if (req.method === 'POST') { // here we are checking if the correct method is being used as in the nextjs docs
        res.setHeader( // in the code below we are setting the header to add an http only token to the cookies storage
            "Set-Cookie",
            cookie.serialize("token", body.token, { // we named the token and passed the token gotten from backend as value
                httpOnly: true, // we are making the token to be http only token
                secure: process.env.NODE_ENV !== 'production', // here we are securing the token to only be accessed via https and not http, but we want to do this only on production
                maxAge: 60 *60, // here we are setting the time for the cookie to expire which is set to 1 hour
                sameSite:"strict", // here we are setting that the cookie can only be accessed by the same site that it was set
                path: "/", // here we are specifying the path where the cookie can be accessed
            })
        )
        res.status(201).json({ success: true }) // we are returning a true value for success
      } else {
        res.status(405).json({ success: false });
      }
  
}

export default handler;
