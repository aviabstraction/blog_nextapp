import { Fragment, useEffect, useState } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import Layout from '../components/layout/Layout';
import Axios from 'axios';

// All Routes are displayed in pages folder
// Everything inside pages folder should be default export

//Slugs Definition - stackoverflow
// Slug is used to make a name that is not acceptable for various
// reasons - e.g. containing special characters, too long, mixed-case,
// etc. - appropriate for the target usage. What target usage means is context dependent,
//but in general case slug is a more appropriate combination of other fields. In the above case,
// only one field is used - title.

const FakeRestAPI = (props) => {
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await Axios.get(
          'http://jsonplaceholder.typicode.com/photos?_start=0&_limit=5'
        );
        setData(data.data);
      } catch (err) {
        console.log('Network error', err);
      }
    };
    fetchPosts();
  }, []);

  return (
    <Fragment>
      <Head>
        <title>Rest API</title>
        <meta name="description" content="blog app created using next js" />
        <meta ame="og:title" content="Blog App" />
      </Head>
      <Layout>
        <div>
          {data &&
            data.map((post, index) => {
              return (
                <div style={{ paddingBottom: '25px' }}>
                  <div>Title:{post.title}</div>
                  <div>Url: {post.url}</div>
                  <a>Thumbnail: {post.thumbnailUrl}</a>
                  <Link href="/">
                    <button>go back</button>
                  </Link>
                </div>
              );
            })}
        </div>
      </Layout>
    </Fragment>
  );
};

export default FakeRestAPI;
