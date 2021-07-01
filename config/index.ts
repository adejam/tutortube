const dev = process.env.NODE_ENV !== 'production';

export const server = dev ? 'http://localhost:3000' : 'https://tutortube.vercel.app/';

export const baseApiUrl = 'https://tutortube-api.herokuapp.com/api';
