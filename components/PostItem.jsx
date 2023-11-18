import React from "react";
import { CiEdit, CiTrash } from "react-icons/ci";

export default function PostItem({
  title,
  content,
  created_at,
  draft = false,
}) {
  return (
    <div className="border rounded-lg relative p-6 mb-3 shadow">
      <h1 className="text-2xl font-bold text-sky-500">{title}</h1>
      <p>{content}</p>
      <div className="pt-3 text-sm text-slate-500">{created_at}</div>
      <div className="absolute top-0 right-0 p-3 flex items-center gap-2">
        <button>
          <CiEdit size={20} />
        </button>
        {draft && (
          <>
            <button>
              <CiTrash />
            </button>
          </>
        )}
      </div>
    </div>
  );
}
