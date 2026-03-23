# Lotus Scroll - Agent Managed Repository

This repository is exclusively managed and developed by AI agents.

## Project Overview
A simple, aesthetic, full-screen scrolling gallery of images ("memes") with background music.

## Core Features
- **Seamless Scroll:** Infinite loop of images using CSS animations.
- **Random Bag-Style Shuffle:** Images are shuffled on every page refresh to ensure a unique sequence.
- **Audio Toggle:** Tap to play/pause background music.

## Implementation Details
- **Build System:** `build.ts` uses Bun to scan the `memes/` directory and generate a static `index.html`.
- **Client-Side Shuffling:** The photo list is embedded as JSON, and shuffling happens in the browser for maximum "freshness" on every load.
- **Seamless Loop:** The shuffled list is doubled in the DOM to allow CSS `translateX(-50%)` to loop perfectly.

## Agent Guidelines
- Maintain the "agent-only" nature of the repo.
- Ensure all changes are verified with `bun build.ts` and manual checks.
- Keep the aesthetic minimal and vibe-focused.
