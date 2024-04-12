import styles from './index.module.css'
import Link from 'next/link'
import Image from 'next/image'
import PropTypes from 'prop-types'


const BlogPostCard = ({ id, image, title, description, slug }) => {

  console.log(id);
  console.log(slug);
  console.log(title);
  console.log(description);
  return (
    <div className={styles.blog_post_card}>
      <Image
        src={image}
        alt={title}
        className={styles.img}
        width={300}
        height={200}
      />
      
      <div className={styles.container_1}>
        <div className={styles.title}>{title}</div>
        <p className={styles.description}>
          {description}
        </p>
      </div>

      <div className={styles.container_2}>
        <Link
          href={`/blog/${slug}`}
          className={styles.link}
        >
          En savoir plus
        </Link>
      </div>
    </div>
  )
}



BlogPostCard.propTypes = {
  id: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  slug: PropTypes.string.isRequired

}
export default BlogPostCard