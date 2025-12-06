// @ts-check

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.

 @type {import('@docusaurus/plugin-content-docs').SidebarsConfig}
 */
const sidebars = {
  // Physical AI Book hierarchy
  tutorialSidebar: [
    {
      type: 'category',
      label: 'Module 1: Physical AI Fundamentals',
      items: [
        {
          type: 'category',
          label: 'Chapter 1: Sensors and Data Collection',
          items: [
            'module-01-physical-ai-fundamentals/chapter-01-sensors-data/lesson-01-reading-sensors/lesson-01-reading-sensors',
            'module-01-physical-ai-fundamentals/chapter-01-sensors-data/lesson-02-filtering-data/lesson-02-filtering-data',
          ],
        },
        {
          type: 'category',
          label: 'Chapter 2: Control and Actuators',
          items: [
            'module-01-physical-ai-fundamentals/chapter-02-control-actuators/lesson-01-motor-control/lesson-01-motor-control',
            'module-01-physical-ai-fundamentals/chapter-02-control-actuators/lesson-02-servo-control/lesson-02-servo-control',
          ],
        },
      ],
    },
    {
      type: 'category',
      label: 'Module 2: Advanced Physical AI Projects',
      items: [
        {
          type: 'category',
          label: 'Chapter 1: Autonomous Systems and Navigation',
          items: [
            'module-02-advanced-projects/chapter-01-navigation/lesson-01-robot-navigation/lesson-01-robot-navigation',
            'module-02-advanced-projects/chapter-01-navigation/lesson-02-obstacle-detection/lesson-02-obstacle-detection',
          ],
        },
        {
          type: 'category',
          label: 'Chapter 2: Cloud Integration and IoT',
          items: [
            'module-02-advanced-projects/chapter-02-cloud-iot/lesson-01-cloud-integration/lesson-01-cloud-integration',
            'module-02-advanced-projects/chapter-02-cloud-iot/lesson-02-remote-control/lesson-02-remote-control',
          ],
        },
      ],
    },
    {
      type: 'category',
      label: 'Setup Guides',
      items: [
        'setup-guides/arduino-setup',
        'setup-guides/raspberry-pi-setup',
        'setup-guides/simulator-setup',
        'setup-guides/troubleshooting',
      ],
    },
    {
      type: 'category',
      label: 'Resources',
      items: [
        'resources/glossary',
        'resources/hardware-compatibility',
        'resources/safety-guidelines',
        'resources/further-reading',
      ],
    },
  ],
};

export default sidebars;
