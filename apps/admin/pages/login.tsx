
import Head from 'next/head';
import { UxFormsLogin }  from '@epcvip-react-test/ux/forms/login';
import { useEffect } from 'react';
import { getCurrentUser, authHeader, logout } from '@epcvip-react-test/auth';
import * as _ from 'lodash';
import { useRouter } from 'next/router';   

const Login = () => {

    const router = useRouter();

    // useEffect(() => {
    
    //     const user = getCurrentUser();
    //     // redirect to home if already logged in
    //     if(_.isEmpty(user)){
    //             router.push('/');
    //     }

    // }, []);

    return (
        <>  
            <UxFormsLogin authenticatedUrl="/"></UxFormsLogin>
        </>
    )
}

export default Login;