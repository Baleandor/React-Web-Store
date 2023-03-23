import React from "react";
import DoksStock from "../components/common/DoksStock";


export default function Home() {


    return (
        <div className="flex-box relative">
            <div className="justify-center text-center m-4 text-4xl text-lime-400">Da Dok's Speshul Show off Collekshun!</div>
            <div className="flex-box relative">
                <DoksStock  imgUrl="/images/huge-choppa.jpg" title="Uge Choppa" price={75330} description="Good for slashin! Good for choppin! It's big! Great for krumpin!" />
                <DoksStock imgUrl="/images/power-klaw.png" title="Powah Klaw" price={305512} description="It's UGE! Great for krumpin! Really great for krumpin!" />
                <DoksStock  imgUrl="/images/dakka.jpg" title="Supa Shootah" price={6942069} description="Goes DAKKADAKKADAKKADAKKA! Great for krumpin!" />
                <DoksStock  imgUrl="/images/kustom-dakka.jpg" title="Kustom Shootah" price={420420420} description="Goes DAKKA DAKKA DAKKA DAKKA! Great for krumpin!" />
            </div>
        </div>
    )
}