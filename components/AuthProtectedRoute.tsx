import { NextPageContext } from 'next';
import { Component } from 'react';
import cookies from 'next-cookies';
import redirect from '../lib/redirect';

export const AuthProtectedRoute = (WrappedComponent: any) => {
    return class AuthenticatedComponent extends Component {
        static async getInitialProps (ctx: NextPageContext){
            const { token, role, username } = cookies(ctx);
            console.log(token);
            if(!token && !username && !role) {
                redirect(ctx, '/login');
            }
            // const { username } = cookies(ctx);

            const ini = {
                token,
                username: username,
                query: ctx.query,
                asPath: ctx.asPath,
              };
            
              if (WrappedComponent.getInitialProps) {
                    return WrappedComponent.getInitialProps(ini);
              }
        
      return ini;
        }

        render () {
            return <WrappedComponent {...this.props} />;
        }
    }
}