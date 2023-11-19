import React, { useState } from "react";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
import { DocumentArrowUpIcon } from "@heroicons/react/24/solid";

import useRefresh from "@/utils/useRefresh";
import Modal from "./Modal";
import DraftForm from "./DraftForm";
import { deletePost, publishPost } from "@/utils/post";
import toast from "react-hot-toast";

let formatter = new Intl.DateTimeFormat("en");

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
      toast.success("Successfully deleted post!");
      refreshData();
    } else {
      const { error } = await response.text().then((text) => JSON.parse(text));
      toast.error(error);
    }
  };

  const onPublished = async () => {
    const res = await publishPost(id);
    if (res.status === 204) {
      router.push("/");
      toast.success("Successfully published post!");
    } else {
      const { error } = await res.text().then((text) => JSON.parse(text));
      toast.error(error);
    }
  };

  const dateFormatter = (date) => {
    const currentDate = new Date(date);
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    };
    return new Intl.DateTimeFormat("en-US", options).format(currentDate);
  };

  return (
    <div className="border rounded-lg relative p-6 mb-3 shadow">
      <h1 className="text-2xl font-bold text-sky-500">{title}</h1>
      <p>{content}</p>
      <div className="pt-3 text-sm text-slate-500">
        {dateFormatter(created_at)}
      </div>
      <div className="absolute top-0 right-0 p-3 flex items-center gap-2">
        <button onClick={() => setEditModal(true)}>
          <PencilSquareIcon className="w-5" />
        </button>
        <button onClick={onDeletePost}>
          <TrashIcon className="w-5" />
        </button>
      </div>
      {draft && (
        <>
          <button
            onClick={onPublished}
            className="flex items-center gap-1 bg-emerald-500 text-white rounded-tl-lg px-2 text-[12px] py-1 font-semibold absolute right-0"
          >
            <DocumentArrowUpIcon className="w-4" />
            <span>Publish</span>
          </button>
        </>
      )}
      <Modal isOpen={editModal} setIsOpen={setEditModal} title="Edit Post">
        <DraftForm closeModal={() => setEditModal(false)} edit postId={id} />
      </Modal>
    </div>
  );
}
