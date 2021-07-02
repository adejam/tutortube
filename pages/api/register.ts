import type { NextApiRequest, NextApiResponse } from 'next'
import cookie from 'cookie'

type Data = {
  success: boolean;
}

const handler =  (req: NextApiRequest, res: NextApiResponse<Data>) => {
    const { body } = req;
    if (req.method === 'POST') {
        res.setHeader(
            "Set-Cookie",
            cookie.serialize("token", body.token, {
                httpOnly: true,
                secure: process.env.NODE_ENV !== 'production',
                maxAge: 60 *60,
                sameSite:"strict",
                path: "/",
            })
        )
        res.status(200).json({ success: true })
      } else {
        res.status(400).json({ success: false });
      }
  
}

export default handler;
