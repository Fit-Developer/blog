import { BASED_URL } from "@/config";

const headers = {
  Accept: "application/json",
  "Content-Type": "application/json",
};

export const listOnePost = async (id) => {
  const res = await fetch(`${BASED_URL}/api/posts/${id}`);
  return res.json();
};

export const listPost = async (limit, term) => {
  const res = await fetch(`${BASED_URL}/api/posts?limit=${limit}&term=${term}`);
  return res.json();
};

export const listPostDraft = async (limit, term) => {
  const res = await fetch(
    `${BASED_URL}/api/posts/draft?limit=${limit}&term=${term}`
  );
  return res.json();
};

export const createPost = async (payload) => {
  const res = await fetch(`${BASED_URL}/api/posts`, {
    method: "POST",
    headers: headers,
    body: JSON.stringify(payload),
  });
  return res;
};

export const updatePost = async (id, payload) => {
  const res = await fetch(`${BASED_URL}/api/posts/${id}`, {
    method: "PATCH",
    headers: headers,
    body: JSON.stringify(payload),
  });
  return res;
};

export const deletePost = async (id) => {
  const res = await fetch(`${BASED_URL}/api/posts/${id}`, {
    method: "DELETE",
  });
  return res;
};

export const publishPost = async (id) => {
  const res = await fetch(`${BASED_URL}/api/posts/${id}`, {
    method: "PATCH",
    headers: headers,
    body: JSON.stringify({ published: true }),
  });
  return res;
};
