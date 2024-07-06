"use client";

import { useRouter } from "next/navigation";
import Swal from "sweetalert2";


interface WishlistButtonProps {
  productId: string;
}


const WishlistButton: React.FC<WishlistButtonProps> = ({ productId }) => {
    const router = useRouter()

    async function addWishlist () {
        const response = await fetch("http://localhost:3000/api/wishlists", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
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
    <button className="btn btn-primary" onClick={addWishlist}>
      Add to Wishlist
    </button>
  );
};

export default WishlistButton;
