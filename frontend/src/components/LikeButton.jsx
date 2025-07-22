  import React, { useState } from "react";
  import { FaHeart, FaRegHeart } from "react-icons/fa";

  export function LikeButton({ reportId, initialLiked, initialLikes }) {
    const [liked, setLiked] = useState(initialLiked);
    const [likesCount, setLikesCount] = useState(initialLikes);
    const [loading, setLoading] = useState(false);

    const toggleLike = async () => {
      if (loading) return;

      setLoading(true);

      try {
        const token = localStorage.getItem('token');

        const res = await fetch(`http://localhost:3000/report/${reportId}/like`, {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${token}`
          },
          credentials: "include",
        });
        const data = await res.json();

        if (data.liked !== undefined) {
          setLiked(data.liked);
          setLikesCount(count => count + (data.liked ? 1 : -1));
        }
      } catch (error) {
        console.error("Erro ao curtir/descurtir:", error);
      } finally {
        setLoading(false);
      }
    };

    return (
      <button
        onClick={toggleLike}
        disabled={loading}
        className="flex items-center gap-1 text-red-600 hover:scale-110 transition-transform disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
        aria-label={liked ? "Descurtir" : "Curtir"}
      >
        {liked ? <FaHeart /> : <FaRegHeart />}
        <span>{likesCount}</span>
      </button>
    );
  }
