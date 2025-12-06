# Tasks: Physical AI Book Structure and Content

**Input**: Design documents from `/specs/001-book-structure/`
**Prerequisites**: plan.md (implementation plan), spec.md (feature specification), checklists/requirements.md
**Branch**: `001-book-structure`
**Status**: Ready for implementation

**Organization**: Tasks grouped by user story (educator, learner, maintainer) to enable independent implementation. Each user story can be tested and validated independently.

## Format: `[ID] [P?] [Story] Description with file path`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (US1=Educator, US2=Learner, US3=Maintainer)
- Exact file paths included in descriptions

## Path Conventions

- Docusaurus site root: `docusaurus-site/`
- Documentation: `docs/` (lesson content, guides, resources)
- Configuration: Root level (`docusaurus.config.js`, `sidebars.js`)
- Planning docs: `specs/001-book-structure/` (spec, plan, research, data-model)

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and Docusaurus structure

**Tasks**:

- [ ] T001 Initialize Docusaurus project structure at `docusaurus-site/` with v3.x scaffold
- [ ] T002 [P] Create directory hierarchy in `docusaurus-site/docs/` matching plan: module-01 → chapter-01 → chapter-02 with lesson subdirectories
- [ ] T003 [P] Create `docusaurus-site/static/img/` directory and add placeholder logo and favicon
- [ ] T004 Create `docusaurus-site/src/css/custom.css` with base styles for code blocks, safety callouts, and lesson hierarchy
- [ ] T005 [P] Create `docusaurus-site/package.json` with Docusaurus 3.x dependencies and build scripts
- [ ] T006 Initialize git tracking for `docusaurus-site/` directory structure (no content yet)

**Checkpoint**: Docusaurus project structure ready; build succeeds with empty content

---

## Phase 2: Foundational (Blocking Prerequisites - MUST complete before user stories)

**Purpose**: Core infrastructure and templates that all lessons depend on

**⚠️ CRITICAL**: No lesson content work can begin until this phase is complete

**Tasks**:

- [ ] T007 Create `docusaurus-site/docusaurus.config.js` with full configuration per plan (site title, navbar, footer, plugins, presets, markdown config)
- [ ] T008 Create `docusaurus-site/sidebars.js` with hierarchical navigation structure: Module 1 → Chapter 1 (2 lessons) → Chapter 2 (2 lessons) + Setup Guides + Resources sections
- [ ] T009 [P] Create `docusaurus-site/docs/_category_.json` for root module configuration (label, position, description)
- [ ] T010 [P] Create `docusaurus-site/docs/module-01-physical-ai-fundamentals/_category_.json` for module configuration
- [ ] T011 [P] Create `docusaurus-site/docs/module-01-physical-ai-fundamentals/chapter-01-sensors-data/_category_.json` for Chapter 1 (beginner level)
- [ ] T012 [P] Create `docusaurus-site/docs/module-01-physical-ai-fundamentals/chapter-02-control-actuators/_category_.json` for Chapter 2 (intermediate level)
- [ ] T013 Create lesson markdown template at `specs/001-book-structure/contracts/lesson-template.md` with 8-part structure (header, intro, code, explanation, project, pitfalls, summary, reading)
- [ ] T014 Create setup guides directory structure: `docusaurus-site/docs/setup-guides/_category_.json`
- [ ] T015 Create resources directory structure: `docusaurus-site/docs/resources/_category_.json`
- [ ] T016 Generate `specs/001-book-structure/data-model.md` with lesson entity schema (YAML), dependency graph, and hardware requirements mapping
- [ ] T017 [P] Create content style guide at `specs/001-book-structure/CONTENT_STYLE_GUIDE.md` with: code style rules, safety section requirements, voice/tone guidelines, code example testing procedures
- [ ] T018 Verify Docusaurus build succeeds: `npm run build` in `docusaurus-site/` with empty lesson content

**Checkpoint**: Docusaurus infrastructure ready; empty site builds successfully; lesson template ready for content authors

---

## Phase 3: User Story 1 - Educator Structures Course (Priority: P1) 🎯 MVP

**Goal**: Create complete book structure with 4 lessons that educators can use to build courses

**Independent Test**: Educator reviews book structure document and sees 1 module, 2 chapters, 4 lessons with clear progression and learning objectives (all lessons in sidebar, all prerequisites documented)

### Implementation for User Story 1

- [ ] T019 [US1] Create Lesson 1.1 content at `docusaurus-site/docs/module-01-physical-ai-fundamentals/chapter-01-sensors-data/lesson-01-reading-sensors/index.md` with: learning objectives (4), prerequisites, 45-60 min duration, code example (simulator variant), explanation section, hands-on project description, safety section, key concepts summary, further reading links
- [ ] T020 [P] [US1] Create code examples directory: `docusaurus-site/docs/module-01-physical-ai-fundamentals/chapter-01-sensors-data/lesson-01-reading-sensors/code-examples/` with README.md listing contents
- [ ] T021 [P] [US1] Create Lesson 1.2 content at `docusaurus-site/docs/module-01-physical-ai-fundamentals/chapter-01-sensors-data/lesson-02-filtering-data/index.md` with: learning objectives (4), prerequisites (Lesson 1.1 + statistics), 60-75 min duration, code example (simulator), explanation, hands-on project (data logging), safety considerations, summary, further reading
- [ ] T022 [P] [US1] Create code examples for Lesson 1.2 at `docusaurus-site/docs/module-01-physical-ai-fundamentals/chapter-01-sensors-data/lesson-02-filtering-data/code-examples/`
- [ ] T023 [US1] Create Lesson 2.1 content at `docusaurus-site/docs/module-01-physical-ai-fundamentals/chapter-02-control-actuators/lesson-01-motor-control/index.md` with: learning objectives (4), prerequisites (Lesson 1.1 + digital signals), 60-75 min duration, code example (PWM control), explanation, hands-on project (motor speed controller), safety section (emergency stop), summary, further reading
- [ ] T024 [P] [US1] Create code examples for Lesson 2.1 at `docusaurus-site/docs/module-01-physical-ai-fundamentals/chapter-02-control-actuators/lesson-01-motor-control/code-examples/`
- [ ] T025 [US1] Create Lesson 2.2 content at `docusaurus-site/docs/module-01-physical-ai-fundamentals/chapter-02-control-actuators/lesson-02-servo-control/index.md` with: learning objectives (4), prerequisites (Lesson 2.1 + Lesson 1.1), 60-75 min duration, code example (servo positioning), explanation, hands-on project (light-following robot or temperature-controlled fan), safety (software limits), summary, further reading
- [ ] T026 [P] [US1] Create code examples for Lesson 2.2 at `docusaurus-site/docs/module-01-physical-ai-fundamentals/chapter-02-control-actuators/lesson-02-servo-control/code-examples/`
- [ ] T027 [US1] Create lesson images/diagrams: Lesson 1.1 sensor diagrams in `docusaurus-site/docs/module-01-physical-ai-fundamentals/chapter-01-sensors-data/lesson-01-reading-sensors/images/`
- [ ] T028 [P] [US1] Create lesson images for Lesson 1.2, 2.1, 2.2 in respective `images/` directories
- [ ] T029 [US1] Verify sidebar navigation works: all 4 lessons appear in correct hierarchy in Docusaurus site
- [ ] T030 [US1] Run Docusaurus build and verify no broken internal links: `npm run build` in `docusaurus-site/`

**Checkpoint**: User Story 1 complete - 4 lessons created with clear progression, educator can see full course structure in sidebar

---

## Phase 4: User Story 2 - Learner Completes First Project (Priority: P1)

**Goal**: Ensure Lesson 1.1 with simulator variant is fully functional and learners can complete hands-on project in <30 minutes

**Independent Test**: New learner (no prior robotics/AI experience) reads Lesson 1.1, runs simulator code example, completes temperature monitor project without external help in under 30 minutes

### Implementation for User Story 2

- [ ] T031 [US2] Create simulator HTML example at `docusaurus-site/docs/module-01-physical-ai-fundamentals/chapter-01-sensors-data/lesson-01-reading-sensors/code-examples/simulator-dht-sensor.html` with: interactive temperature/humidity simulator, buttons to read sensor, display output, runnable directly in browser, no external dependencies
- [ ] T032 [US2] Create Arduino code example at `docusaurus-site/docs/module-01-physical-ai-fundamentals/chapter-01-sensors-data/lesson-01-reading-sensors/code-examples/arduino-dht-sensor.ino` with: DHT library initialization, setup/loop functions, serial output, comments explaining each section
- [ ] T033 [US2] Create Python code example at `docusaurus-site/docs/module-01-physical-ai-fundamentals/chapter-01-sensors-data/lesson-01-reading-sensors/code-examples/python-sensor-reader.py` with: Adafruit DHT library usage, example for Raspberry Pi, clear comments, minimal dependencies
- [ ] T034 [US2] Create setup instructions README at `docusaurus-site/docs/module-01-physical-ai-fundamentals/chapter-01-sensors-data/lesson-01-reading-sensors/code-examples/README.md` listing all examples and their dependencies
- [ ] T035 [US2] Test simulator code: Open HTML file in browser, verify it runs without console errors, displays sensor values, updates when buttons clicked
- [ ] T036 [US2] Create Lesson 1.1 hands-on project instructions in lesson markdown: step-by-step for both simulator and hardware variants, success criteria ("You'll know it works when..."), estimated time breakdown
- [ ] T037 [US2] Add clear prerequisite callouts in Lesson 1.1 markdown: "You need: [list] for hardware OR [link to simulator]"
- [ ] T038 [US2] Verify Docusaurus renders Lesson 1.1 correctly: code blocks syntax-highlighted, images display, internal links work, safety callout styled correctly

**Checkpoint**: User Story 2 complete - Lesson 1.1 fully functional with simulator, learners can complete <30 min project

---

## Phase 5: User Story 3 - Maintainer Updates Content (Priority: P2)

**Goal**: Enable maintainers to locate, modify, and verify code examples across lessons efficiently

**Independent Test**: Maintainer locates a specific Python code example in Lesson 1.1, updates it, verifies lesson still builds and links are valid, total time <10 minutes

### Implementation for User Story 3

- [ ] T039 [US3] Create MAINTAINER_GUIDE.md in repository root with: file structure explanation, how to locate specific lesson content, how to update code examples, testing checklist (build succeeds, no broken links, code syntax valid), security update procedure
- [ ] T040 [US3] Create example maintenance scenario in MAINTAINER_GUIDE.md: "How to update a Python dependency version across all lessons"
- [ ] T041 [US3] Verify code examples are discoverable: all `.py`, `.ino`, `.html` files are in `code-examples/` subdirectories adjacent to `index.md` files, standardized naming convention
- [ ] T042 [US3] Create search/replace helper: document regex patterns for finding code examples by language (e.g., "find all Arduino examples")
- [ ] T043 [US3] Setup CI/CD validation: Create GitHub Actions workflow (or equivalent) that: validates Docusaurus build succeeds, checks for broken links, verifies all `code-examples/` files exist
- [ ] T044 [US3] Document code example testing requirements in MAINTAINER_GUIDE.md: which examples need manual testing on hardware vs. simulator only, testing checklist template
- [ ] T045 [US3] Create CODE_TESTING_CHECKLIST.md template for verifying each code example works before publication

**Checkpoint**: User Story 3 complete - Maintainer workflows documented, CI/CD validation in place, code examples easily updateable

---

## Phase 6: Setup Guides & Resources

**Purpose**: Enable learners to get started quickly and access reference materials

**Tasks**:

- [ ] T046 Create `docusaurus-site/docs/setup-guides/01-arduino-setup.md` with: shopping list (components + costs), Arduino IDE installation steps (Windows/Mac/Linux), DHT library installation, board setup, first upload test, troubleshooting common issues
- [ ] T047 [P] Create `docusaurus-site/docs/setup-guides/02-raspberry-pi-setup.md` with: OS installation, GPIO pin setup, Python environment setup, Adafruit library installation, hardware testing
- [ ] T048 [P] Create `docusaurus-site/docs/setup-guides/03-simulator-setup.md` with: browser compatibility, how to open simulator HTML files, no installation needed (emphasize ease)
- [ ] T049 [P] Create `docusaurus-site/docs/setup-guides/04-troubleshooting.md` with: common errors (sensor not responding, upload failures, library conflicts), solutions, links to lesson content
- [ ] T050 Create `docusaurus-site/docs/resources/01-glossary.md` with: AI terms, sensor terms, hardware terms, plain-language definitions with examples
- [ ] T051 [P] Create `docusaurus-site/docs/resources/02-hardware-compatibility.md` with: sensor compatibility matrix, Arduino/Raspberry Pi variant recommendations, cost comparison
- [ ] T052 [P] Create `docusaurus-site/docs/resources/03-safety-guidelines.md` with: electrical safety, motor/servo safety, emergency procedures, ethical considerations for Physical AI
- [ ] T053 [P] Create `docusaurus-site/docs/resources/04-further-reading.md` with: links to external tutorials, advanced topics, research papers, community forums

**Checkpoint**: All setup guides and resources created; learners have clear paths to get started

---

## Phase 7: Polish & Cross-Cutting Concerns

**Purpose**: Final validation, optimization, and quality assurance

**Tasks**:

- [ ] T054 [P] Create `specs/001-book-structure/quickstart.md` with: quick-start paths (simulator vs. Arduino vs. Raspberry Pi), time estimates, first project walkthrough
- [ ] T055 [P] Run full Docusaurus build: `npm run build` and verify <60 seconds, no warnings or errors
- [ ] T056 [P] Validate all links: Docusaurus built-in link checker or manual scan of sidebars and cross-references
- [ ] T057 [P] Accessibility check: Verify headings hierarchy (H1 → H2 → H3), images have alt text, code blocks are readable
- [ ] T058 Review all 4 lessons against content quality checklist (from `specs/001-book-structure/checklists/content-review.md`): voice, safety section, code examples, hands-on projects
- [ ] T059 [P] Create `docusaurus-site/README.md` with: project description, how to run locally, how to contribute, license information
- [ ] T060 [P] Configure static hosting deployment: Add `.github/workflows/deploy.yml` for GitHub Pages (or Vercel/Netlify config) with build and deploy steps
- [ ] T061 Verify quickstart.md against actual Lesson 1.1: confirm <30 min simulator path actually works, timing accurate
- [ ] T062 [P] Add lesson update timestamps to Docusaurus config: enable `showLastUpdateAuthor` and `showLastUpdateTime` for transparency
- [ ] T063 Setup discussion platform: Enable Docusaurus native discussions or link GitHub Discussions for learner feedback
- [ ] T064 Create CONTRIBUTING.md with: how to contribute new lessons, code review checklist, testing requirements, safety review process
- [ ] T065 [P] Final git commit: commit all content with message "docs: complete Physical AI book v1.0 (4 lessons, setup guides, resources)"

**Checkpoint**: All content complete, site built successfully, ready for deployment

---

## Dependencies & Execution Order

### Phase Dependencies

```
Phase 1 (Setup)
    ↓
Phase 2 (Foundational - BLOCKS everything)
    ↓
Phase 3 (User Story 1) ← Can proceed in parallel with Phase 4-5
Phase 4 (User Story 2) ↑ if staffed
Phase 5 (User Story 3) ↑
    ↓
Phase 6 (Setup Guides & Resources)
    ↓
Phase 7 (Polish & Cross-Cutting)
```

### User Story Dependencies

- **User Story 1 (Educator - P1)**: Depends on Phase 2 completion; independent otherwise
- **User Story 2 (Learner - P1)**: Depends on Phase 2 + Phase 3 completion (needs Lesson 1.1 structure from US1)
- **User Story 3 (Maintainer - P2)**: Depends on Phase 2 + Phase 3 completion (needs actual lessons to test maintenance)

### Within Each Phase

- All [P] marked tasks can run in parallel
- Sequential tasks (without [P]) must follow order (dependencies noted above)
- Each phase has a checkpoint - validate before moving to next phase

---

## Parallel Execution Opportunities

### Setup Phase (T001-T006)
```
Parallel group 1:          Parallel group 2:           Parallel group 3:
- T002 (dir structure)     - T003 (static assets)      - T004 (CSS)
```

### Foundational Phase (T007-T018)
```
Category configs can run in parallel:
- T009, T010, T011, T012 (all _category_.json files)

Templates and guides can run in parallel:
- T013 (lesson template), T014 (setup guides), T015 (resources)

After T018 (build verification), foundation is ready.
```

### User Story 1 Phase (T019-T030)
```
Lesson content (T019, T021, T023, T025) can run sequentially
Code examples for each lesson (T020, T022, T024, T026) can run in parallel with lesson content
Images (T027, T028) can run in parallel with content creation
Final verification (T029, T030) after all content complete
```

### User Story 2 Phase (T031-T038)
```
Code examples (T031, T032, T033, T034) can run in parallel
Testing (T035) waits for T031 completion
Lesson updates (T036, T037, T038) can run in parallel
```

### Setup Guides Phase (T046-T053)
```
All setup guides (T046, T047, T048, T049) and resources (T050, T051, T052, T053) can run in parallel
Total: 8 tasks, could be 1-2 developers working simultaneously
```

### Polish Phase (T054-T065)
```
Build and validation (T055, T056, T057) can run in parallel
Config/deployment (T060, T062, T063) can run in parallel
Final review and commit (T058, T061, T064, T065) run after validation complete
```

---

## Implementation Strategy

### MVP First (Minimal Viable Product - User Story 1 Only)

**Estimated time**: 2-3 days for single developer

1. ✅ Complete Phase 1: Setup (day 1, morning)
2. ✅ Complete Phase 2: Foundational (day 1, afternoon)
3. ✅ Complete Phase 3: User Story 1 - 4 lessons (day 2)
4. ✅ **STOP and VALIDATE**: Test all 4 lessons build, sidebar displays correctly
5. ✅ Deploy to static host

**MVP Deliverable**: Complete book structure with 4 lessons, educators can see full curriculum

### Incremental Enhancement (Add User Stories 2 & 3)

**Estimated time**: +2-3 days

1. ✅ Complete Phase 4: User Story 2 - Learner experience (day 3)
   - Simulator examples fully functional
   - <30 min path validated
   - Test independently
2. ✅ Complete Phase 5: User Story 3 - Maintainer workflows (day 3-4)
   - Documentation, CI/CD, testing procedures
3. ✅ Complete Phase 6 & 7: Setup guides, resources, polish (day 4)
4. ✅ Deploy final version

**Final Deliverable**: Complete, maintainable Physical AI book with all user stories implemented

### Parallel Team Strategy

**With 3 developers** (estimated 1-2 days):

1. **Developer A**: Phase 1 Setup + Phase 2 Foundational (both developers help here)
2. Once foundation ready:
   - **Developer A**: Phase 3 (User Story 1 - Educator) + Phase 6 (Setup guides)
   - **Developer B**: Phase 4 (User Story 2 - Learner) + Phase 7 (Polish)
   - **Developer C**: Phase 5 (User Story 3 - Maintainer) + Resources
3. All developers: Final validation and deployment

---

## Quality Gates (Must Pass Before Proceeding)

- [ ] **After Phase 2**: Docusaurus builds successfully with empty content; sidebars.js renders correctly
- [ ] **After Phase 3**: All 4 lessons created; no broken links; sidebar shows complete hierarchy
- [ ] **After Phase 4**: Lesson 1.1 simulator example runs in browser without console errors; learner can complete project in <30 min
- [ ] **After Phase 5**: MAINTAINER_GUIDE.md validates with test scenario; CI/CD pipeline working
- [ ] **After Phase 7**: Final build succeeds; all links valid; accessibility checks pass; site deployed

---

## Notes

- All file paths are exact and ready for implementation
- Each task is independently completable with information from plan.md and spec.md
- Code examples should be minimal, well-commented, and focused on clarity
- Safety sections are MANDATORY for all hardware lessons (enforced in Phase 7 checklist review)
- All content must align with constitution principles (hands-on learning, progressive complexity, clarity, reproducibility, safety, community)
- Commit after each task or logical group (e.g., commit after all 4 lessons created)
- No vague tasks - each has specific file path and success criteria

