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

function Feature({title, icon, description}) {
  return (
    <div className={clsx('col col--4')}>
      <div className={clsx(styles.feature)}>
        <div className="text--center" style={{ fontSize: '48px', marginBottom: '1rem' }}>
          {icon}
        </div>
        <div className="text--center padding-horiz--md">
          <Heading as="h3" style={{ color: '#1e90ff', fontSize: '1.25rem' }}>
            {title}
          </Heading>
          <p style={{ color: '#666', lineHeight: '1.6' }}>
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <Heading as="h2" style={{ color: '#1e90ff', fontSize: '2.5rem', marginBottom: '1rem' }}>
            🧠 Physical AI Learning Platform
          </Heading>
          <p style={{ fontSize: '1.125rem', color: '#555', maxWidth: '600px', margin: '0 auto' }}>
            Learn to build intelligent physical systems that sense, think, and act.
            From Arduino basics to cloud-connected autonomous robots.
          </p>
        </div>

        {/* CTA Section at Top */}
        <div style={{
          marginBottom: '3rem',
          padding: '2rem',
          background: 'linear-gradient(135deg, #1e90ff 0%, #4fa3ff 100%)',
          borderRadius: '8px',
          textAlign: 'center',
          color: 'white'
        }}>
          <Heading as="h3" style={{ color: 'white', marginBottom: '1rem' }}>
            Ready to Build Intelligent Systems?
          </Heading>
          <p style={{ fontSize: '1.125rem', marginBottom: '1.5rem', opacity: 0.95 }}>
            Start with Module 1: Physical AI Fundamentals and learn sensors, data processing,
            motor control, and feedback systems.
          </p>
          <Link
            to="/docs/module-01-physical-ai-fundamentals/chapter-01-sensors-data/lesson-01-reading-sensors/"
            style={{
              display: 'inline-block',
              padding: '14px 35px',
              background: 'white',
              color: '#1e90ff',
              textDecoration: 'none',
              borderRadius: '8px',
              fontWeight: 'bold',
              fontSize: '1.1rem',
              transition: 'all 0.3s ease',
              cursor: 'pointer',
              boxShadow: '0 8px 16px rgba(0,0,0,0.2)'
            }}
          >
            🚀 Start Learning Now →
          </Link>
        </div>

        {/* Feature Cards - Centered */}
        <div className="row" style={{ justifyContent: 'center' }}>
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
