import type { NextApiRequest, NextApiResponse } from 'next'
import cookie from 'cookie'

type Data = {
  success: boolean;
}

const handler =  (req: NextApiRequest, res: NextApiResponse<Data>):void => {
    if (req.method === 'GET') {
        res.setHeader(
            "Set-Cookie",
            cookie.serialize("token", "", {
                httpOnly: true,
                secure: process.env.NODE_ENV !== 'production',
                expires: new Date(0),
                sameSite:"strict",
                path: "/",
            }),
        );
        res.status(200).json({ success: true });
      } else {
        res.status(405).json({ success:false });
      }
  
}

export default handler;
