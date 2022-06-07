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
  return (
    <>
      <Header />
      <main>
        <h2>{post.data.title}</h2>
        <div>
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
            <span>4 min</span>
          </div>
        </div>

        {post.data.content.map(content => {
          return (
            <div key={content.heading}>
              <h4>{content.heading}</h4>
              {content.body.map(body => {
                return <p key={content.heading}>{body.text}</p>;
              })}
            </div>
          );
        })}
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
