import PropTypes from 'prop-types';
import Head from 'next/head';
import Footer from './Footer';
import Navbar from './Navbar';

interface LayoutProps {
  
}

const Layout: React.FunctionComponent<LayoutProps> = ({ children }) => (
  <div className="content">
    <Head>
      <title>Tutortube</title>
      <meta name="description" content="Adeleye jamiu companies list app" />
      <meta name="keywords" content="Companies list" />
      <link rel="icon" href="/favicon.png" />
    </Head>
    <Navbar />
    <main className="mx-auto p-10">{children}</main>
    <Footer />
  </div>
);

Layout.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.array,
    PropTypes.object,
    PropTypes.func,
    PropTypes.symbol,
  ]).isRequired,
};

export default Layout;
