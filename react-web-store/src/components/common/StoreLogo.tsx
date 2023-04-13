import React from "react";
import { Link } from "react-router-dom";
import { ROUTE_PATH } from "../../utils/urls";


export default function StoreLogo() {

    
    return (
        <Link to={ROUTE_PATH.HOME}>
            <div className="cursor-pointer">
                <img src="/images/goffrocker.png" className="w-44 h-20"></img>
            </div>
        </Link>
    )
}