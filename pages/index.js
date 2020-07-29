import Head from 'next/head';

// Style Scoped to this Page Component
// Note: Should end with module.css || module.scss
// Custom Imports

import Layout from '../components/layout/Layout';
import { getSortedPostsData } from '../lib/posts';

// All Routes are displayed in pages folder
// Everything inside pages folder should be default export

export default function Home({ allPostsData }) {
  console.log(allPostsData);
  return (
    <div>
      <Head>
        <title>Blog App</title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="description" content="blog app created using next js" />
        <meta name="og:title" content="Blog App" />
      </Head>
      <main>
        <Layout>
          <ul>
            {allPostsData.map((post, index) => {
              return (
                <>
                  <li>{post.id}</li>
                  <li>{post.title}</li>
                  <li>{post.date}</li>
                </>
              );
            })}
          </ul>
          <style jsx>{`
            .text {
              color: red;
            }
          `}</style>
        </Layout>
      </main>
    </div>
  );
}

//Static Site Generation With Date - use getStaticProps

export const getStaticProps = async () => {
  const allPostsData = getSortedPostsData();
  return {
    props: {
      allPostsData: allPostsData,
    },
  };
};
