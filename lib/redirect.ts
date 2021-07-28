import { NextPageContext } from "next";

const redirect = (context: NextPageContext, path: string): void => {
    if(context.res){
        context.res.writeHead(303, {location: path});
        context.res.end();
    }
}

export default redirect