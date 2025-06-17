import React from "react";
import { useNavigate } from "react-router-dom";
import { supabaseClient } from "../../../supabase/client";
import { ROUTE_PATH } from "../../../utils/urls";

export default function SellItemsButton() {
  const navigate = useNavigate();

  const handleSellItemsClick = async () => {
    const { data, error } = await supabaseClient.auth.getSession();

    error && alert(error.message);

    if (data?.session?.user) {
      navigate(ROUTE_PATH.SELL_ITEMS);
    } else {
      navigate(ROUTE_PATH.LOGIN);
    }
  };

  return (
    <div className="inline-flex text-cyan-200 w-18 h-8 justify-center p-1 cursor-pointer border border-transparent hover:border-lime-400 hover:rounded hover:text-cyan-100">
      <span className="self-center text-l" onClick={handleSellItemsClick}>
        Sell Items
      </span>
    </div>
  );
}
