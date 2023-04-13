import React from "react";


type ShrekErrorBoxProps = {
    errorMessage: string | undefined
}


export default function ShrekErrorBox({ errorMessage }: ShrekErrorBoxProps) {


    return (
        <div className="w-auto fixed right-10 bottom-0">
            <div className="p-1 text-lime-200 bg-lime-900 rounded text-2xl">
                <p>
                    {errorMessage}
                </p>
            </div>
            <div>
                <img src="/images/KRUMPIN.png" className="mt-5"></img>
            </div>
        </div>
    )
}