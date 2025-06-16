import React, { useEffect, useState } from "react";


type ShrekErrorBoxProps = {
    errorMessage: string | undefined
}


export default function ShrekErrorBox({ errorMessage }: ShrekErrorBoxProps) {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        if (errorMessage) {
            setIsVisible(true);
            
            // Set timer to hide the component after 5 seconds
            const timer = setTimeout(() => {
                setIsVisible(false);
            }, 5000);

            // Cleanup timer if component unmounts or errorMessage changes
            return () => clearTimeout(timer);
        } else {
            setIsVisible(false);
        }
    }, [errorMessage]);

    // Don't render if not visible or no error message
    if (!isVisible || !errorMessage) {
        return null;
    }

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