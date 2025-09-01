import { Clock5, ThumbsUp, MessageSquare, ArrowDownRight } from "lucide-react";
import { LikeButton } from "./LikeButton"; // ajuste caminho
import { Link } from "react-router-dom";

function ReportCard({
  id,
  image,
  status,
  statusColor,
  icon,
  category,
  title,
  address,
  time,
  likes,
  comments,
  likedByCurrentUser,
}) {
  return (
    <div className="flex items-stretch rounded-md shadow-sm overflow-hidden bg-white mt-5 max-h-[200px] pl-5 dark:bg-gray-800">
      {/* Imagem */}
        <img 
          src={image} 
          alt={title} 
          className="h-32 w-32 object-cover rounded-xl my-auto" 
        />

      {/* Conteúdo */}
      <div className="p-5 flex flex-col justify-between flex-1 min-h-0">
        <div className="flex-1">
          {/* Status e Categoria */}
          <div className="flex items-center gap-2 mb-2">
            <span
              className={`bg-${statusColor}-100 text-${statusColor}-600 text-xs font-semibold p-1.5 rounded-full capitalize`}
            >
              {status}
            </span>
            <div className="flex items-center text-gray-600 text-xs font-medium rounded-full">
              {icon}
              {category}
            </div>
          </div>

          {/* Título e Endereço */}
          <h2 className="font-bold text-xl text-gray-800 dark:text-gray-300 line-clamp-2">
            {title}
          </h2>
          <p className="text-gray-500 text-md mt-1 dark:text-gray-400 line-clamp-1">
            {address}
          </p>
        </div>

        {/* Informações Adicionais */}
        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300 dark:font-semibold flex-shrink-0">
          <div className="flex items-center gap-1">
            <Clock5 size={14} />
            <span>{time}</span>
          </div>
          <div className="flex items-center gap-3">
            <LikeButton
              reportId={id}
              initialLiked={likedByCurrentUser}
              initialLikes={likes}
            />
          </div>
          <div className="flex items-center gap-1">
            <MessageSquare size={14} />
            <span>{comments}</span>
          </div>
          <Link to={`/report/${id}`} className="ml-auto w-10 h-8">
            <button className="ml-auto w-10 h-10 bg-blue-500 rounded-xl flex items-center justify-center cursor-pointer flex-shrink-0">
              <ArrowDownRight className="text-white"/>
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ReportCard;