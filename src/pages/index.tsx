import { NavBar } from "../components/NavBar";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../utils/createUrqlClient";
import { usePostsQuery } from "../generated/graphql";

const Index = () => {
  const [{ data }] = usePostsQuery();
  return (
    <>
      <NavBar />
      <div>Hello 🌎</div>
      <br />
      {!data ? null : data.posts.map((p) => <div key={p.id}>{p.title}</div>)}
    </>
  );
};

// Only need to add ssr on page if you are doing any kind of query on the page
// reccommended only if query content is important for seo
export default withUrqlClient(createUrqlClient, { ssr: true })(Index);
