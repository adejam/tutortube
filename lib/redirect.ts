const redirect = (context: any, path: string) => {
    if(context.res){
        context.res.writeHead(303, {location: path});
        context.res.end();
    }
}

export default redirect