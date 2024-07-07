"use client";


import { userIdHeaders } from "@/action";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";


interface WishlistButtonProps {
  productId: string;
}


const WishlistButton: React.FC<WishlistButtonProps> = ({ productId }) => {
    const router = useRouter()
  
    async function addWishlist (productId: string) {
      const userIdHeader = await userIdHeaders()

      // console.log(userIdHeader, "userId")
      // console.log(productId, "productId")

      if(!userIdHeader) {
        Swal.fire("You Must Login First")
      }
      const response = await fetch(process.env.NEXT_PUBLIC_BASE_URL + "/api/wishlists", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: userIdHeader,
          productId
        })
      })
  
      if(!response.ok) {
        Swal.fire("This Product Already on Wishlist")
      } else {
        router.push("/wishlist")
      }
    }
  return (
    <button className="btn btn-primary" onClick={() => addWishlist(productId.toString())}>
      Add to Wishlist
    </button>
  );
};

export default WishlistButton;
