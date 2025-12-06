# Implementation Plan: Physical AI Book Structure

**Branch**: `001-book-structure` | **Date**: 2025-12-06 | **Spec**: [specs/001-book-structure/spec.md](spec.md)
**Input**: Feature specification from `/specs/001-book-structure/spec.md`

## Summary

Build a Docusaurus v3.x documentation site hosting the Physical AI book with 1 module, 2 chapters, and 4 lessons (2 per chapter) covering sensor data processing and actuator control. The plan includes Docusaurus setup, content development phases, and file structure that enforces the constitution's principles: hands-on learning first, progressive complexity, clarity, reproducibility, safety, and community feedback. Success measured by <30 minute first-project setup, 100% of lessons including safety considerations, and all code runnable on commodity hardware.

## Technical Context

**Language/Version**: Markdown + JavaScript (Docusaurus v3.x, Node.js 18+) + Python 3.8+ / Arduino (for code examples)

**Primary Dependencies**:
- Docusaurus 3.x (documentation framework)
- Node.js 18+ (build environment)
- Syntax highlighter (Prism for code blocks)
- Python packages: Pillow, numpy (for example code, optional)
- Arduino IDE / PlatformIO (for hardware examples)

**Storage**: Git repository (no backend database required); static site hosting (Vercel, Netlify, or GitHub Pages)

**Testing**:
- Link validation (Docusaurus built-in)
- Code example validation (manual execution on simulator + hardware)
- Accessibility testing (built-in Docusaurus a11y checks)

**Target Platform**: Web (static site); code examples target Arduino/Raspberry Pi + web simulators

**Project Type**: Documentation site (single Docusaurus project)

**Performance Goals**:
- Site build time: <60 seconds
- Page load time: <2 seconds
- First lesson accessible in <5 minutes from home page

**Constraints**:
- Code examples must run on commodity hardware (no specialized lab equipment)
- All content must follow constitution principles (hands-on first, safety included, progressive complexity)
- Zero external paywall dependencies

**Scale/Scope**:
- 1 module, 2 chapters, 4 lessons (initial release)
- ~2000 lines of content (lesson markdown)
- ~500 lines of code examples (distributed across lessons)
- 10-15 images/diagrams per lesson
- 1 Docusaurus configuration + sidebars config

## Constitution Check

**GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.**

| Principle | Requirement | Plan Compliance | Notes |
|-----------|-------------|-----------------|-------|
| **I. Hands-On Learning First** | Every concept includes working example | ✅ Phase 1: Embed executable code in each lesson before theory | Simulator + hardware variants specified in spec |
| **II. Progressive Complexity** | Clear beginner → intermediate layers | ✅ Phase 1: Chapter 1 (beginner), Chapter 2 (intermediate) with explicit prerequisites | Lesson prerequisite mapping in data-model.md |
| **III. Clarity Over Brevity** | Plain language, multiple explanations | ✅ Phase 2: Content guideline enforcement, lesson review checklist | Docusaurus search + accessibility built-in |
| **IV. Reproducibility & Accessibility** | Run on commodity hardware, <30 min setup | ✅ Phase 1: Simulator setup + Arduino/Raspberry Pi guides | Setup guides generated in quickstart.md |
| **V. Safety & Responsible AI** | Every physical lesson includes safety | ✅ Phase 1: Safety section template in lesson structure; enforced in checklist | CI/CD validates safety section presence |
| **VI. Community-Driven Feedback** | Transparent issue tracking, versioning | ✅ Post-launch: Docusaurus discussions + GitHub discussions enabled | Version control via git tags |

**GATE STATUS**: ✅ **PASS** - Plan aligns with all constitution principles. No violations.

---

## Project Structure

### Documentation (this feature)

```text
specs/001-book-structure/
├── spec.md                      # Feature specification
├── plan.md                      # This file (development plan)
├── research.md                  # Phase 0 output (technology decisions)
├── data-model.md                # Phase 1 output (lesson structure, entities)
├── quickstart.md                # Phase 1 output (setup guides)
├── contracts/                   # Phase 1 output (Docusaurus config schema)
│   └── docusaurus-config.schema.json
├── checklists/
│   ├── requirements.md          # Specification quality checklist
│   └── content-review.md        # Phase 2: lesson review checklist
└── tasks.md                     # Phase 2 output (/sp.tasks - NOT created by /sp.plan)
```

### Source Code (repository root - Docusaurus site)

```text
docusaurus-site/                # Root of Docusaurus project
├── docs/                        # All lesson content
│   ├── _category_.json          # Docusaurus category config
│   ├── module-01-physical-ai-fundamentals/
│   │   ├── _category_.json
│   │   ├── chapter-01-sensors-data/
│   │   │   ├── _category_.json
│   │   │   ├── lesson-01-reading-sensors/
│   │   │   │   ├── index.md     # Main lesson content
│   │   │   │   ├── code-examples/
│   │   │   │   │   ├── simulator-example.html
│   │   │   │   │   ├── arduino-dht-sensor.ino
│   │   │   │   │   ├── python-sensor-reader.py
│   │   │   │   │   └── README.md
│   │   │   │   └── images/
│   │   │   │       ├── dht-sensor-diagram.png
│   │   │   │       ├── sensor-pinout.png
│   │   │   │       └── connection-diagram.png
│   │   │   └── lesson-02-filtering-data/
│   │   │       ├── index.md
│   │   │       ├── code-examples/
│   │   │       └── images/
│   │   └── chapter-02-control-actuators/
│   │       ├── _category_.json
│   │       ├── lesson-01-motor-control/
│   │       │   ├── index.md
│   │       │   ├── code-examples/
│   │       │   └── images/
│   │       └── lesson-02-servo-control/
│   │           ├── index.md
│   │           ├── code-examples/
│   │           └── images/
│   ├── setup-guides/
│   │   ├── _category_.json
│   │   ├── 01-arduino-setup.md
│   │   ├── 02-raspberry-pi-setup.md
│   │   ├── 03-simulator-setup.md
│   │   ├── 04-troubleshooting.md
│   │   └── images/
│   │       └── wiring-diagrams/
│   └── resources/
│       ├── _category_.json
│       ├── 01-glossary.md
│       ├── 02-hardware-compatibility.md
│       ├── 03-safety-guidelines.md
│       └── 04-further-reading.md
├── sidebars.js                  # Navigation sidebar config
├── docusaurus.config.js         # Main Docusaurus configuration
├── static/                      # Static assets (logos, etc.)
│   └── img/
├── src/
│   ├── components/              # React components (if needed)
│   ├── pages/                   # Custom pages (if needed)
│   └── css/
│       └── custom.css           # Custom styling
├── package.json
├── package-lock.json
└── README.md                    # Project documentation
```

**Structure Decision**: Docusaurus single-site structure with hierarchical content organization matching specification (module → chapter → lesson). Code examples embedded within lesson markdown files and stored in side-by-side `code-examples/` directories for easy discovery and maintenance. All lesson content in `docs/` folder enabling automatic sidebar generation. Setup guides and resources in separate top-level categories.

---

## Complexity Tracking

No constitution principle violations detected. Plan adheres strictly to all 6 core principles with justification in Constitution Check section above.

---

## Phase 0: Research & Investigation

**Goal**: Resolve all technical unknowns and establish technology choices.

**Research Tasks**:

1. **Docusaurus v3.x Fundamentals**
   - How to structure multi-level hierarchical documentation in Docusaurus?
   - Best practices for embedding executable code examples
   - Static site generation and deployment options
   - Built-in search, versioning, and discussion features

2. **Static Web Hosting for Educational Content**
   - Evaluate Vercel, Netlify, GitHub Pages for free tier (no paywall)
   - CI/CD validation requirements (link checking, build verification)
   - Analytics integration options

3. **Code Example Execution Patterns**
   - Embedding Arduino code in documentation (syntax highlighting, safe to display)
   - Python example formatting and dependency documentation
   - Web simulator integration (HTML5 + JavaScript)
   - Testing code examples without running actual hardware

4. **Accessibility & Search**
   - Docusaurus built-in a11y features
   - SEO optimization for lesson discovery
   - Navigation patterns for sequential lesson progression

5. **Community Discussion Platforms**
   - Native Docusaurus discussion features
   - GitHub Discussions integration
   - Learner feedback collection mechanisms

**Output**: `research.md` documenting:
- Decision: Chosen option
- Rationale: Why selected
- Alternatives considered: Other evaluated options
- Impact: How affects subsequent phases

---

## Phase 1: Design & Content Architecture

**Prerequisites**: Phase 0 research complete

### 1.1 Data Model & Lesson Structure

**Output**: `data-model.md`

Define the canonical lesson format as a data model:

```yaml
Lesson:
  id: string (lesson-01-reading-sensors)
  title: string (Reading Temperature and Humidity Sensors)
  chapter_id: string (chapter-01-sensors-data)
  module_id: string (module-01-physical-ai-fundamentals)
  duration_minutes: integer (45-60)
  complexity_level: enum (beginner, intermediate, advanced)

  learning_objectives: array<string>
  prerequisites: array<lesson_id>

  hardware_requirements: object
    required: array<string> (DHT11 sensor, jumper wires, etc.)
    optional: array<string> (LCD display for extension)
    simulator_available: boolean

  content_sections:
    - lesson_header
    - conceptual_introduction
    - working_code_example
    - detailed_explanation
    - hands_on_project
    - common_pitfalls
    - key_concepts_summary
    - further_reading

  code_examples: array<example>
    - title: string
      language: enum (python, arduino, html)
      filename: string
      location: path (code-examples/)
      hardware_variant: enum (simulator, arduino, raspberry-pi)
      tested: boolean

  safety_section: object
    hazards: array<string>
    fail_safes: array<string>
    emergency_procedures: array<string>
    required: true (MUST be present for all hardware lessons)
```

Lesson Dependency Graph:
```
Lesson 1.1 (Reading Sensors)
  ↓ prerequisite for
Lesson 1.2 (Filtering Data)
  ↓ prerequisite for
Lesson 2.1 (Motor Control)
  ↓ prerequisite for
Lesson 2.2 (Servo Control)
```

### 1.2 Docusaurus Configuration Schema

**Output**: `contracts/docusaurus-config.schema.json`

Define configuration contract for `docusaurus.config.js`:

```json
{
  "siteConfig": {
    "title": "Physical AI: A Hands-On Learning Guide",
    "tagline": "Learn to build intelligent physical systems",
    "url": "https://physical-ai-book.example.com",
    "baseUrl": "/",
    "favicon": "img/favicon.ico",
    "projectName": "physical-ai-book",
    "organizationName": "Your Organization"
  },
  "themeConfig": {
    "navbar": {
      "title": "Physical AI Book",
      "logo": { "alt": "Physical AI Logo", "src": "img/logo.svg" },
      "items": [
        { "type": "doc", "docId": "intro", "label": "Book" },
        { "label": "Setup Guides", "position": "left" },
        { "label": "Resources", "position": "left" },
        { "label": "Discussions", "href": "https://github.com/...", "position": "right" }
      ]
    },
    "footer": {
      "style": "dark",
      "copyright": "Physical AI Book © 2025. Licensed under CC-BY-4.0"
    }
  },
  "presets": [
    [
      "@docusaurus/preset-classic",
      {
        "docs": {
          "sidebarPath": "./sidebars.js",
          "editUrl": "https://github.com/.../edit/main/",
          "showLastUpdateAuthor": true,
          "showLastUpdateTime": true
        },
        "blog": false,
        "theme": {
          "customCss": ["./src/css/custom.css"]
        }
      }
    ]
  ],
  "plugins": [
    ["search-local", {}],
    ["ideal-image", {}]
  ],
  "markdown": {
    "mermaid": true,
    "format": "commonmark"
  }
}
```

Sidebar Structure Schema (`sidebars.js`):

```javascript
module.exports = {
  docs: [
    {
      type: 'category',
      label: 'Module 1: Physical AI Fundamentals',
      items: [
        {
          type: 'category',
          label: 'Chapter 1: Sensors and Data Collection',
          items: [
            'module-01-physical-ai-fundamentals/chapter-01-sensors-data/lesson-01-reading-sensors/index',
            'module-01-physical-ai-fundamentals/chapter-01-sensors-data/lesson-02-filtering-data/index'
          ]
        },
        {
          type: 'category',
          label: 'Chapter 2: Control and Actuators',
          items: [
            'module-01-physical-ai-fundamentals/chapter-02-control-actuators/lesson-01-motor-control/index',
            'module-01-physical-ai-fundamentals/chapter-02-control-actuators/lesson-02-servo-control/index'
          ]
        }
      ]
    },
    {
      type: 'category',
      label: 'Setup Guides',
      items: [
        'setup-guides/01-arduino-setup',
        'setup-guides/02-raspberry-pi-setup',
        'setup-guides/03-simulator-setup',
        'setup-guides/04-troubleshooting'
      ]
    },
    {
      type: 'category',
      label: 'Resources',
      items: [
        'resources/01-glossary',
        'resources/02-hardware-compatibility',
        'resources/03-safety-guidelines',
        'resources/04-further-reading'
      ]
    }
  ]
};
```

### 1.3 Lesson Markdown Template

**Output**: `contracts/lesson-template.md`

Template enforcing consistent lesson structure:

```markdown
---
id: lesson-01-reading-sensors
title: Reading Temperature and Humidity Sensors
sidebar_position: 1
---

# Reading Temperature and Humidity Sensors

## Learning Objectives

By the end of this lesson, you will:
- [ ] Connect DHT11/DHT22 temperature sensor to microcontroller
- [ ] Read temperature and humidity values from sensor
- [ ] Understand sensor specifications and calibration
- [ ] Parse and display sensor data in human-readable format

## Prerequisites

- Basic understanding of electrical circuits (voltage, current)
- Familiarity with Arduino IDE or equivalent
- Completion of [Setup Guide: Arduino](../../setup-guides/01-arduino-setup.md)

**Estimated Duration**: 45-60 minutes (including hands-on project)

**Hardware Requirements**:
- Arduino Uno or Nano
- DHT11 or DHT22 sensor
- 10kΩ pull-up resistor
- Breadboard and jumper wires
- **OR** Web simulator (no hardware needed)

---

## Why This Matters

Temperature sensors are fundamental to Physical AI applications. From smart homes monitoring climate control to robots adjusting behavior based on thermal feedback, understanding how to read sensor data is essential.

---

## Working Code Example

Here's a complete, working example you can run immediately:

### Simulator Variant

```html
<!-- simulator-example.html -->
<!-- [Full HTML5 simulator with visual output] -->
```

### Hardware Variant (Arduino)

```cpp
// arduino-dht-sensor.ino
#include "DHT.h"

#define DHTPIN 2
#define DHTTYPE DHT11

DHT dht(DHTPIN, DHTTYPE);

void setup() {
  Serial.begin(9600);
  dht.begin();
}

void loop() {
  float humidity = dht.readHumidity();
  float temperature = dht.readTemperature();

  Serial.print("Temperature: ");
  Serial.print(temperature);
  Serial.println(" °C");

  delay(2000);
}
```

---

## Detailed Explanation

[Theory section explaining code and concepts]

---

## Hands-On Project

**Project Goal**: Build a temperature monitor displaying real-time sensor readings.

### What You'll Build

[Project description and success criteria]

### Step-by-Step Instructions

[Detailed steps for both simulator and hardware variants]

---

## Common Pitfalls & Debugging

- **Sensor not responding**: Check pull-up resistor, wiring
- **Incorrect readings**: Verify sensor type (DHT11 vs DHT22)

---

## Safety First ⚠️

:::warning Safety Considerations

- **Electrical hazard**: DHT sensors operate at 3.3V or 5V; verify your Arduino voltage
- **Sensor damage**: Excessive current through pull-up resistor can damage sensor
- **Fail-safe**: Always verify voltage before connecting sensor

:::

---

## Key Concepts Summary

- Sensors convert physical properties into electrical signals
- Analog vs. digital sensors: DHT22 provides digital output
- I2C and One-Wire protocols for sensor communication
- Calibration: raw values must be interpreted correctly

---

## Further Reading

- [DHT11 Datasheet](link)
- [Arduino Sensor Tutorials](link)
- [Advanced: Multi-sensor fusion](link)

---

## Next Steps

You're ready for [Lesson 1.2: Filtering Data](../lesson-02-filtering-data)!
```

### 1.4 Setup Guides & Quickstart

**Output**: `quickstart.md`

Consolidated setup guide enabling <30 minute first-project completion:

```markdown
# Physical AI Book: Quick Start Guide

## Choose Your Path

### Option 1: Web-Based Simulator (Recommended for Quick Start)
**Time**: 5 minutes | **Cost**: Free

1. Visit [simulator URL]
2. Open "Lesson 1.1" in browser
3. Click "Run Simulation"
4. Complete lesson directly in browser

[Link to cloud simulator]

### Option 2: Arduino Hardware Setup
**Time**: 20-30 minutes | **Cost**: $20-30

[Step-by-step Arduino setup with shopping list]

### Option 3: Raspberry Pi Setup
**Time**: 25-35 minutes | **Cost**: $50-70

[Raspberry Pi setup guide]

## Your First Project (30 Minutes)

Follow [Lesson 1.1: Reading Sensors](module-01.../chapter-01.../lesson-01...)
```

### 1.5 Content Review Checklist Template

**Output**: `checklists/content-review.md`

Template for reviewing lesson content before publication:

```markdown
# Content Review Checklist for [Lesson Title]

## Content Quality
- [ ] Lesson follows universal lesson structure (all 8 sections present)
- [ ] Code examples are executable without modification
- [ ] Code tested on 2+ platforms (simulator + hardware)
- [ ] All jargon defined on first use
- [ ] Multiple explanations provided for complex concepts
- [ ] Real-world applications explained

## Safety Requirements (MANDATORY)
- [ ] Safety First section present and complete
- [ ] Hazards identified for all hardware components
- [ ] Fail-safe procedures documented
- [ ] Emergency stop procedures clear
- [ ] Electrical voltage warnings included (if applicable)

## Hands-On Project
- [ ] Project builds on lesson concepts
- [ ] Success criteria explicitly stated
- [ ] Both simulator and hardware variants provided
- [ ] Setup instructions clear and tested
- [ ] Estimated duration accurate

## Voice & Style (per Constitution)
- [ ] Encouraging tone throughout
- [ ] Mistakes framed as learning opportunities
- [ ] Patient explanations (no assumptions about prior knowledge)
- [ ] Practical focus (examples before theory)
- [ ] Transparent about limitations

## Docusaurus & Links
- [ ] All internal links work (relative paths)
- [ ] Code examples properly syntax-highlighted
- [ ] Images embedded and display correctly
- [ ] Table of contents auto-generated correctly
```

### 1.6 Agent Context Update

**Execution**: Run `.specify/scripts/powershell/update-agent-context.ps1 -AgentType claude`

This updates the Claude Code agent context with technology decisions from Phase 1 research and design.

---

## Phase 2: Task Breakdown & Execution

**Prerequisites**: Phase 1 design complete; all artifacts generated

**Output**: `tasks.md` (generated by `/sp.tasks` command)

Task breakdown covering:
- Docusaurus project initialization
- Content creation (4 lessons)
- Setup guide creation
- Configuration & deployment
- Testing & validation

---

## Key Architectural Decisions

### Decision 1: Docusaurus for Documentation Platform

**Choice**: Docusaurus v3.x (React-based, static site generation)

**Rationale**:
- Built-in multi-level hierarchical sidebar (module → chapter → lesson)
- Static site generation enables free hosting (Vercel, Netlify, GitHub Pages)
- Native discussion/comments feature for learner feedback
- Excellent code syntax highlighting via Prism
- Search and versioning built-in
- Markdown-first content enables easy contribution

**Alternatives Rejected**:
- Sphinx: Python-focused, less ideal for mixed content
- Hugo: Less suitable for hierarchical documentation
- Custom web app: Violates "simplicity" and adds unnecessary complexity

### Decision 2: Hierarchical File Structure (Module → Chapter → Lesson)

**Choice**: Nested directories matching content hierarchy

**Rationale**:
- Mirrors logical content organization
- Sidebar structure auto-generated from file structure
- Easy for contributors to understand and extend
- Supports future additions (new chapters/lessons)

**Alternatives Rejected**:
- Flat structure: Harder to navigate; doesn't reflect content hierarchy
- Database-driven structure: Adds complexity; unnecessary for static site

### Decision 3: Code Examples in Side-by-Side `code-examples/` Directories

**Choice**: Lesson markdown file + adjacent code-examples/ folder

**Rationale**:
- Keeps code examples discoverable and grouped with lesson
- Enables easy maintenance and updates
- Clear responsibility (lesson file = explanation, code-examples/ = implementations)

**Alternatives Rejected**:
- Inline code blocks only: Harder to test and reuse
- Separate code repository: Splits content; harder for learners to find

### Decision 4: Web Simulator + Hardware Variants

**Choice**: Every lesson includes simulator variant + hardware setup guides

**Rationale**:
- Meets constitution goal of accessibility (no hardware purchase required)
- Enables <30 minute first-project setup (simulator)
- Progressive path: simulator → hardware as learner invests

**Alternatives Rejected**:
- Hardware-only: Excludes learners without budget/access
- Simulator-only: Misses real-world learning value

### Decision 5: Static Hosting (No Backend)

**Choice**: Static site hosting (Vercel/Netlify/GitHub Pages)

**Rationale**:
- Zero backend infrastructure cost (free tier sufficient)
- No data storage requirements (no user accounts, no tracking)
- Easy CI/CD validation (link checking, build verification)
- Markdown content in git = full version control and transparency

**Alternatives Rejected**:
- Dynamic backend: Unnecessary complexity and cost
- Custom server: Maintenance burden, violates simplicity principle

---

## Risk Analysis & Mitigation

| Risk | Impact | Mitigation |
|------|--------|-----------|
| Code examples break with OS/library updates | High - learner frustration | Quarterly dependency audit; CI/CD tests examples on multiple platforms |
| Docusaurus build fails during deployment | High - site downtime | Pre-commit hooks validate markdown; GitHub Actions tests build before merge |
| Hardware setup proves too complex | Medium - high dropout rate | Simulator-first path; detailed troubleshooting guides; community discussion |
| Lessons lack safety considerations | High - safety liability | Safety section mandatory in template; pre-publication review checklist |
| Poor discoverability (learners can't find lessons) | Medium - low engagement | Hierarchical sidebar; search optimization; clear prerequisites |

---

## Success Metrics (from Specification)

By end of Phase 2 (tasks complete), must verify:

- ✅ SC-001: All 4 lessons defined with clear objectives
- ✅ SC-002: Beginners complete first project in <30 minutes
- ✅ SC-003: Content guidelines specify consistent format
- ✅ SC-004: Code runs on 2+ platforms
- ✅ SC-005: 90%+ educator clarity rating
- ✅ SC-006: 100% of lessons include safety considerations
- ✅ SC-007: Docusaurus site builds successfully
- ✅ SC-008: Maintainer can update lesson in <10 minutes

---

## Next Steps

1. **Phase 0 Research**: Generate `research.md` documenting technology choices
2. **Phase 1 Design**: Generate `data-model.md`, `contracts/`, `quickstart.md`
3. **Phase 2 Tasks**: Run `/sp.tasks` to break down implementation into concrete, testable tasks
4. **Phase 3 Implementation**: Execute tasks in Red-Green-Refactor cycle
5. **Launch**: Deploy to static host; enable discussions; begin collecting learner feedback
