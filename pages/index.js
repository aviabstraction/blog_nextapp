import { Fragment } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import fs from 'fs';
import path from 'path';
import Layout from '../components/layout/Layout';

// All Routes are displayed in pages folder
// Everything inside pages folder should be default export

//Slugs Definition - stackoverflow
// Slug is used to make a name that is not acceptable for various
// reasons - e.g. containing special characters, too long, mixed-case,
// etc. - appropriate for the target usage. What target usage means is context dependent,
//but in general case slug is a more appropriate combination of other fields. In the above case,
// only one field is used - title.

const Home = ({ slugs }) => (
  <Fragment>
    <Head>
      <title>Blog App</title>
      <link rel="icon" href="/favicon.ico" />
      <meta name="description" content="blog app created using next js" />
      <meta name="og:title" content="Blog App" />
    </Head>
    <Layout>
      Slugs:
      {slugs.map((slug, index) => {
        return (
          <div key={index}>
            <Link href={`/blog/${slug}`}>
              <a style={{ color: 'blue' }}>{`/blog/${slug}`}</a>
            </Link>
          </div>
        );
      })}
    </Layout>
  </Fragment>
);

//Passing Data to component as props using getStaticProps
//Why readfilesync? why not readfileasync figure it out later

export const getStaticProps = async () => {
  const postsDirectory = path.join(process.cwd(), 'posts');

  const files = fs.readdirSync(postsDirectory);

  return {
    props: {
      slugs: files.map((filename) => filename.replace('.md', '')),
    },
  };
};

export default Home;
