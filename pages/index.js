import PostItem from "@/components/PostItem";
import { listPost } from "@/utils/post";

export default function Home({ data }) {
  if (!data) {
    return <p>Loading post...</p>;
  }

  return (
    <div>
      {data?.posts?.length === 0 && (
        <div className="text-center font-semibold">No post!!!</div>
      )}
      {data?.posts?.map((item) => (
        <PostItem key={item.id} {...item} />
      ))}
    </div>
  );
}

export async function getServerSideProps(context) {
  const limit = context.query.limit || 10;
  const data = await listPost(limit);
  return { props: { data } };
}
