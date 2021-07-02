const dev = process.env.NODE_ENV !== 'production';

export const configHeader = { headers: { "Content-Type": "application/json" } };

export const server = dev ? 'http://localhost:3000/api' : 'https://tutortube.vercel.app/api';

export const baseApiUrl = 'https://tutortube-api.herokuapp.com/api';
