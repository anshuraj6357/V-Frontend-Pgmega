import { Heart } from "lucide-react";
import { useToggleWishlistMutation, useGetWishlistQuery } from "../Bothfeatures/features/api/authapi";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

export default function WishlistButton({ pg, onAuthOpen }) {
  // Redux user
  const { isAuthenticated } = useSelector((state) => state.auth);

  // Queries
  const { data: wishlistData } = useGetWishlistQuery();
  const [toggleWishlist] = useToggleWishlistMutation();

  const [isFav, setIsFav] = useState(false);

  // Sync heart with DB wishlist
  useEffect(() => {
    if (wishlistData?.data) {
      const pgIds = wishlistData.data.map((item) => item.pgId);
      setIsFav(pgIds.includes(pg._id));
    }
  }, [wishlistData, pg?._id]);

  const addToFav = async (e) => {
    e.stopPropagation();

    // 🔐 If not authenticated → open login modal
    if (!isAuthenticated) {
      toast.info("Please login to save PGs in wishlist");
      onAuthOpen();
      return;
    }

    // Instant UI toggle
    setIsFav((prev) => !prev);

    try {
      await toggleWishlist(pg._id).unwrap();

      if (!isFav) {
        toast.success("Added to wishlist ❤️");
      } else {
        toast.warn("Removed from wishlist");
      }

    } catch (err) {
      console.log("Wishlist error:", err);

      // rollback
      setIsFav((prev) => !prev);

      toast.error("Something went wrong. Try again.");
    }
  };

  return (
    <button
      onClick={addToFav}
      className="absolute top-2 right-2 bg-white/40 backdrop-blur-md p-2 rounded-full shadow-md"
    >
      <Heart
        className={`h-5 w-5 ${
          isFav ? "fill-red-600 text-red-600" : "text-white"
        }`}
      />
    </button>
  );
}
