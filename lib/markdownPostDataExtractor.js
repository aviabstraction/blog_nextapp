import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import marked from 'marked';

//Get Mardown Posts directory

export const getSortedPostsData = (slug) => {
  const markdownWithMetadata = fs
    .readFileSync(path.join('posts', slug + '.md'))
    .toString();

  const parsedMarkdown = matter(markdownWithMetadata);

  const htmlString = marked(parsedMarkdown.content);

  return {
    htmlString,
    data: parsedMarkdown.data,
  };
};
