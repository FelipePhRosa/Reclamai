import { Clock5, ThumbsUp, MessageSquare } from "lucide-react";
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
    <div className="flex items-center border rounded-md shadow-sm overflow-hidden bg-white mt-5 min-h-[150px] pl-5">
      {/* Imagem */}
      <img src={image} alt={title} className="h-32 w-32 object-cover rounded-xl" />

      {/* Conteúdo */}
      <div className="p-4 flex flex-col justify-between flex-1">
        <div>
          {/* Status e Categoria */}
          <div className="flex items-center gap-2 mb-2">
            <span
              className={`bg-${statusColor}-100 text-${statusColor}-600 text-xs font-semibold py-0.5 rounded-full`}
            >
              {status}
            </span>
            <div className="flex items-center text-gray-600 text-xs font-medium px-4 py-0.5 rounded-full">
              {icon}
              {category}
            </div>
          </div>

          {/* Título e Endereço */}
          <h2 className="font-bold text-xl text-gray-800">{title}</h2>
          <p className="text-gray-500 text-md mt-1">{address}</p>
        </div>

        {/* Informações Adicionais */}
        <div className="flex items-center gap-3 mt-2 text-sm text-gray-600">
          <div className="flex items-center gap-1">
            <Clock5 size={12} />
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
            <MessageSquare size={12} />
            <span>{comments}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReportCard;
