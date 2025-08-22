import { Clock5, ThumbsUp, MessageSquare, ArrowDownRight } from "lucide-react";
import { LikeButton } from "./LikeButton"; // ajuste caminho

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
    <div className="flex items-center rounded-md shadow-sm overflow-hidden bg-white mt-5 min-h-[150px] pl-5 dark:bg-gray-800">
      {/* Imagem */}
      <img src={image} alt={title} className="h-32 w-32 object-cover rounded-xl" />

      {/* Conteúdo */}
      <div className="p-4 flex flex-col justify-between flex-1">
        <div>
          {/* Status e Categoria */}
          <div className="flex items-center gap-2 mb-2">
            <span
              className={`bg-${statusColor}-100 text-${statusColor}-600 text-xs font-semibold p-1.5 rounded-full capitalize`}
            >
              {status}
            </span>
            <div className="flex items-center text-gray-600 text-xs font-medium px-4 py-0.5 rounded-full">
              {icon}
              {category}
            </div>
          </div>

          {/* Título e Endereço */}
          <h2 className="font-bold text-xl text-gray-800 dark:text-gray-300">{title}</h2>
          <p className="text-gray-500 text-md mt-1 dark:text-gray-400">{address}</p>
        </div>

        {/* Informações Adicionais */}
        <div className="flex items-center gap-3 mt-2 text-sm text-gray-600 dark:text-gray-300 dark:font-semibold">
          <div className="flex items-center gap-1">
            <Clock5 size={14} />
            <span>{time}</span>
          </div>
          <div className="flex items-center gap-3">
            {/* Removemos o ícone e texto fixo de likes aqui */}
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
          <button className="ml-auto w-10 h-10 bg-blue-500 rounded-xl flex items-center justify-center cursor-pointer">
            <ArrowDownRight className="text-white "/>
          </button>
        </div>
      </div>
    </div>
  );
}

export default ReportCard;
