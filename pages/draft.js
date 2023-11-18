import PostItem from "@/components/PostItem";
import React from "react";
import { listPostDraft } from "@/utils/post";

export default function Draft({ data }) {
  if (!data) {
    return <p>Loading post...</p>;
  }

  return (
    <div>
      {data?.posts.length === 0 && (
        <div className="text-center font-semibold">No post!!!</div>
      )}
      {data?.posts.map((item) => (
        <PostItem key={item.id} {...item} draft />
      ))}
    </div>
  );
}

export async function getServerSideProps(context) {
  const limit = context.query.limit || 10;
  const data = await listPostDraft(limit);
  return { props: { data } };
}
