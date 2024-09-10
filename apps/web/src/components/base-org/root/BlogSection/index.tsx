import ImageAdaptive from 'apps/web/src/components/ImageAdaptive';
import Link from 'next/link';

// Do note change this JSON manually, just run yarn workspace @app/web fetch-mirror-blog
import blogPosts from 'apps/web/scripts/blog_posts.json';

export default async function BlogSection() {
  return (
    <section>
      <ul>
        {blogPosts.map((post) => (
          <li key={post.title}>
            <Link target="_blank" href={post.url}>
              <ImageAdaptive
                src={post.publicImagePath}
                alt={post.title}
                width={1200}
                height={600}
              />{' '}
              <h2>{post.title}</h2>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
