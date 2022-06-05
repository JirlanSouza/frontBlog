import Link from 'next/link';

import styles from './header.module.scss';

export default function Header(): JSX.Element {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link href="/">
          <img src="logo.svg" alt="logo" />
        </Link>
      </div>
    </header>
  );
}
