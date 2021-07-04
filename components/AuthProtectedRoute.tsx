import { NextPageContext } from 'next';
import { Component } from 'react';
import cookies from 'next-cookies';
import redirect from '../lib/redirect';
import cookie from 'cookie'

export const AuthProtectedRoute = (WrappedComponent: any) => {
    return class AuthenticatedComponent extends Component {
        static async getInitialProps (ctx: NextPageContext){
            const { token, role, username } = cookies(ctx);
            console.log(token);
            console.log(role);
            console.log(username);
            if(!token && !username && !role) {
                redirect(ctx, '/login');
            }

            const initialProps = {
                token,
                username,
                role,
                query: ctx.query,
                asPath: ctx.asPath,
              };
              console.log(initialProps);
              if (WrappedComponent.getInitialProps) {
                    return WrappedComponent.getInitialProps(initialProps);
              }
        
            return initialProps;
        }

        render () {
            return <WrappedComponent {...this.props} />;
        }
    }
}