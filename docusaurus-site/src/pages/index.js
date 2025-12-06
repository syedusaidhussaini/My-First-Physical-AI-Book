import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';

import Heading from '@theme/Heading';
import styles from './index.module.css';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className={styles.heroContent}>
        <div className={styles.heroEmoji}>🤖</div>
        <Heading as="h1" className={styles.heroTitle}>
          Physical AI Learning Platform
        </Heading>
        <p className={styles.heroSubtitle}>
          Learn to build intelligent physical systems that sense, think, and act.
          From Arduino basics to cloud-connected autonomous robots.
        </p>
        <div className={styles.buttons}>
          <Link
            className={clsx(styles.primaryButton, "button button--lg")}
            to="/docs/module-01-physical-ai-fundamentals/chapter-01-sensors-data/lesson-01-reading-sensors/">
            🚀 Start Learning Now
          </Link>
          <Link
            className={clsx(styles.secondaryButton, "button button--lg")}
            to="/docs/setup-guides/arduino-setup/">
            📖 Setup Guide
          </Link>
        </div>
        <p className={styles.heroNote}>
          💡 Choose your path: Browser Simulator | Arduino | Raspberry Pi
        </p>
      </div>
    </header>
  );
}

export default function Home() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={`Hello from ${siteConfig.title}`}
      description="Description will go into a meta tag in <head />">
      <HomepageHeader />
      <main>
        <HomepageFeatures />
      </main>
    </Layout>
  );
}
