import PostItem from "@/components/PostItem";
import useFetch from "@/utils/useFetch";
import { BASED_URL } from "@/config";

export default function Home() {
  const { data, loading } = useFetch(`${BASED_URL}/api/posts`);

  if (loading) {
    return <p>Loading post...</p>;
  }

  return (
    <div>
      {data?.posts.length === 0 && (
        <div className="text-center font-semibold">No post!!!</div>
      )}
      {data?.posts?.map((item) => (
        <PostItem key={item.id} {...item} />
      ))}
    </div>
  );
}
