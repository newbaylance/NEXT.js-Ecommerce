"use client";

import { useRouter } from "next/navigation";


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
            throw new Error("Add Wishlist Failed")
          }

        router.push("/wishlist")
      
    }
  return (
    <button className="btn btn-primary" onClick={addWishlist}>
      Add to Wishlist
    </button>
  );
};

export default WishlistButton;
