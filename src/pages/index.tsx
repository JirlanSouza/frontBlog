import { GetStaticProps } from 'next';
import Header from '../components/Header';
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

export default function Home(): JSX.Element {
  return (
    <main className={styles.container}>
      <div className={commonStyles.container}>
        <div className={styles.logo}>
          <img src="logo.svg" alt="logo" />
        </div>

        <ul className={styles.posts}>
          <li>
            <h2>Teste</h2>
            <p>
              of letters, as opposed to using 'Content here, content here',
              making it look like readable English. Many desktop publishing
              packages and web page editors now use Lorem Ipsum as their default
              model text,
            </p>
            <div>
              <div>
                <FiCalendar />
                <span>04 Jun 2022</span>
              </div>
              <div>
                <FiUser />
                <span>Jirlan Souza</span>
              </div>
            </div>
          </li>
        </ul>

        <ul className={styles.posts}>
          <li>
            <h2>Teste</h2>
            <p>
              of letters, as opposed to using 'Content here, content here',
              making it look like readable English. Many desktop publishing
              packages and web page editors now use Lorem Ipsum as their default
              model text,
            </p>
            <div>
              <div>
                <FiCalendar />
                <span>04 Jun 2022</span>
              </div>
              <div>
                <FiUser />
                <span>Jirlan Souza</span>
              </div>
            </div>
          </li>
        </ul>

        <ul className={styles.posts}>
          <li>
            <h2>Teste</h2>
            <p>
              of letters, as opposed to using 'Content here, content here',
              making it look like readable English. Many desktop publishing
              packages and web page editors now use Lorem Ipsum as their default
              model text,
            </p>
            <div>
              <div>
                <FiCalendar />
                <span>04 Jun 2022</span>
              </div>
              <div>
                <FiUser />
                <span>Jirlan Souza</span>
              </div>
            </div>
          </li>
        </ul>

        <ul className={styles.posts}>
          <li>
            <h2>Teste</h2>
            <p>
              of letters, as opposed to using 'Content here, content here',
              making it look like readable English. Many desktop publishing
              packages and web page editors now use Lorem Ipsum as their default
              model text,
            </p>
            <div>
              <div>
                <FiCalendar />
                <span>04 Jun 2022</span>
              </div>
              <div>
                <FiUser />
                <span>Jirlan Souza</span>
              </div>
            </div>
          </li>
        </ul>

        <ul className={styles.posts}>
          <li>
            <h2>Teste</h2>
            <p>
              of letters, as opposed to using 'Content here, content here',
              making it look like readable English. Many desktop publishing
              packages and web page editors now use Lorem Ipsum as their default
              model text,
            </p>
            <div>
              <div>
                <FiCalendar />
                <span>04 Jun 2022</span>
              </div>
              <div>
                <FiUser />
                <span>Jirlan Souza</span>
              </div>
            </div>
          </li>
        </ul>

        <ul className={styles.posts}>
          <li>
            <h2>Teste</h2>
            <p>
              of letters, as opposed to using 'Content here, content here',
              making it look like readable English. Many desktop publishing
              packages and web page editors now use Lorem Ipsum as their default
              model text,
            </p>
            <div>
              <div>
                <FiCalendar />
                <span>04 Jun 2022</span>
              </div>
              <div>
                <FiUser />
                <span>Jirlan Souza</span>
              </div>
            </div>
          </li>
        </ul>

        <button type="button" className={styles.paginatorButton}>
          Carregar mais posts
        </button>
      </div>
    </main>
  );
}

// export const getStaticProps = async () => {
//   // const prismic = getPrismicClient({});
//   // const postsResponse = await prismic.getByType(TODO);

//   // TODO
// };
