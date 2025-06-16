import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import OfferItem from "../components/common/OfferItem";
import { supabaseClient } from "../supabase/client";
import LoadingBox from "../components/common/LoadingBox";
import { ROUTE_PATH } from "../utils/urls";

export default function MyWishlist() {
  const navigate = useNavigate();

  const {
    data: info,
    isFetching,
    error: screwUp,
  } = useQuery(["user"], () => supabaseClient.auth.getUser());

  screwUp && alert(screwUp);

  const userId = info?.data.user?.id;

  // const { data, error } = useQuery({
  //     queryKey: ["wishlist"],
  //     queryFn: () => {
  //         return supabaseClient
  //             .from('wishlist')
  //             .select('*')
  //             .eq('ownerid', userId)
  //     }, enabled: !!userId
  // })

    // error && alert(error);

    // const offers = data?.data || [];

  const handleDelete = async (id:string) => {
    await supabaseClient.from("wishlist").delete().eq("id", id);
  };

  if (!userId && !isFetching) {
    navigate(ROUTE_PATH.LOGIN);
  }

  return (
    <div className="p-2 m-2 text-lime-300 flex flex-col text-center">
      {isFetching && <LoadingBox />}
      {/* {offers?.map((item): any => {
        return (
          <div
            key={item.id}
            className="flex flex-col items-center  p-5 m-5 border border-lime-700 rounded"
          >
            <div className="bg-green-800 p-1 rounded text-lime-300">
              <span>{item.title}</span>
            </div>
            <div className="p-3">
              <img src={item.imageurl} className="h-80 object-fill"></img>
            </div>
            {
              <div>
                <p className="bg-green-800 p-1 rounded text-lime-300">
                  {item.description}
                </p>{" "}
              </div>
            }
            <div className="p-1 flex flex-col text-lime-300 space-x-1">
              <div className="inline-flex justify-center h-8 rounded">
                <span className="p-1 bg-green-800 rounded">{item.price}$</span>
              </div>
              <div className="flex items-center justify-center">
                <button
                  className="p-1 flex-1 text-cyan-400"
                  onClick={() => handleDelete(item.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        );
      })} */}
    </div>
  );
}
