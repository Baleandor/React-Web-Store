import React from "react"
import DoksStock from "./components/common/DoksStock"
import UserNavBar from "./components/common/user-nav-bar/UserNavBar"

function App() {
  return (
    <div className="flex-box relative">
      <div className="bg-zinc-800 w-600 h-600">
        <UserNavBar />
      </div>
      <div className="grid grid-cols-3">

        <div className="flex-box justify-start text-center m-4">YOUR AD SPACE HERE</div>
        <div className="flex-box relative">
          <DoksStock imgUrl="/images/huge-choppa.jpg" title="Uge Choppa" price={75330} description="Good for slashin! Good for choppin! It's big! Great for krumpin! Absolute must buy" />
          <DoksStock imgUrl="/images/power-klaw.png" title="Powah Klaw" price={305512} description="It's UGE! Great for krumpin! Absolute must buy! Really great for krumpin!" />
          <DoksStock imgUrl="/images/dakka.jpg" title="Supa Shootah" price={6942069} description="Goes DAKKADAKKADAKKADAKKA! Great for krumpin! Absolute must buy!" />
          <DoksStock imgUrl="/images/kustom-dakka.jpg" title="Kustom Shootah" price={420420420} description="Goes DAKKA DAKKA DAKKA DAKKA! Great for krumpin! Absolute must buy!" />
        </div>
        <div className="flex-box justify-end text-center m-4">YOUR AD SPACE HERE</div>

      </div>
    </div>
  )
}

export default App
