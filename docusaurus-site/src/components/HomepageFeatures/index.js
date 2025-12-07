import clsx from 'clsx';
import Heading from '@theme/Heading';
import Link from '@docusaurus/Link';
import styles from './styles.module.css';

const FeatureList = [
  {
    title: '🤖 Learn Physical AI',
    icon: '⚙️',
    description: (
      <>
        Master the fundamentals of Physical AI by combining sensors, microcontrollers,
        and intelligent algorithms. Start with Arduino and Raspberry Pi basics,
        then progress to autonomous systems and cloud integration.
      </>
    ),
  },
  {
    title: '🎓 Hands-On Projects',
    icon: '🛠️',
    description: (
      <>
        Build real-world projects: temperature monitoring systems, autonomous robots
        with navigation, obstacle detection, cloud-connected IoT devices, and more.
        Learn by doing with both hardware and browser simulators.
      </>
    ),
  },
  {
    title: '☁️ Cloud Integration',
    icon: '📡',
    description: (
      <>
        Connect your devices to the cloud using MQTT and REST APIs. Build real-time
        dashboards, implement remote control, set up alerts, and scale your projects
        from single devices to entire IoT networks.
      </>
    ),
  },
  {
    title: '📚 Structured Learning',
    icon: '📖',
    description: (
      <>
        Follow our progressive curriculum: start with sensors and data collection,
        move to motor control and feedback systems, then advance to autonomous
        navigation and cloud connectivity.
      </>
    ),
  },
  {
    title: '🔧 Multiple Platforms',
    icon: '💻',
    description: (
      <>
        Work with Arduino, Raspberry Pi, or try our web-based simulator.
        Choose your preferred hardware stack or learn in your browser first.
        All examples work across platforms.
      </>
    ),
  },
  {
    title: '🚀 From Beginner to Expert',
    icon: '⭐',
    description: (
      <>
        Two complete modules with 8 lessons covering everything from basic sensor
        reading to advanced AI-powered autonomous systems. Includes safety guidelines,
        hardware compatibility guides, and troubleshooting resources.
      </>
    ),
  },
];

function Feature({ title, icon, description }) {
  return (
    <div className={clsx('col col--4')}>
      <div
        className={styles.featureCard}
      >
        <div className={styles.featureIcon}>{icon}</div>
        <Heading as="h3" className={styles.featureTitle}>
          {title}
        </Heading>
        <p className={styles.featureDescription}>
          {description}
        </p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">

        {/* Header */}
        <div className={styles.headerSection}>
          <Heading as="h2" className={styles.mainHeading}>
            🧠 Physical AI Learning Platform
          </Heading>
          <p className={styles.subheading}>
            Learn to build intelligent physical systems that sense, think, and act.
            From Arduino basics to cloud-connected autonomous robots.
          </p>
        </div>

        {/* CTA */}
        <div className={styles.ctaBox}>
          <Heading as="h3" className={styles.ctaTitle}>
            Ready to Build Intelligent Systems?
          </Heading>
          <p className={styles.ctaText}>
            Start with Module 1: Physical AI Fundamentals and learn sensors, data processing,
            motor control, and feedback systems.
          </p>

          <Link
            to="/docs/module-01-physical-ai-fundamentals/chapter-01-sensors-data/lesson-01-reading-sensors/"
            className={styles.ctaButton}
          >
            🚀 Start Learning Now →
          </Link>
        </div>

        {/* Feature Cards */}
        <div className="row" style={{ justifyContent: 'center' }}>
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>

      </div>
    </section>
  );
}
