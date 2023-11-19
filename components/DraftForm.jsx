import {
  createPost,
  listOnePost,
  publishPost,
  updatePost,
  deletePost,
} from "@/utils/post";
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import Spinner from "./Spinner";

export default function DraftForm({ closeModal, postId }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);

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
    setLoading(true);
    if (postId) {
      const response = await updatePost(postId, payload);
      if (response.status === 204) {
        await closeModal();
        if (router.pathname === "/draft") {
          await router.replace(router.asPath);
        } else {
          await router.push("/draft");
        }
        toast.success("Successfully updated post!");
        setLoading(false);
      } else {
        const { error } = await response
          .text()
          .then((text) => JSON.parse(text));
        toast.error(error);
        setLoading(false);
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
        setLoading(false);

        toast.success("Successfully created post!");
      } else {
        const { error } = await response
          .text()
          .then((text) => JSON.parse(text));
        setLoading(false);
        toast.error(error);
      }
    }
  };

  const handlePublish = async () => {
    setLoading2(true);
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
        toast.success("Successfully created post and published!");
        setLoading2(false);
      } else {
        const { error } = await publish.text().then((text) => JSON.parse(text));
        toast.error(error);
        setLoading2(false);
      }
    } else {
      const { error } = await response.text().then((text) => JSON.parse(text));
      toast.error(error);
      setLoading2(false);
    }
  };

  const handleDelete = async () => {
    setLoading2(true);
    const response = await deletePost(postId);
    if (response.status === 204) {
      toast.success("Successfully deleted post!");
      await closeModal();
      await router.replace(router.asPath);
      setLoading2(false);
    } else {
      const { error } = await response.text().then((text) => JSON.parse(text));
      toast.error(error);
      setLoading2(false);
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
              className="w-full bg-sky-500 rounded-lg text-white py-2 font-bold "
              type="submit"
              disabled={loading}
            >
              <Spinner
                text="Save"
                loadingText="Saving..."
                isLoading={loading}
              />
            </button>
            <button
              onClick={closeModal}
              className="w-full border-sky-500 border rounded-lg text-sky-500 py-2 font-bold"
              type="button"
            >
              Cancel
            </button>
          </div>
          {postId ? (
            <button
              onClick={handleDelete}
              className="w-full bg-red-500 rounded-lg py-2 text-white font-bold"
              type="button"
            >
              <Spinner
                text="Delete"
                loadingText="Deleting..."
                isLoading={loading2}
              />
            </button>
          ) : (
            <button
              onClick={handlePublish}
              className="w-full bg-emerald-500 rounded-lg py-2 text-white font-bold"
              type="button"
            >
              <Spinner
                text="Publish Now"
                loadingText="Publishing..."
                isLoading={loading2}
              />
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
