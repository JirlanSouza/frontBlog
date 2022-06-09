import { format } from 'date-fns';
import { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import { RichText } from 'prismic-dom';
import { FiCalendar, FiClock, FiUser } from 'react-icons/fi';
import Header from '../../components/Header';

import { getPrismicClient } from '../../services/prismic';

import commonStyles from '../../styles/common.module.scss';
import styles from './post.module.scss';

interface Post {
  first_publication_date: string | null;
  data: {
    title: string;
    banner: {
      url: string;
    };
    author: string;
    content: {
      heading: string;
      body: {
        text: string;
      }[];
    }[];
  };
}

interface PostProps {
  post: Post;
}

export default function Post({ post }: PostProps): JSX.Element {
  const router = useRouter();

  if (router.isFallback) {
    return <div>Carregando...</div>;
  }

  function calcTimeRead(): number {
    const wordsAmount = post.data.content.reduce((acc, content) => {
      const contentWords = content.body.reduce((accBody, body) => {
        const bodyWords = body.text.split(' ');

        return accBody + bodyWords.length;
      }, 0);

      return acc + contentWords;
    }, 0);

    const readTime = Math.ceil(wordsAmount / 200);

    return readTime;
  }

  return (
    <>
      <Header />
      <main className={styles.container}>
        <div className={commonStyles.container}>
          <h2 className={styles.title}>{post.data.title}</h2>
          <div className={styles.info}>
            <div>
              <FiCalendar />
              <span>
                {format(new Date(post.first_publication_date), 'dd MMM yyyy')}
              </span>
            </div>
            <div>
              <FiUser />
              <span>{post.data.author}</span>
            </div>
            <div>
              <FiClock />
              <span>{calcTimeRead()} min</span>
            </div>
          </div>

          {post.data.content.map(content => {
            return (
              <article key={content.heading} className={styles.content}>
                <h4>{content.heading}</h4>
                {content.body.map(body => {
                  return <p key={body.text.length}>{body.text}</p>;
                })}
              </article>
            );
          })}
        </div>
      </main>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const prismic = getPrismicClient({});
  const postsResponse = await prismic.getByType('post', { pageSize: 2 });

  const staticPaths = postsResponse.results.map(post => {
    return {
      params: {
        slug: post.uid,
      },
    };
  });

  return {
    paths: staticPaths,
    fallback: true,
  };
};

function getText(text): string {
  const isText = typeof text === 'string';
  return isText ? text : text[0].text;
}

function getHeadingText(data): string {
  if (typeof data === 'string') return data;
  return data[0].text;
}

export const getStaticProps: GetStaticProps<PostProps> = async ({ params }) => {
  const { slug } = params as { slug: string };
  const prismic = getPrismicClient({});
  const response = await prismic.getByUID('post', slug);

  const pm = new Promise((resolve, reject) => {
    setTimeout(resolve, 5000);
  });

  const post = {
    uid: response.uid,
    first_publication_date: response.first_publication_date,
    data: {
      title: getText(response.data.title),
      subtitle: getText(response.data.subtitle),
      banner: {
        url: response.data.banner.url,
      },
      author: getText(response.data.author),
      content: response.data.content.map(content => {
        return {
          heading: getHeadingText(content.heading),
          body: content.body,
        };
      }),
    },
  };

  return {
    props: { post },
  };
};
