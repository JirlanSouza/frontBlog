import { useState } from 'react';
import { GetStaticProps } from 'next';
import Link from 'next/link';
import { format } from 'date-fns';
import { FiCalendar, FiUser } from 'react-icons/fi';

import { getPrismicClient } from '../services/prismic';

import commonStyles from '../styles/common.module.scss';
import styles from './home.module.scss';

interface Post {
  uid?: string;
  first_publication_date: string | null;
  data: {
    title: string;
    subtitle: string;
    author: string;
  };
}

interface PostPagination {
  next_page: string;
  results: Post[];
}

interface HomeProps {
  postsPagination: PostPagination;
}

function getText(text): string {
  const isText = typeof text === 'string';
  return isText ? text : text[0].text;
}

function parsePostsPagination(postsResponse): PostPagination {
  const posts = postsResponse.results.map(post => {
    return {
      uid: post.uid,
      data: {
        title: getText(post.data.title),
        subtitle: getText(post.data.subtitle),
        author: getText(post.data.author),
      },
      first_publication_date: post.first_publication_date,
    };
  });

  return {
    next_page: postsResponse.next_page,
    results: posts,
  };
}

export default function Home({
  postsPagination: postsPaginationProps,
}: HomeProps): JSX.Element {
  const [postsPagination, setPostsPagination] = useState(postsPaginationProps);

  async function getNextPage(): Promise<void> {
    // eslint-disable-next-line no-useless-return
    if (!postsPagination.next_page) return;

    const response = await fetch(postsPagination.next_page);
    const postsResponse = await response.json();

    const pagination = parsePostsPagination(postsResponse);
    setPostsPagination({
      next_page: pagination.next_page,
      results: [...postsPagination.results, ...pagination.results],
    });
  }

  return (
    <main className={styles.container}>
      <div className={commonStyles.container}>
        <div className={styles.logo}>
          <img src="logo.svg" alt="logo" />
        </div>
        {postsPagination.results.map(post => {
          return (
            <ul key={post.uid} className={styles.posts}>
              <li>
                <Link href={`/post/${post.uid}`}>
                  <h2>{post.data.title}</h2>
                </Link>
                <p>{post.data.subtitle}</p>
                <div>
                  <div>
                    <FiCalendar />
                    <span>
                      {format(
                        new Date(post.first_publication_date),
                        'd MMM yyyy'
                      )}
                    </span>
                  </div>
                  <div>
                    <FiUser />
                    <span>{post.data.author}</span>
                  </div>
                </div>
              </li>
            </ul>
          );
        })}

        {postsPagination.next_page && (
          <button
            type="button"
            className={styles.paginatorButton}
            onClick={getNextPage}
          >
            Carregar mais posts
          </button>
        )}
      </div>
    </main>
  );
}

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  const prismic = getPrismicClient({});
  const postsResponse = await prismic.getByType('post', { pageSize: 2 });
  const postsPagination = parsePostsPagination(postsResponse);

  return {
    props: {
      postsPagination,
    },
  };
};
