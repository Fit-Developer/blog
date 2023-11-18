import { BASED_URL } from "@/config";
import React, { useState } from "react";
import { CiEdit, CiTrash, CiShare1 } from "react-icons/ci";
import { IoShare } from "react-icons/io5";
import useRefresh from "@/utils/useRefresh";
import Modal from "./Modal";
import DraftForm from "./DraftForm";
import { deletePost, publishPost } from "@/utils/post";
export default function PostItem({
  id,
  title,
  content,
  created_at,
  draft = false,
}) {
  const { refreshData, router } = useRefresh();

  const [editModal, setEditModal] = useState(false);

  const onDeletePost = async () => {
    const response = await deletePost(id);
    if (response.status === 204) {
      refreshData();
    } else {
      const error = await response.text();
      alert(error);
    }
  };

  const onPublished = async () => {
    const res = await publishPost(id);
    if (res.status === 204) {
      router.push("/");
    } else {
      const error = await res.text();
      alert(error);
    }
  };

  return (
    <div className="border rounded-lg relative p-6 mb-3 shadow">
      <h1 className="text-2xl font-bold text-sky-500">{title}</h1>
      <p>{content}</p>
      <div className="pt-3 text-sm text-slate-500">{created_at}</div>
      <div className="absolute top-0 right-0 p-3 flex items-center gap-2">
        <button onClick={() => setEditModal(true)}>
          <CiEdit size={20} />
        </button>
        <button onClick={onDeletePost}>
          <CiTrash />
        </button>
        {draft && (
          <>
            <button
              onClick={onPublished}
              className="flex items-center gap-1 bg-emerald-500 text-white rounded-md px-2 text-[12px] py-1 font-semibold"
            >
              <IoShare />
              <span>Publish</span>
            </button>
          </>
        )}
      </div>
      <Modal isOpen={editModal} setIsOpen={setEditModal} title="Edit Post">
        <DraftForm closeModal={() => setEditModal(false)} edit postId={id} />
      </Modal>
    </div>
  );
}
