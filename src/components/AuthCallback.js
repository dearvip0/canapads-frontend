import React from 'react';
import Oidc from 'oidc-client';
import queryString from 'querystring';


export default class AuthCallback extends React.Component {
    constructor(props) {
        super(props);


    }
    componentDidMount() {
        const mgr = new Oidc.UserManager({
            response_mode: 'query',
        });
        mgr.signinRedirectCallback().then(function (user) {
            console.log(user);
            localStorage.setItem('makako_token', user.access_token);
            window.location = "http://localhost:5000";
        })
            .catch(function (e) {
                console.error(e);
            });
    }

    render() {

        return (
            <div >
                Redirecting...
            </div>
        )


    }
}
