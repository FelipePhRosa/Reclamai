import { useState, useEffect, useContext } from "react";
import { ChevronUp } from "lucide-react";
import { AuthContext } from "../context/AuthContext";

export default function LikeButton({ reportId, initialLiked, initialLikes }) {
  const { user } = useContext(AuthContext)

  const [liked, setLiked] = useState(initialLiked || false);
  const [likesCount, setLikesCount] = useState(initialLikes || 0);
  const [loading, setLoading] = useState(false);
  const [dataLoaded, setDataLoaded] = useState(false);

  // Busca dados reais apenas uma vez quando o componente carrega
  useEffect(() => {
    const fetchLikeStatus = async () => {
      if (!reportId) return;
      
      setLoading(true);
      try {
        const token = localStorage.getItem('token');
        
        const res = await fetch(`http://localhost:3000/report/${reportId}/like`, {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
          },
          credentials: "include",
        });
        
        if (res.ok) {
          const data = await res.json();
          setLiked(data.liked || false);
          setLikesCount(data.totalLikes || 0);
        }
      } catch (error) {
        console.error("Erro ao buscar status do like:", error);
      } finally {
        setLoading(false);
        setDataLoaded(true);
      }
    };

    fetchLikeStatus();
  }, [reportId]);

  const toggleLike = async () => {
    if (loading) return;

    // Otimistic update
    const previousLiked = liked;
    const previousCount = likesCount;
    
    setLikesCount(count => count + (liked ? -1 : 1));
    setLoading(true);

    try {
      const token = localStorage.getItem('token');

      const res = await fetch(`http://localhost:3000/report/${reportId}/like`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        credentials: "include",
      });
      
      const data = await res.json();

      if (res.ok && data.liked !== undefined) {
        setLiked(data.liked);
        setLikesCount(data.totalLikes);
      } else {
        // Reverte se deu erro
        setLiked(previousLiked);
        setLikesCount(previousCount);
      }
    } catch (error) {
      // Reverte se deu erro
      setLiked(previousLiked);
      setLikesCount(previousCount);
      console.error("Erro ao curtir/descurtir:", error);
    } finally {
      setLoading(false);
    }
  };

  // Mostra skeleton loader enquanto carrega
  if (!dataLoaded) {
    return (
      <div className="group flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600">
        <div className="animate-pulse">
          <ChevronUp size={18} className="text-gray-400" />
        </div>
        <div className="w-8 h-5 bg-gray-300 dark:bg-gray-600 animate-pulse rounded"></div>
      </div>
    );
  }

  return (
    <button
      onClick={toggleLike}
      disabled={loading}
      className={`group flex items-center gap-2 px-2 py-2 mx-2 rounded-xl font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed ${
        liked 
          ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg shadow-orange-500/30 hover:shadow-xl hover:shadow-orange-500/40 hover:-translate-y-0.5 cursor-pointer' 
          : 'bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-orange-50 dark:hover:bg-orange-900/20 hover:border-orange-300 dark:hover:border-orange-500 hover:text-orange-600 dark:hover:text-orange-400 cursor-pointer'
      }`}
      aria-label={liked ? "Descurtir" : "Curtir"}
    >
      <ChevronUp 
        size={18} 
        className={`transition-transform duration-200 ${liked ? 'text-white' : 'group-hover:scale-110'} ${loading ? 'animate-pulse' : ''}`}
      />
      <span className="font-semibold">
        {likesCount}
      </span>
    </button>
  );
}
