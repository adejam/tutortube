import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Layout from '../components/Layout';
import '../styles/globals.css';
import Axios from 'axios'

Axios.defaults.baseURL = 'https://tutortube-api.herokuapp.com/api/';
Axios.defaults.withCredentials = true;

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
