import { AuthProtectedRoute } from "../../components/AuthProtectedRoute";

export interface homeProps {
    token: string
}
 
const home: React.FunctionComponent<homeProps> = ({token}) => {
    console.log(token);
    return ( 
        <h1>Welcome Home</h1>
     );
}
 
export default AuthProtectedRoute(home);