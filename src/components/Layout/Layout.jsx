import React, { useEffect } from 'react';
import NavBar from '../navbar/TopBar';

function Layout(props) {
    
    return (
        <>
            <NavBar /> 
            <div>
                {props.children}
            </div>
        </>
    )
}

export default Layout