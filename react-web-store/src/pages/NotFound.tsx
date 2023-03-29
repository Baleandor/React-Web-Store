import React from "react";
import { useNavigate } from 'react-router-dom'


export default function NotFound() {

    const navigate = useNavigate()


    return (
        <div className="text-red-400 p-1 text-center">
            <h1 className="p-1 mb-3 text-6xl">Page Not Found!</h1>
            <div>
                <span onClick={() => navigate('/')} className="p-1 border rounded border-red-300 cursor-pointer text-2xl">Back to Home</span>
            </div>
        </div>

    )
}