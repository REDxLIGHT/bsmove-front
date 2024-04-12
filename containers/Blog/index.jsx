import BlogPostCard from '../../components/Blog/index'
import { useContext } from "react";
import { PostsContext } from '../../helpers/postsContext';
import styles from './index.module.css'

const BlogPost = () => {
  const blogPosts = useContext(PostsContext);

  return (
    <div className={styles.container}>
      <h1 className={styles.h1}>Actualités</h1>
      <div className={styles.blog_container}>
        {blogPosts.map((post) => (
          <div
            key={post.slug}
            className={styles.blog}
          >
            <BlogPostCard
              id={post.id}
              title={post.title}
              description={post.description}
              image={post.image}
              slug={post.slug}
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export default BlogPost