import React from "react";
import { Link } from "react-router-dom";

export default function StoreLogo() {
    return (
        <Link to={'/'}>
            <div className="cursor-pointer">
                <img src="/images/da-goff-rocker.jpg" className="w-44 h-20"></img>
            </div>
        </Link>
    )
}