import React, {Component} from 'react';
import SignIn from './localAuthentication/SignInForm';



const Landing =()=>{

    return (
        <div style={{display:'flex',
        justifyContent:'space-around'}}>
           <div >
               <h2>Landing page</h2>
           </div>

            <div>
                <SignIn/>

            </div>

        </div>
    )

}

export default Landing;
