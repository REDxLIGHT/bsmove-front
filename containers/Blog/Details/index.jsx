import Image from 'next/image';
import styles from './index.module.css';


const BlogPostDetail = (post) => {
  console.log(post.questions);

  return (
    <div>
        <div className={styles.container}>
        <h1 className={styles.h1}>{post.title}</h1>
        <p className={styles.description}>{post.description}</p>
        <Image className={styles.img} src={post.image} alt={post.title}/>
        {post.questions.map((questionObj, index) => (
          <div key={post.slug}>
            <h1 className={styles.h3}>{`${index + 1}. ${questionObj.label}`}</h1>
            <p className={styles.p}>{questionObj.content}</p>
          </div>
        ))}
        <h3>{post.conclution}</h3>
        </div>
      </div>
  )
}

export default BlogPostDetail