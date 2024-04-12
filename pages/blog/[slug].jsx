import { useContext , useEffect} from 'react';
import BlogPostDetail from '../../containers/Blog/Details/index'
import Layout from '../../components/Layout';
import { useRouter } from 'next/router';
import Footer from '../../components/Footer';
import Testemonial from '../../containers/Blog/Testemonial/index'
import { PostsContext } from '../../helpers/postsContext';
import Head from 'next/head';
import blogPosts from '../../helpers/blogData';


const BlogPostDetailPage = ({cookies}) => {
  const router = useRouter(); // Initialize useRouter
  const { slug } = router.query; // Extract blogId from router query
  const blogPosts = useContext(PostsContext);
  const post = blogPosts.find(post => post.slug === slug);

  useEffect(() => {
    console.log('Rendered on the server side');
  }, []);

  if (!post) return <div>Post not found</div>;
  return (
      <Layout cookies={cookies}
        pageId='blog details'
        title={`BS Move - ${post.metatitle}`}
        description={post.description}
        keywords={post.keywords}
      >
        <BlogPostDetail title={`BS Move Déménagement - ${post.title}`} description={post.description} post={post} questions={post.questions} image={post.image} conclution={post.conclution}/>
        <Testemonial />
        <Footer />
      </Layout>
  );
}

export async function getServerSideProps(context) {
  const { slug } = context.params; // Extract blogId from context

  // Find the post with the matching ID
  const post = blogPosts.find(post => post.slug === slug);

  // Pass the fetched post data as props
  return {
    props: {
      post,
    },
  };

}
export default BlogPostDetailPage;
