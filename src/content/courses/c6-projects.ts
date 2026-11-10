import type { Course, Lesson, Project } from '../types'

/** Shared lines reused by many master prompts. */
const WORKFLOW = `HOW TO WORK
- Plan first and show me the plan. Wait for my approval before coding.
- Build in small steps. After each step, run the app and fix errors.
- Explain what you did in simple words. I am a beginner.
- Before saying you are done, run lint and build and fix every error.`

const CLAUDE_MODEL = {
  pick: 'Claude (balanced tier, e.g. Sonnet) in Claude Code',
  why: 'Great at clean UI and following a detailed master prompt. Switch to the biggest tier (Opus) only for planning or a bug that keeps failing.',
  alt: 'GPT in Codex works just as well for this project.',
}

interface Entry { slug: string; title: string; summary: string; project: Project }

const entries: Entry[] = [
  {
    slug: 'portfolio',
    title: 'Personal portfolio website',
    summary: 'Your own corner of the internet with your projects, skills and a contact section. The perfect first ship.',
    project: {
      category: 'Website', difficulty: 'Starter', time: '1–2 hours', icon: 'globe',
      pitch: 'A beautiful one-page site about you, live on the internet with your own link.',
      learn: ['Turning a design idea into a real page', 'Using the frontend-design skill', 'Deploying to Vercel and sharing a link'],
      features: ['Hero with your name, role and a photo or pixel avatar', 'About section and skills', 'Project cards with links', 'Contact section with email and socials', 'Smooth scroll animations, dark mode'],
      stack: [
        { layer: 'Framework', choice: 'Next.js + TypeScript', why: 'Great SEO so people can find you on Google, and easy to grow later.' },
        { layer: 'Styling', choice: 'Tailwind CSS + Motion', why: 'Fast styling and smooth, tasteful animations.' },
        { layer: 'Icons', choice: 'lucide-react', why: 'Clean, consistent icons.' },
        { layer: 'Hosting', choice: 'Vercel', why: 'Free, automatic deploys from GitHub.' },
      ],
      model: { pick: 'Claude in Claude Code', why: "Claude has the strongest design taste. Portfolios are all about looks.", alt: 'Gemini in Antigravity is a good free option.' },
      harness: { pick: 'Claude Code', why: 'Pairs perfectly with the frontend-design skill and can deploy with the Vercel skill.' },
      skills: [
        { name: 'frontend-design', why: 'Avoids the generic AI look. Makes the page feel personal and intentional.' },
        { name: 'ui-ux-pro-max', why: 'Optional: helps pick a color palette and font pairing that fits your personality.' },
        { name: 'deploy-to-vercel', why: 'Ship it with one sentence.' },
      ],
      masterPrompt: `Build my personal portfolio website. Use the frontend-design skill.

ABOUT ME
- Name: [your name]
- Role: [e.g. "IT student and aspiring vibe coder"]
- Short bio: [2–3 sentences]
- Skills: [list]
- Projects: [name + one line + link, for 3 projects. Use placeholders if I have none yet]
- Contact: [email, GitHub, LinkedIn, Facebook]

STACK
Next.js (App Router) + TypeScript + Tailwind CSS + Motion + lucide-react. No database.

PAGES & SECTIONS (single page)
1. Navbar with my name and links that smooth-scroll to sections
2. Hero: big name, role, short tagline, two buttons (See my work, Contact me)
3. About + skills as tidy badges
4. Projects: cards with title, description, tech tags and links
5. Contact: email button and social icons
6. Footer

DESIGN
- Clean and modern, lots of white space, one accent color: [color]
- Beautiful typography (pick a good Google Font pairing)
- Subtle fade-up animations on scroll, respectful of reduced motion
- Light and dark mode with a toggle
- Perfect on mobile (375px) and desktop

DONE WHEN
- All sections work, links scroll smoothly, no layout breaks on mobile
- Page title and meta description set to my name and role
- npm run build passes

${WORKFLOW}`,
      buildSteps: [
        { title: 'Personal touch', prompt: 'Replace the placeholder text with my real info: [paste]. Make the hero tagline more memorable. Give me 3 options first.' },
        { title: 'Project detail', prompt: 'Make each project card open a small modal with a screenshot, longer description, what I learned and the tech used. Keep it smooth and closable with Esc.' },
        { title: 'Polish pass', prompt: 'Do a polish pass: consistent spacing, aligned elements, better hover states and focus states for keyboard users. Check it at 375px, 768px and 1440px.' },
        { title: 'SEO & sharing', prompt: 'Add a favicon, Open Graph image and Twitter card so the link looks great when shared on Messenger and Facebook.' },
        { title: 'Deploy', prompt: 'Push this to a new GitHub repo and deploy it on Vercel. Give me the live link.' },
      ],
      pitfalls: [
        'Generic look: always name the frontend-design skill and give your own color and vibe.',
        'Lorem ipsum everywhere: give it your real bio, even if it is short.',
        'Huge photos make the site slow. Ask the agent to use next/image and compress images.',
      ],
      stretch: ['Add a blog with Markdown posts', 'Add a "Now" page with what you are learning', 'Connect a custom domain like yourname.dev'],
    },
  },
  {
    slug: 'focus-timer',
    title: 'Focus timer & to-do (Pomodoro)',
    summary: 'A calm study timer with a task list, stats and sounds. Small, useful, and you will use it daily.',
    project: {
      category: 'Web app', difficulty: 'Starter', time: '1–2 hours', icon: 'clock',
      pitch: 'Study in 25-minute focus sprints with a cute timer, a to-do list and daily stats.',
      learn: ['State and timers in React', 'Saving data in localStorage', 'Making small apps feel polished'],
      features: ['Pomodoro timer: 25 min focus, 5 min break, 15 min long break', 'Start, pause, reset, skip', 'Task list: add, check off, delete, pick the current task', 'Sound and browser notification when a session ends', 'Today\'s stats: sessions and minutes focused'],
      stack: [
        { layer: 'Framework', choice: 'Vite + React + TypeScript', why: 'No server needed. Vite is simple and fast.' },
        { layer: 'Styling', choice: 'Tailwind CSS + Motion', why: 'A smooth animated progress ring makes it feel premium.' },
        { layer: 'Data', choice: 'localStorage', why: 'Saves tasks and settings in the browser. No database needed.' },
        { layer: 'Hosting', choice: 'Vercel', why: 'Free and instant.' },
      ],
      model: CLAUDE_MODEL,
      harness: { pick: 'Claude Code or Codex', why: 'Either works great. This is a perfect first full project in any harness.' },
      skills: [
        { name: 'frontend-design', why: 'Makes the timer feel calm and beautiful, not like a tutorial project.' },
      ],
      masterPrompt: `Build a focus timer web app called "[name, e.g. FocusBuddy]" for students.

STACK
Vite + React + TypeScript + Tailwind CSS + Motion + lucide-react. Data in localStorage. No backend.

FEATURES
1. Pomodoro timer with modes: Focus (25 min), Short break (5), Long break (15, after 4 focus sessions). Durations editable in settings.
2. Big circular progress ring that animates smoothly. Start / Pause / Reset / Skip buttons. Space bar starts and pauses.
3. Show the remaining time in the browser tab title.
4. Task list: add, edit, check off, delete. Click a task to make it "current", shown under the timer.
5. When a session ends: play a soft sound and show a browser notification (ask permission politely).
6. Today's stats: number of focus sessions and total focus minutes. Resets each day.
7. Everything saves to localStorage and survives refresh.

DESIGN
Calm and cozy. Soft background color that changes per mode (focus / break). Rounded cards, generous spacing, one accent color. Works great on phone and laptop.

DONE WHEN
- Timer is accurate even if the tab is in the background (use timestamps, not just counting intervals)
- All features work after a page refresh
- npm run build passes

${WORKFLOW}`,
      buildSteps: [
        { title: 'Test the timer accuracy', prompt: 'Set focus to 1 minute for testing. Switch to another tab for the whole minute, then come back. Is the timer still correct? Fix it if not.' },
        { title: 'Weekly stats', prompt: 'Add a small stats view with a bar chart of focus minutes for the last 7 days. Keep it simple, no heavy chart library unless needed.' },
        { title: 'Themes', prompt: 'Add 4 color themes (e.g. Matcha, Ocean, Sunset, Night) the user can pick. Save the choice.' },
        { title: 'Make it installable', prompt: 'Make this a PWA so I can install it on my phone home screen and it works offline.' },
      ],
      pitfalls: [
        'Timers drift when the tab sleeps. That is why the master prompt says to use timestamps.',
        'Browsers block sound until the user clicks something. Starting the timer counts as a click.',
      ],
      stretch: ['Lo-fi background music player', 'Focus streaks and badges', 'Sync across devices with Supabase'],
    },
  },
  {
    slug: 'pixel-snake',
    title: 'Pixel Snake arcade game',
    summary: 'A classic snake game with a retro pixel look, sounds, levels and a high score. Games are the most fun way to learn.',
    project: {
      category: 'Game', difficulty: 'Starter', time: '1–2 hours', icon: 'gamepad',
      pitch: 'A retro arcade snake game with power-ups, speed levels and a saved high score.',
      learn: ['The game loop (update → draw → repeat)', 'Keyboard and touch controls', 'HTML Canvas drawing'],
      features: ['Grid-based snake that grows when eating food', 'Speed increases every 5 points', 'Score and saved high score', 'Start, pause and game over screens', 'Arrow keys / WASD on desktop, swipe on mobile'],
      stack: [
        { layer: 'Game', choice: 'HTML Canvas + TypeScript', why: 'Snake is simple enough that no game engine is needed. You learn how games really work.' },
        { layer: 'Build tool', choice: 'Vite', why: 'Instant dev server, simple setup.' },
        { layer: 'Data', choice: 'localStorage', why: 'Saves the high score.' },
        { layer: 'Hosting', choice: 'Vercel or itch.io', why: 'Share it with friends or upload it as a real indie game.' },
      ],
      model: { pick: 'Claude or GPT (balanced tier)', why: 'Both are excellent at game logic like this.', alt: 'For a quick first try, even a fast/small model can build Snake.' },
      harness: { pick: 'Any harness', why: 'Great project to compare Claude Code, Codex and Antigravity side by side!' },
      skills: [
        { name: 'none needed', why: 'This one is about learning the basics. Try it with no skills, then compare.' },
      ],
      masterPrompt: `Build a retro pixel-art Snake game that runs in the browser.

STACK
Vite + TypeScript + HTML Canvas. No game engine, no frameworks. Keep the code split into small clear files (game loop, snake, food, input, render, sound).

GAMEPLAY
- 20x20 grid. Snake moves one cell per tick. Eat food to grow and score +1.
- Speed increases every 5 points.
- Game over when hitting a wall or yourself.
- Golden food appears sometimes: +3 points, disappears after 5 seconds.
- Prevent the snake from reversing into itself, and buffer quick key presses so fast turns feel fair.

SCREENS
Start screen (title + "Press Space or tap to start"), playing (score + high score at top), pause (P or Esc), game over (score, high score, play again).

CONTROLS
Arrow keys and WASD on desktop. Swipe on mobile. The canvas must scale to fit any screen while staying crisp (pixel-perfect, no blur).

LOOK & SOUND
Retro arcade style with a limited color palette (4–5 colors), pixel font for text, small screen shake on game over. Simple sound effects using the Web Audio API (no audio files), with a mute button.

DONE WHEN
- Plays smoothly at 60fps, no bugs when pressing keys very fast
- High score saves in localStorage
- Works with swipe on a phone
- npm run build passes

${WORKFLOW}`,
      buildSteps: [
        { title: 'Explain the game loop', prompt: 'Explain how the game loop in this code works, step by step, like I am new to coding. Point to the exact lines.' },
        { title: 'Levels with walls', prompt: 'Add 3 levels with different wall layouts inside the grid. Reach 15 points to unlock the next level.' },
        { title: 'Juice it up', prompt: 'Add game juice: particles when eating food, a little squash animation, a flash on the score when it goes up. Keep it tasteful.' },
        { title: 'Ship it', prompt: 'Deploy it to Vercel and also give me a zip of the production build so I can upload it to itch.io.' },
      ],
      pitfalls: [
        'Two quick key presses can make the snake turn into itself. The input buffer in the prompt fixes this.',
        'Blurry pixels on big screens: ask for image-rendering: pixelated and integer scaling.',
      ],
      stretch: ['Online leaderboard with Supabase', 'Two-player mode on one keyboard', 'Daily challenge with a fixed seed'],
    },
  },
  {
    slug: 'flashcards',
    title: 'Flashcard study app',
    summary: 'Make decks, study with smart repetition, and track what you know. Built for exam season.',
    project: {
      category: 'Web app', difficulty: 'Beginner', time: '3–4 hours', icon: 'book-open',
      pitch: 'Flashcards that show you the hard cards more often, so you remember more in less time.',
      learn: ['Multi-page app structure with routes', 'A simple spaced repetition algorithm', 'Moving from local data to a real database'],
      features: ['Create decks and cards (front / back)', 'Study mode with flip animation', '"Again / Hard / Good / Easy" buttons that schedule the next review', 'Progress per deck: new, learning, mastered', 'Import cards by pasting "question - answer" lines'],
      stack: [
        { layer: 'Framework', choice: 'Next.js + TypeScript', why: 'Multiple pages (decks, study, edit) and easy to add accounts later.' },
        { layer: 'UI', choice: 'Tailwind CSS + shadcn/ui + Motion', why: 'Ready-made dialogs and inputs, plus a satisfying card flip.' },
        { layer: 'Data (v1)', choice: 'localStorage', why: 'Get it working first, no setup.' },
        { layer: 'Data (v2)', choice: 'Supabase', why: 'Accounts and sync across phone and laptop.' },
        { layer: 'Hosting', choice: 'Vercel', why: 'Free and automatic.' },
      ],
      model: CLAUDE_MODEL,
      harness: { pick: 'Claude Code or Codex', why: 'Plan mode is very useful here because there are several pages and a data model.' },
      skills: [
        { name: 'frontend-design', why: 'Makes studying feel pleasant instead of like a spreadsheet.' },
        { name: 'vercel-react-best-practices', why: 'Keeps the Next.js code clean and fast.' },
        { name: 'supabase-postgres-best-practices', why: 'When you move to Supabase (build step 3): correct tables and RLS.' },
      ],
      masterPrompt: `Build a flashcard study web app called "[name]" for college students.

STACK
Next.js (App Router) + TypeScript + Tailwind CSS + shadcn/ui + Motion + lucide-react.
For v1, store data in localStorage behind a small data layer (one file with functions like getDecks, saveCard) so we can swap it for Supabase later without touching the UI.

DATA
- Deck: id, name, description, color, createdAt
- Card: id, deckId, front, back, box (1–5), dueDate, createdAt

PAGES
1. Home: grid of decks with card counts and how many are due today. "New deck" button.
2. Deck page: list of cards, add / edit / delete, "Study now" button, bulk import (paste lines formatted "question - answer").
3. Study page: one card at a time. Click or press Space to flip (3D flip animation). Then rate: Again / Hard / Good / Easy. Show progress (e.g. 7/20).
4. Finished screen with a small celebration and summary.

SPACED REPETITION (simple Leitner system)
- Again → box 1, due now. Hard → same box, due tomorrow. Good → box +1. Easy → box +2.
- Box intervals in days: 1, 2, 4, 8, 16. Study only due cards.
- Explain this algorithm to me in simple words in a code comment.

DESIGN
Friendly and focused. Big readable card text. Each deck has a color. Works perfectly on mobile, with big tap targets for the rating buttons.

DONE WHEN
- I can create a deck, add 10 cards, study them, and the due dates update correctly
- Data survives refresh
- npm run build passes

${WORKFLOW}`,
      buildSteps: [
        { title: 'Keyboard shortcuts', prompt: 'Add keyboard shortcuts in study mode: Space to flip, 1/2/3/4 for Again/Hard/Good/Easy. Show a small hint.' },
        { title: 'Stats', prompt: 'Add a stats page: cards studied per day (last 14 days) and how many cards are in each box per deck.' },
        { title: 'Move to Supabase', prompt: 'Move the data layer to Supabase with email login. Create tables for decks and cards with RLS so users only see their own. Keep the same UI. Tell me exactly what to set up in the Supabase dashboard.' },
        { title: 'Share decks', prompt: 'Let users make a deck public with a share link. Others can view it and copy it into their own account.' },
      ],
      pitfalls: [
        'Doing Supabase from the start makes v1 slower. Get it working with localStorage first.',
        'Date bugs: ask the agent to compare dates by calendar day in the user\'s local timezone.',
      ],
      stretch: ['AI-generated cards from your notes (see the AI Study Buddy project)', 'Images on cards', 'Mobile version with Expo'],
    },
  },
  {
    slug: 'habit-tracker',
    title: 'Habit tracker with streaks',
    summary: 'Your first real phone app: track daily habits, keep streaks alive and get reminders.',
    project: {
      category: 'Mobile app', difficulty: 'Beginner', time: '3–4 hours', icon: 'calendar',
      pitch: 'A cute mobile app that helps you drink water, study and sleep on time, with streaks and reminders.',
      learn: ['Building a mobile app with Expo', 'Testing on your own phone with Expo Go', 'Local notifications and on-device storage'],
      features: ['Add habits with an emoji, color and days of the week', 'Tap to check off today, with a satisfying animation', 'Streak counter and a monthly calendar heatmap', 'Daily reminder notification per habit', 'Works offline'],
      stack: [
        { layer: 'Framework', choice: 'Expo + Expo Router + TypeScript', why: 'One codebase for iPhone and Android, test instantly with Expo Go.' },
        { layer: 'Styling', choice: 'NativeWind', why: 'Tailwind classes in React Native.' },
        { layer: 'Data', choice: 'AsyncStorage (or expo-sqlite)', why: 'Saves on the phone, works offline, no backend needed.' },
        { layer: 'Notifications', choice: 'expo-notifications', why: 'Local reminders without a server.' },
        { layer: 'Animations', choice: 'Reanimated + expo-haptics', why: 'Smooth check animation and a little vibration feel great.' },
      ],
      model: CLAUDE_MODEL,
      harness: { pick: 'Claude Code or Codex', why: 'Run the Expo dev server in a separate terminal so you can keep chatting while testing on your phone.' },
      skills: [
        { name: 'react-native-skills', why: 'React Native and Expo best practices for smooth lists and animations.' },
        { name: 'frontend-design', why: 'Helps with a distinctive, friendly visual style.' },
      ],
      masterPrompt: `Build a habit tracker mobile app called "[name]" with Expo.

STACK
Expo (latest SDK) + Expo Router + TypeScript + NativeWind. AsyncStorage for data (behind a small data layer file). expo-notifications for reminders. Reanimated and expo-haptics for feedback. Must run in Expo Go.

SCREENS (tab layout)
1. Today: list of today's habits as big cards. Tap to complete with a bounce + haptic. Shows current streak on each. A progress ring at the top (e.g. 3/5 done).
2. Habits: list all habits, add / edit / delete. Fields: name, emoji, color, which days of the week, optional reminder time.
3. Stats: per habit, the current and best streak and a month calendar heatmap.

RULES
- A streak counts consecutive scheduled days completed (days the habit is not scheduled do not break it).
- Day boundaries use the phone's local time.
- Ask for notification permission only when the user first sets a reminder.

DESIGN
Playful but clean: soft pastel colors, rounded cards, emoji, large touch targets, supports light and dark mode.

DONE WHEN
- I can add a habit, complete it, see the streak, and get a reminder notification
- Data survives closing the app
- No TypeScript errors

${WORKFLOW}
When ready, start the dev server and tell me how to open it on my phone with Expo Go.`,
      buildSteps: [
        { title: 'Test streak logic', prompt: 'Write a few small tests for the streak calculation, including skipped non-scheduled days and month boundaries. Fix any bugs found.' },
        { title: 'Onboarding', prompt: 'Add a 3-screen onboarding the first time the app opens, with 4 suggested starter habits the user can add with one tap.' },
        { title: 'Widget-style summary', prompt: 'On the Today screen, add a motivational message that changes based on progress (0%, 50%, 100%) and a confetti animation when all habits are done.' },
        { title: 'Build an APK', prompt: 'Help me create an Android APK with EAS Build so I can install it on my phone and share it with friends. Explain each step.' },
      ],
      pitfalls: [
        'Phone and laptop must be on the same Wi-Fi for Expo Go. If not, try "npx expo start --tunnel".',
        'Some notification features behave differently in Expo Go than in a real build. Test reminders in a development build if they act weird.',
      ],
      stretch: ['Sync with Supabase so habits survive changing phones', 'Home screen widget', 'Friends and shared streaks'],
    },
  },
  {
    slug: 'budget-tracker',
    title: 'Budget & expense tracker (₱)',
    summary: 'Track allowance and spending with categories, charts and monthly budgets. With real accounts and a database.',
    project: {
      category: 'Web app', difficulty: 'Intermediate', time: '5–7 hours', icon: 'wallet',
      pitch: 'Know exactly where your allowance goes: log expenses in seconds, see charts, stay under budget.',
      learn: ['Supabase auth and database with RLS', 'Charts and dashboards', 'Forms with validation'],
      features: ['Email / Google login', 'Add income and expenses in under 5 seconds', 'Categories with icons (Food, Transport, Load, School…)', 'Monthly budget per category with progress bars', 'Dashboard: totals, pie chart by category, spending over time', 'Export to CSV'],
      stack: [
        { layer: 'Framework', choice: 'Next.js + TypeScript', why: 'Pages, server actions and auth all in one.' },
        { layer: 'UI', choice: 'Tailwind CSS + shadcn/ui + Recharts', why: 'Forms, dialogs and clean charts.' },
        { layer: 'Backend', choice: 'Supabase (Postgres + Auth)', why: 'Real accounts and data synced everywhere.' },
        { layer: 'Validation', choice: 'Zod + React Hook Form', why: 'No negative amounts, no empty titles.' },
        { layer: 'Hosting', choice: 'Vercel', why: 'Connects to Supabase easily.' },
      ],
      model: { pick: 'Claude Opus for the plan, Sonnet for building (or GPT in Codex)', why: 'This project has a real data model and security rules. A strong plan prevents rework.', alt: 'Codex is great here, it is careful with database and auth logic.' },
      harness: { pick: 'Claude Code or Codex + a second model as reviewer', why: 'Money and user data: get a second-model review of the RLS policies before sharing it.' },
      skills: [
        { name: 'supabase-postgres-best-practices', why: 'Correct tables, indexes and RLS policies.' },
        { name: 'vercel-react-best-practices', why: 'Clean, fast Next.js code.' },
        { name: 'frontend-design', why: 'A dashboard that is calm and readable, not cluttered.' },
        { name: 'superpowers', why: 'Use writing-plans before building, since there are many moving parts.' },
      ],
      masterPrompt: `Build a personal budget and expense tracker web app called "[name]" for Filipino students. Currency is Philippine peso (₱).

STACK
Next.js (App Router) + TypeScript + Tailwind CSS + shadcn/ui + Recharts + lucide-react. Supabase for auth (email + Google) and Postgres. Zod + React Hook Form for forms. Use the official Supabase SSR package for Next.js.

DATA (Supabase, RLS ON for every table, users can only access their own rows)
- categories: id, user_id, name, icon, color, type (expense | income)
- transactions: id, user_id, category_id, amount (numeric, positive), type, note, date, created_at
- budgets: id, user_id, category_id, month (first day of month), amount
Seed default categories for new users: Food, Transport, Load/Internet, School, Shopping, Fun, Bills, Allowance (income), Salary (income).

PAGES
1. Login / sign up
2. Dashboard: this month's income, expenses and balance cards; pie chart by category; line chart of daily spending; budget progress bars (green / yellow at 80% / red over).
3. Transactions: list grouped by day, filter by month and category, search, edit and delete.
4. Quick add: a floating "+" button that opens a dialog. Amount field auto-focused, category as big icon buttons. Must be possible in under 5 seconds on a phone.
5. Budgets: set a monthly amount per category.
6. Settings: manage categories, export transactions to CSV, log out.

RULES
- Format money as ₱1,234.50. Dates in Philippine format.
- Never expose the service role key. All secrets in .env.local.
- Loading, empty and error states everywhere.

DESIGN
Clean fintech style: neutral background, white cards, one accent color, big clear numbers. Mobile first.

DONE WHEN
- A new user can sign up, add expenses and see the dashboard update
- A second test account cannot see the first account's data
- npm run build passes

${WORKFLOW}
Also give me a step-by-step list of what I need to set up in the Supabase dashboard.`,
      buildSteps: [
        { title: 'Security review (second model)', prompt: 'Review all Supabase tables and RLS policies, and every place we read or write data. Could one user ever read or change another user\'s data? List every risk. Do not change code yet.' },
        { title: 'Recurring expenses', prompt: 'Add recurring transactions (e.g. monthly Netflix, weekly allowance) that get added automatically. Explain the approach before building it.' },
        { title: 'Insights', prompt: 'Add an Insights card: compare this month vs last month per category, and show the top 3 changes in plain words ("You spent ₱450 more on Food").' },
        { title: 'Savings goals', prompt: 'Add savings goals with a target amount, deadline and progress, and let me add money to a goal.' },
        { title: 'Deploy', prompt: 'Deploy to Vercel. Tell me exactly which environment variables to add and which Supabase auth settings (redirect URLs) to update for the live URL.' },
      ],
      pitfalls: [
        'Forgetting RLS = everyone can read everyone\'s expenses. Test with two accounts.',
        'Floating point money bugs: store amounts as numeric in Postgres, never as float.',
        'Google login on the live site fails until you add the Vercel URL to Supabase redirect URLs.',
      ],
      stretch: ['Receipt photo upload with Supabase Storage', 'AI that categorizes expenses from the note', 'Mobile version with Expo using the same Supabase backend'],
    },
  },
  {
    slug: 'gym-logger',
    title: 'Gym workout logger',
    summary: 'A mobile app to plan workouts, log sets and reps, track personal records and see your progress.',
    project: {
      category: 'Mobile app', difficulty: 'Intermediate', time: '6–8 hours', icon: 'dumbbell',
      pitch: 'Log every set at the gym in seconds and watch your strength go up on a chart.',
      learn: ['A more complex data model (workouts → exercises → sets)', 'Mobile UX for one-handed use', 'Supabase with Expo'],
      features: ['Exercise library with muscle groups', 'Start a workout, add exercises, log sets (weight × reps)', 'Rest timer between sets with vibration', 'Workout templates (Push / Pull / Legs)', 'History and personal records (PRs)', 'Progress chart per exercise'],
      stack: [
        { layer: 'Framework', choice: 'Expo + Expo Router + TypeScript', why: 'You use it at the gym, so it must be a phone app.' },
        { layer: 'Styling', choice: 'NativeWind', why: 'Fast, consistent styling.' },
        { layer: 'Backend', choice: 'Supabase (Auth + Postgres)', why: 'Never lose your workout history, even if you change phones.' },
        { layer: 'Charts', choice: 'victory-native (or a simple custom SVG chart)', why: 'Progress over time.' },
        { layer: 'Feedback', choice: 'expo-haptics + expo-keep-awake', why: 'Vibrate when rest is over, keep the screen on during workouts.' },
      ],
      model: { pick: 'Claude Opus for planning, Sonnet for building', why: 'The nested data model benefits from a careful plan.', alt: 'GPT in Codex.' },
      harness: { pick: 'Claude Code or Codex', why: 'Use plan mode for the data model first, then build screen by screen.' },
      skills: [
        { name: 'react-native-skills', why: 'Fast lists and smooth animations on real phones.' },
        { name: 'supabase-postgres-best-practices', why: 'Good schema for workouts, exercises and sets, with RLS.' },
        { name: 'superpowers', why: 'brainstorming + writing-plans to design the data model.' },
      ],
      masterPrompt: `Build a gym workout logger mobile app called "[name]" with Expo and Supabase.

STACK
Expo (latest SDK) + Expo Router + TypeScript + NativeWind + Supabase (auth + Postgres, using the official supabase-js with AsyncStorage session persistence). expo-haptics, expo-keep-awake.

DATA (RLS ON, users only access their own rows; exercises can also be global/shared read-only)
- exercises: id, user_id (null = built-in), name, muscle_group, equipment
- templates: id, user_id, name; template_exercises: template_id, exercise_id, order
- workouts: id, user_id, name, started_at, finished_at, notes
- workout_sets: id, workout_id, exercise_id, set_number, weight_kg, reps, completed
Seed about 40 common built-in exercises.

SCREENS (tabs)
1. Home: "Start empty workout", templates as cards, last workout summary.
2. Active workout: add exercises, each with rows of sets (previous values shown in gray as a hint), tap check to complete a set → starts a rest timer (default 90s) with vibration at the end. Screen stays awake. Finish button shows a summary.
3. History: past workouts by date with volume (total kg).
4. Exercises: search the library, tap one to see its history, best set and a progress chart (estimated 1RM over time).
5. Profile: units (kg/lb), default rest time, log out.

UX RULES
Designed for one hand, sweaty fingers: big buttons, number pads for inputs, no tiny targets. Dark theme by default.

DONE WHEN
- I can log a full workout, see it in history, and see a PR highlighted
- Data persists after reinstalling the app (it is in Supabase)
- No TypeScript errors

${WORKFLOW}`,
      buildSteps: [
        { title: 'Offline safety', prompt: 'Gyms often have bad signal. Make the active workout save locally first and sync to Supabase when online, so I never lose a set.' },
        { title: 'PR celebrations', prompt: 'When I beat a personal record, show a short celebration animation and a badge on that set.' },
        { title: 'Plate calculator', prompt: 'Add a plate calculator: enter a target weight, show which plates to load on each side of a 20kg bar.' },
        { title: 'Weekly summary', prompt: 'Add a weekly summary on Home: workouts this week, total volume, and muscle groups trained (as a simple body heatmap or chips).' },
      ],
      pitfalls: [
        'Session not persisting on mobile: make sure supabase-js is configured with AsyncStorage.',
        'Number inputs: use numeric keyboards and accept both "60" and "60.5".',
      ],
      stretch: ['AI coach that suggests the next workout based on history', 'Share workouts with gym buddies', 'Apple Health / Google Fit integration in a development build'],
    },
  },
  {
    slug: 'ai-study-buddy',
    title: 'AI study buddy: notes → quiz',
    summary: 'Paste your notes, get flashcards, a quiz and a simple explanation. Your first app with its own AI inside.',
    project: {
      category: 'AI app', difficulty: 'Intermediate', time: '4–6 hours', icon: 'brain',
      pitch: 'Turn boring lecture notes into a quiz, flashcards and an "explain like I\'m 12" summary in seconds.',
      learn: ['Calling an AI API safely from server code', 'Streaming AI responses', 'Getting structured data (JSON) back from AI'],
      features: ['Paste notes or upload a PDF', 'Generate: summary, key terms, 10-question quiz, flashcards', 'Interactive quiz with score and explanations', '"Explain simpler" button on any part', 'Save study sets (localStorage for v1)'],
      stack: [
        { layer: 'Framework', choice: 'Next.js + TypeScript', why: 'Server routes keep your AI API key secret.' },
        { layer: 'AI', choice: 'Vercel AI SDK + a small fast model', why: 'Streaming and structured output made easy. A small model is cheap and fast enough.' },
        { layer: 'Validation', choice: 'Zod', why: 'Force the AI to return quiz data in the exact shape your UI needs.' },
        { layer: 'UI', choice: 'Tailwind CSS + shadcn/ui', why: 'Clean tabs, cards and progress bars.' },
        { layer: 'Hosting', choice: 'Vercel', why: 'Works perfectly with the AI SDK.' },
      ],
      model: { pick: 'Builder: Claude or GPT (balanced). Inside the app: a small, cheap model (Claude Haiku, a GPT mini model or Gemini Flash)', why: 'Two different choices! The model that *builds* the app vs the model your app *calls* for every user request.', alt: 'Use Gemini Flash inside the app if you want a generous free tier for testing.' },
      harness: { pick: 'Claude Code or Codex', why: 'Ask it to read the latest Vercel AI SDK docs first, since AI libraries change often.' },
      skills: [
        { name: 'frontend-design', why: 'A study tool should feel calm and focused.' },
        { name: 'vercel-react-best-practices', why: 'Clean streaming UI in Next.js.' },
      ],
      masterPrompt: `Build an AI study buddy web app called "[name]" for students.

STACK
Next.js (App Router) + TypeScript + Tailwind CSS + shadcn/ui + Vercel AI SDK + Zod. Use the provider: [Anthropic / OpenAI / Google] with a small, fast model. The API key lives ONLY in .env.local and is used ONLY in server code (route handlers or server actions).
Before coding, check the current Vercel AI SDK docs for the right way to stream text and to generate structured objects.

FLOW
1. Home: a big text area to paste notes (max ~15,000 characters, show a counter) and a subject field. "Generate study set" button.
2. Generate in parallel and show results in tabs as they arrive:
   - Summary (streamed text, simple language, bullet points)
   - Key terms (term + definition)
   - Quiz: 10 multiple-choice questions, each with 4 options, the correct index and a one-sentence explanation (structured output validated with Zod)
   - Flashcards (front/back, flip animation)
3. Quiz mode: one question at a time, instant feedback, score at the end, "review mistakes".
4. "Explain simpler" button on the summary: re-explains like I am 12 with an everyday analogy.
5. Save study sets in localStorage, listed on the home page.

SAFETY & COST
- Validate input length on the server. Return friendly errors (empty notes, too long, AI failure).
- Simple rate limit per user (e.g. 10 generations per hour, stored in memory is fine for v1).
- Never send the API key to the browser.

DESIGN
Calm, focused, lots of white space, one accent color, good typography for reading. Mobile friendly.

DONE WHEN
- Pasting notes produces all four outputs, and the quiz works end to end
- No API key appears in the browser (check the Network tab)
- npm run build passes

${WORKFLOW}
Tell me exactly which API key to get and where to put it.`,
      buildSteps: [
        { title: 'Prompt tuning', prompt: 'Show me the system prompts you wrote for each generator. Improve them so quiz questions test understanding, not just memorization, and avoid trick questions.' },
        { title: 'PDF upload', prompt: 'Allow uploading a PDF (max 10 pages). Extract the text on the server and use it as the notes.' },
        { title: 'Chat with your notes', prompt: 'Add a "Ask about these notes" chat tab that answers only from the notes and says when the answer is not in them.' },
        { title: 'Accounts & history', prompt: 'Add Supabase auth and save study sets to the database with RLS, replacing localStorage.' },
      ],
      pitfalls: [
        'Putting the API key in client code: anyone could steal it. Server only!',
        'AI returns broken JSON: use the SDK\'s structured output with a Zod schema instead of parsing text yourself.',
        'AI libraries change fast: always ask the agent to check current docs.',
      ],
      stretch: ['Combine with the Flashcards project', 'Voice mode: read questions out loud', 'Multiplayer quiz battles with classmates'],
    },
  },
  {
    slug: 'fridge-chef',
    title: 'Fridge Chef: AI recipe maker',
    summary: 'Type (or snap a photo of) what is in your fridge and get Filipino-friendly recipes you can actually cook.',
    project: {
      category: 'AI app', difficulty: 'Beginner', time: '2–4 hours', icon: 'chef',
      pitch: 'Got eggs, rice and leftover adobo? Get 3 recipes you can cook right now.',
      learn: ['Your first AI feature with a simple API call', 'Image input (vision) with AI', 'Structured AI output turned into nice UI'],
      features: ['Add ingredients as chips (or upload a fridge photo)', 'Filters: time, budget, difficulty, cuisine', '3 recipe cards with steps, time and missing ingredients', 'Save favorites', 'Shopping list for missing items'],
      stack: [
        { layer: 'Framework', choice: 'Next.js + TypeScript', why: 'Server route for the AI call keeps your key secret.' },
        { layer: 'AI', choice: 'Vercel AI SDK + a small vision-capable model', why: 'Reads photos of ingredients and returns structured recipes.' },
        { layer: 'UI', choice: 'Tailwind CSS + shadcn/ui + Motion', why: 'Delicious-looking cards with nice transitions.' },
        { layer: 'Data', choice: 'localStorage', why: 'Favorites and shopping list, no backend needed.' },
      ],
      model: { pick: 'Builder: Claude (great food-app UI). Inside the app: a small vision model (Gemini Flash, Claude Haiku or a GPT mini model)', why: 'Small models are cheap per request and good enough for recipes.', alt: 'Antigravity + Gemini for a fully free experiment.' },
      harness: { pick: 'Claude Code or Antigravity', why: 'Antigravity can test the UI in its built-in browser.' },
      skills: [
        { name: 'frontend-design', why: 'Food apps live or die by how appetizing they look.' },
        { name: 'ui-ux-pro-max', why: 'Pick a warm, appetizing palette and fonts.' },
      ],
      masterPrompt: `Build "Fridge Chef", a web app that suggests recipes from the ingredients I have.

STACK
Next.js (App Router) + TypeScript + Tailwind CSS + shadcn/ui + Motion + Vercel AI SDK + Zod. AI key only in .env.local, used only in a server route. Check current AI SDK docs for structured output and image input.

FEATURES
1. Ingredient input: type and press Enter to add chips, with quick-add common items (egg, rice, garlic, onion, chicken, canned tuna, noodles…).
2. Optional: upload a photo of the fridge or ingredients. The AI detects ingredients and adds them as chips I can remove.
3. Filters: max cooking time, budget (₱), difficulty, cuisine (Filipino, Asian, Western, Any), and "only use what I have".
4. Generate 3 recipes (structured output): name, short description, time, difficulty, estimated cost in ₱, ingredients (marking which ones I am missing), numbered steps, one tip.
5. Recipe detail view with a step-by-step cooking mode (one big step at a time, keeps screen readable).
6. Save favorites and a shopping list of missing ingredients (localStorage).

DESIGN
Warm and appetizing: cream background, warm accent color, rounded cards, friendly food emoji. Mobile first, since people use it in the kitchen.

DONE WHEN
- Ingredients in → 3 good recipes out, with missing items marked
- Photo upload detects ingredients
- npm run build passes

${WORKFLOW}`,
      buildSteps: [
        { title: 'Better recipes', prompt: 'Improve the recipe prompt: prefer common Filipino household ingredients and realistic student budgets, never invent weird combinations, and include safety notes for chicken and pork doneness.' },
        { title: 'Pantry mode', prompt: 'Add a "My pantry" list of things I always have (salt, oil, soy sauce, garlic) that are automatically included.' },
        { title: 'Share a recipe', prompt: 'Add a share button that creates a nice image card of the recipe I can post or send on Messenger.' },
      ],
      pitfalls: [
        'Large photos are slow and expensive: resize images in the browser before uploading.',
        'AI may suggest unsafe or nonsense recipes: your system prompt should set clear rules.',
      ],
      stretch: ['Weekly meal planner with a budget', 'Nutrition estimates', 'Expo mobile version with the camera'],
    },
  },
  {
    slug: 'platformer',
    title: '2D platformer game',
    summary: 'Run, jump and collect coins across levels. Learn real game development with a game engine.',
    project: {
      category: 'Game', difficulty: 'Intermediate', time: '5–8 hours', icon: 'trophy',
      pitch: 'Your own Mario-style platformer with levels, enemies, coins and a boss. Share it with friends.',
      learn: ['Using a game engine (physics, sprites, scenes)', 'Level design with tilemaps', 'Game feel: jumping that feels good'],
      features: ['Player with run, jump and double jump', 'Platforms, coins, spikes and patrolling enemies', '3 levels with a goal flag', 'Lives, score, and a pause menu', 'Keyboard and on-screen touch controls'],
      stack: [
        { layer: 'Engine', choice: 'Phaser + TypeScript', why: 'The most popular 2D web game engine. AI knows it very well.' },
        { layer: 'Build tool', choice: 'Vite', why: 'Fast dev server, simple builds.' },
        { layer: 'Art', choice: 'Kenney.nl free assets (or shapes drawn in code)', why: 'High-quality free (CC0) sprites and tiles.' },
        { layer: 'Levels', choice: 'Tiled map editor (optional) or levels as arrays in code', why: 'Easy to design and edit levels.' },
        { layer: 'Hosting', choice: 'itch.io or Vercel', why: 'Share your game with the world.' },
      ],
      model: { pick: 'GPT in Codex or Claude Opus', why: 'Game physics and state machines benefit from strong reasoning.', alt: 'Claude Sonnet is great for menus, UI and polish.' },
      harness: { pick: 'Codex or Claude Code', why: 'Run the game in the browser and describe what feels wrong. Game feel is all about iteration.' },
      skills: [
        { name: 'superpowers', why: 'systematic-debugging is gold for weird physics bugs.' },
        { name: 'find-skills', why: 'Search for a Phaser or game-dev skill for engine-specific tips.' },
      ],
      masterPrompt: `Build a 2D side-scrolling platformer game for the browser.

STACK
Phaser (latest stable) + TypeScript + Vite. Use Arcade Physics. Organize code by scenes (Boot, Menu, Game, UI overlay, GameOver) and entities (Player, Enemy, Coin). For v1, draw simple colorful shapes in code or use Kenney.nl CC0 assets if I add them to /public/assets.

GAMEPLAY
- Player: run left/right, jump, double jump. Use coyote time (a short grace period after leaving a ledge) and jump buffering so controls feel fair. Variable jump height (hold to jump higher).
- Camera follows the player smoothly. Levels are wider than the screen.
- Coins (+10), spikes (lose a life), enemies that patrol back and forth (stomp them from above to defeat them).
- Goal flag at the end of each level. 3 levels with increasing difficulty, defined as tile arrays in a levels file so they are easy to edit.
- 3 lives, score, coin counter. Game over and win screens. High score in localStorage.

CONTROLS
Arrows/WASD + Space on keyboard. On touch devices, show on-screen left/right/jump buttons.

FEEL
Squash and stretch on jump and land, dust particles, small screen shake when hit, simple sound effects with Web Audio.

DONE WHEN
- All 3 levels can be completed, enemies and hazards work
- Jumping feels responsive, no getting stuck in walls
- Runs at 60fps, npm run build passes

${WORKFLOW}`,
      buildSteps: [
        { title: 'Tune the jump', prompt: 'The jump feels [floaty / too heavy / too short]. Expose gravity, jump speed and run speed as constants at the top of the file and tune them so it feels snappy like a classic platformer. Explain each value.' },
        { title: 'Level design', prompt: 'Help me design level 2 as a tile array: introduce moving platforms gradually. Explain the design idea behind each section.' },
        { title: 'Boss fight', prompt: 'Add a simple boss at the end of level 3 with a 3-hit pattern and a health bar.' },
        { title: 'Publish', prompt: 'Build for production and give me step-by-step instructions to publish it on itch.io as a playable HTML game.' },
      ],
      pitfalls: [
        'Player falls through floors at high speed: ask for proper collision setup and capped fall speed.',
        'Phaser versions differ: tell the agent to check the current Phaser docs and examples.',
      ],
      stretch: ['A level editor', 'Online leaderboard with Supabase', 'Gamepad support'],
    },
  },
  {
    slug: 'sari-sari-pos',
    title: 'Sari-sari store inventory & POS',
    summary: 'A real business tool: track stock, sell items, record utang and see daily sales. Help your tita or a local store!',
    project: {
      category: 'Web app', difficulty: 'Intermediate', time: '6–8 hours', icon: 'package',
      pitch: 'A simple point-of-sale for small stores: fast selling, low-stock alerts, utang tracking and daily reports.',
      learn: ['Building software for a real user', 'Transactions that update multiple tables safely', 'Reports and data on a dashboard'],
      features: ['Product list with price, cost and stock', 'Fast sell screen with search and big buttons', 'Automatic stock deduction and low-stock alerts', 'Utang (credit) per customer with payments', 'Daily sales, profit and best sellers'],
      stack: [
        { layer: 'Framework', choice: 'Next.js + TypeScript', why: 'Works on a phone or tablet at the counter.' },
        { layer: 'UI', choice: 'Tailwind CSS + shadcn/ui', why: 'Fast, clear tables, dialogs and buttons.' },
        { layer: 'Backend', choice: 'Supabase (Postgres + Auth)', why: 'Data safe in the cloud. Postgres functions keep a sale + stock update consistent.' },
        { layer: 'App feel', choice: 'PWA', why: 'Installable on the store owner\'s phone like a real app.' },
      ],
      model: { pick: 'GPT in Codex or Claude Opus for the data model; Sonnet for screens', why: 'Money and stock must always be correct. Careful planning matters.', alt: 'Any top model with a second-model review.' },
      harness: { pick: 'Codex or Claude Code + a reviewer', why: 'Have a second model review the sale logic before real use.' },
      skills: [
        { name: 'supabase-postgres-best-practices', why: 'Correct schema, a database function for atomic sales, and RLS.' },
        { name: 'superpowers', why: 'Use brainstorming with the real store owner\'s needs, then writing-plans.' },
        { name: 'web-design-guidelines', why: 'Readable and usable for non-tech users (big text, clear buttons).' },
      ],
      masterPrompt: `Build a simple inventory and point-of-sale (POS) web app for a Filipino sari-sari store, called "[name]". The user is a store owner who is not techy and uses a phone.

STACK
Next.js (App Router) + TypeScript + Tailwind CSS + shadcn/ui + Supabase (auth + Postgres). PWA so it can be installed on a phone. Peso (₱) currency.

DATA (RLS ON: each store owner only sees their own store's data)
- products: id, user_id, name, category, price, cost, stock, low_stock_level, barcode (optional), active
- customers: id, user_id, name, phone, notes
- sales: id, user_id, customer_id (nullable), total, profit, paid (boolean), created_at
- sale_items: id, sale_id, product_id, qty, price, cost
- utang_payments: id, user_id, customer_id, amount, created_at
Recording a sale must be ONE database function (RPC) that inserts the sale and items and deducts stock in a single transaction, and rejects the sale if stock is not enough.

SCREENS
1. Sell (home): search + grid of big product buttons with stock count. Tap to add to cart, +/- quantity. Total in huge text. "Paid (cash)" or "Utang" (pick or add customer). Cash given → shows sukli (change).
2. Products: add / edit, restock (+qty), low-stock badge.
3. Utang: customers with balance, history, record payment.
4. Reports: today / this week / this month sales, profit, number of sales, top 5 products, low-stock list.

UX
Very big text and buttons, simple words (Taglish labels OK, e.g. "Utang", "Sukli"), works one-handed, fast. Confirm before deleting anything.

DONE WHEN
- A sale correctly reduces stock and shows in reports
- Utang balance = utang sales − payments, always correct
- Two different accounts never see each other's data
- npm run build passes

${WORKFLOW}`,
      buildSteps: [
        { title: 'Test with the real owner', prompt: 'Here is feedback from the store owner after using it: [paste]. Prioritize the changes and implement the top 3.' },
        { title: 'Barcode scanning', prompt: 'Add barcode scanning using the phone camera to find products and add them to the cart.' },
        { title: 'Offline mode', prompt: 'Make the Sell screen work when the internet is down: queue sales locally and sync when back online. Explain the risks.' },
        { title: 'Daily summary', prompt: 'Add an end-of-day summary screen with total sales, cash expected in the drawer, utang added, and items to restock.' },
      ],
      pitfalls: [
        'Stock going negative when two sales happen at once: that is why the sale must be one database transaction.',
        'Building what YOU think they need. Watch the real owner use it for 10 minutes. You will learn a lot.',
      ],
      stretch: ['Multiple staff accounts per store', 'SMS reminders for utang', 'Supplier orders'],
    },
  },
  {
    slug: 'event-board',
    title: 'Class event & RSVP board (realtime)',
    summary: 'Create events for your class or org, share a link, and watch RSVPs and comments appear live.',
    project: {
      category: 'Web app', difficulty: 'Intermediate', time: '5–7 hours', icon: 'users',
      pitch: 'One link for every class event: RSVP, who is coming, what to bring, live updates for everyone.',
      learn: ['Realtime updates with Supabase', 'Shareable public pages', 'Roles: organizer vs guest'],
      features: ['Create events with date, place, cover image', 'Public share link, RSVP Going / Maybe / Not going', 'Live guest list and comments', '"What to bring" list that people can claim', 'Add to Google Calendar button'],
      stack: [
        { layer: 'Framework', choice: 'Next.js + TypeScript', why: 'Public event pages with good link previews.' },
        { layer: 'UI', choice: 'Tailwind CSS + shadcn/ui + Motion', why: 'Live lists that animate as people join.' },
        { layer: 'Backend', choice: 'Supabase (Auth, Postgres, Realtime, Storage)', why: 'Realtime RSVPs and comments, and cover images.' },
        { layer: 'Hosting', choice: 'Vercel', why: 'Share the link anywhere.' },
      ],
      model: CLAUDE_MODEL,
      harness: { pick: 'Claude Code or Codex', why: 'Test realtime with two browser windows side by side.' },
      skills: [
        { name: 'supabase-postgres-best-practices', why: 'RLS for public-read but owner-edit data is tricky. This helps.' },
        { name: 'frontend-design', why: 'Event pages should feel exciting to open.' },
        { name: 'deploy-to-vercel', why: 'You need a live link to share with classmates.' },
      ],
      masterPrompt: `Build a realtime event and RSVP web app for classes and student orgs, called "[name]".

STACK
Next.js (App Router) + TypeScript + Tailwind CSS + shadcn/ui + Motion + Supabase (Auth with Google + magic link, Postgres, Realtime, Storage).

DATA (RLS ON)
- events: id, owner_id, title, description, starts_at, ends_at, location, cover_url, slug (unique, for the share link), created_at
- rsvps: id, event_id, user_id, status (going | maybe | not_going), unique(event_id, user_id)
- comments: id, event_id, user_id, body, created_at
- bring_items: id, event_id, name, claimed_by (nullable)
- profiles: id, display_name, avatar_url
Policies: anyone with the link can read an event and its RSVPs/comments; only logged-in users can RSVP/comment; only the owner can edit or delete the event; users can only edit their own RSVP and comments.

PAGES
1. My events: events I organize and events I RSVP'd to. "Create event" button.
2. Create / edit event with cover image upload.
3. Public event page /e/[slug]: cover, details, countdown, RSVP buttons, live guest list grouped by status with avatars, "What to bring" list with claim buttons, comments. New RSVPs and comments appear instantly for everyone (Supabase Realtime) with a subtle animation.
4. Add to Google Calendar link and a Copy link button.

DESIGN
Fun and modern, like a party invite: big cover image, bold title, colorful status chips. Mobile first. Good link preview (Open Graph title, description, image) when shared on Messenger.

DONE WHEN
- With two browsers logged in as different users, an RSVP in one appears in the other within a second
- Non-owners cannot edit the event (test it)
- npm run build passes

${WORKFLOW}`,
      buildSteps: [
        { title: 'Realtime test', prompt: 'Help me test realtime: open two browser profiles as two users, RSVP and comment. If updates are not instant, find out why (Realtime enabled on the tables? Policies?).' },
        { title: 'Organizer tools', prompt: 'Add an organizer view: export the guest list to CSV, send an announcement shown at the top of the event page, and close RSVPs.' },
        { title: 'Reminders', prompt: 'Send an email reminder with Resend to all "going" guests 24 hours before the event. Explain how to schedule it with Supabase cron.' },
        { title: 'Deploy & share', prompt: 'Deploy to Vercel, update the Supabase auth redirect URLs, and check that the link preview looks good.' },
      ],
      pitfalls: [
        'Realtime not working: Realtime must be enabled for each table, and RLS still applies to what users receive.',
        'Login redirect fails on the live site until the Vercel URL is added in Supabase auth settings.',
      ],
      stretch: ['Attendance check-in with a QR code', 'Photo album after the event', 'Polls ("Which date works best?")'],
    },
  },
]

const libraryIntro: Lesson = {
  slug: 'how-to-use',
  title: 'How to use the project library',
  summary: 'Pick a project, copy the master prompt, and follow the build steps. Here is how to get the most out of it.',
  minutes: 5,
  blocks: [
    { type: 'p', text: "This course is a **library of real projects**. Each one is a complete package: everything the architect from Course 4 would give you, already done. You get the stack, the best AI setup, the skills to install, a copy-paste master prompt and the follow-up prompts in order." },
    { type: 'h2', text: 'What is inside each project' },
    { type: 'cards', items: [
      { icon: 'layers', title: 'Tech stack', text: 'Every tool, with one sentence on why it was chosen.' },
      { icon: 'brain', title: 'Best AI setup', text: 'Which model and harness fit this project, and an alternative.' },
      { icon: 'puzzle', title: 'Skills', text: 'Which skills to install and what they help with.' },
      { icon: 'sparkles', title: 'Master prompt', text: 'One detailed prompt that builds a working v1.' },
      { icon: 'list', title: 'Build steps', text: 'Follow-up prompts to send one at a time after v1 works.' },
      { icon: 'alert', title: 'Pitfalls', text: 'The mistakes beginners usually hit, so you can avoid them.' },
    ] },
    { type: 'h2', text: 'Pick by difficulty' },
    { type: 'table', headers: ['Level', 'Projects', 'You need'], rows: [
      ['**Starter**', 'Portfolio, Focus timer, Pixel Snake', 'Courses 1–3. No database.'],
      ['**Beginner**', 'Flashcards, Habit tracker, Fridge Chef', 'Comfortable with the build loop. First mobile and AI features.'],
      ['**Intermediate**', 'Budget tracker, Gym logger, AI study buddy, Platformer, Sari-sari POS, Event board', 'Accounts, databases, security, realtime. Do Courses 7–8 alongside.'],
    ] },
    { type: 'h2', text: 'The recipe for every project' },
    { type: 'steps', items: [
      { title: 'Read the whole project page first', text: 'Understand what you are building before you start.' },
      { title: 'Customize the master prompt', text: 'Fill in the [brackets]: your app name, colors, your info. Change features you do not want. Make it yours!' },
      { title: 'New folder, install skills, plan mode', text: 'Create an empty folder, install the listed skills, open your agent and turn on plan mode.' },
      { title: 'Paste, read the plan, approve', text: 'Read the plan before approving. Correct anything that looks wrong.' },
      { title: 'Test, commit, then build steps', text: 'Once v1 works, commit it, then send the build steps one at a time with testing and a commit after each.' },
      { title: 'Deploy and share', text: 'Course 7 shows how. Send the link to your classmates!' },
    ] },
    { type: 'callout', tone: 'tip', title: 'For the seminar', text: "Do a **Starter** project alone first so everyone learns the loop. Then form groups and pick one **Intermediate** project per group. Assign roles: one person runs the architect chat, one runs the builder, one tests on phones, one reviews with a second model. Rotate roles every session." },
    { type: 'callout', tone: 'info', text: "These master prompts are a strong starting point, not magic. Tools and versions change, so if something fails, use what you learned in Course 3: paste the error, ask for the root cause, point it at current docs." },
  ],
}

export const projects: Course = {
  number: 6,
  slug: 'projects',
  title: 'Project library',
  tagline: '12 guided builds, each with a master prompt, stack, skills and the best AI for the job.',
  icon: 'rocket',
  lessons: [libraryIntro, ...entries.map((e) => ({ slug: e.slug, title: e.title, summary: e.summary, minutes: 8, blocks: [], project: e.project }))],
}
