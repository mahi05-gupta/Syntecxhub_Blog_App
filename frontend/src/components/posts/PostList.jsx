import PostCard from "./PostCard";

export default function PostList({
  posts,
  refreshPosts,
}) {
  if (!posts?.length) {
    return (
      <p className="text-center mt-10">
        No posts available
      </p>
    );
  }

  return (
    <div className="w-full px-2">
      <div
        className="
          grid
          grid-cols-1
          sm:grid-cols-2
          md:grid-cols-3
          lg:grid-cols-4
          xl:grid-cols-5
          gap-4
        "
      >
        {posts.map((post) => (
          <PostCard
            key={post._id}
            post={post}
            refresh={refreshPosts}
          />
        ))}
      </div>
    </div>
  );
}