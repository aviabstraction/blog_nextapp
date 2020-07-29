import Head from 'next/head';
import path from 'path';
import fs from 'fs';
import Layout from '../../components/layout/Layout';
import { getSortedPostsData } from '../../lib/markdownPostDataExtractor';

// Style Scoped to this Page Component
// Note: Should end with module.css || module.scss

import styles from './slug.module.scss';

export const Blog = ({ htmlString, data }) => {
  return (
    <div>
      <Head>
        <title>{data.title}</title>
        <meta title="description" content={data.description} />
      </Head>
      <main>
        <Layout>
          <div dangerouslySetInnerHTML={{ __html: htmlString }} />
          {/* Sample Inline Styling */}
          <style jsx>{`
            .text {
              color: red;
            }
          `}</style>
        </Layout>
      </main>
    </div>
  );
};

//Dynamic route use - getStaticPaths
//Static Site Generation With Date - use getStaticProps

export const getStaticPaths = async () => {
  const postsDirectory = path.join(process.cwd(), 'posts');

  const files = fs.readdirSync(postsDirectory);

  //To get dynamic routes pass in the filename
  // inside params obj & return as paths in getStaticPaths

  const paths = files.map((filename) => ({
    params: {
      slug: filename.replace('.md', ''),
    },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async ({ params: { slug } }) => {
  const { data, htmlString } = getSortedPostsData(slug);

  return {
    props: {
      htmlString,
      data,
    },
  };
};

export default Blog;
