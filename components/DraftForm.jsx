import { BASED_URL } from "@/config";
import { createPost, listOnePost, publishPost, updatePost } from "@/utils/post";
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";

export default function DraftForm({ closeModal, postId }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const router = useRouter();

  useEffect(() => {
    const fetchPost = async () => {
      if (postId) {
        const data = await listOnePost(postId);
        setTitle(data.title);
        setContent(data.content);
      }
    };
    fetchPost();
  }, [postId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = { title, content };
    if (postId) {
      const response = await updatePost(postId, payload);
      if (response.status === 204) {
        await closeModal();
        if (router.pathname === "/draft") {
          await router.replace(router.asPath);
        } else {
          await router.push("/draft");
        }
      } else {
        const error = await response.text();
        alert(error);
      }
    } else {
      const response = await createPost(payload);
      if (response.status === 201) {
        await closeModal();
        if (router.pathname === "/draft") {
          await router.replace(router.asPath);
        } else {
          await router.push("/draft");
        }
      } else {
        const error = await response.text();
        alert(error);
      }
    }
  };

  const handlePublish = async () => {
    const payload = { title, content };
    const response = await createPost(payload);
    if (response.status === 201) {
      const data = await response.json();
      const publish = await publishPost(data.id);
      if (publish.status === 204) {
        await closeModal();
        if (router.pathname === "/draft") {
          await router.push("/");
        } else {
          await router.replace(router.asPath);
        }
      } else {
        const error = await publish.text();
        alert(error);
      }
    } else {
      const error = await response.text();
      alert(error);
    }
  };

  return (
    <div>
      <form className="space-y-3" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-1">
          <label className="font-medium">Title</label>
          <input
            type="text"
            name="title"
            className="border rounded w-full h-[30px] px-3"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="font-medium">Content</label>
          <textarea
            name="content"
            className="border rounded px-3"
            rows="5"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          ></textarea>
        </div>
        <div className="space-y-3 pt-3">
          <div className="flex justify-between gap-3">
            <button
              className="w-full bg-sky-500 rounded-lg text-white py-2 font-bold"
              type="submit"
            >
              Save
            </button>
            <button
              onClick={closeModal}
              className="w-full border-sky-500 border rounded-lg text-sky-500 py-2 font-bold"
              type="button"
            >
              Cancle
            </button>
          </div>
          {postId ? (
            <button
              onClick={handlePublish}
              className="w-full bg-red-500 rounded-lg py-2 text-white font-bold"
              type="button"
            >
              Delete
            </button>
          ) : (
            <button
              onClick={handlePublish}
              className="w-full bg-emerald-500 rounded-lg py-2 text-white font-bold"
              type="button"
            >
              Publish Now
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
