# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a web application for "Adventure Triathlon 2025" - a fitness tracking application focused on triathlon training activities. The application is now split into three files for better organization: HTML markup, CSS styles, and JavaScript functionality.

## File Structure

- **index.html**: Main HTML markup and structure
- **styles.css**: All CSS styles and layout definitions  
- **script.js**: JavaScript functionality and application logic

## Architecture

- **Client-side only**: No server-side components or build process
- **External dependencies**: Uses CDN-hosted libraries including:
  - Twemoji for emoji rendering
  - RoughJS for hand-drawn style graphics
  - Runes for text processing
  - Wired Elements for UI components
- **Local storage**: User data persists in browser localStorage

## Key Functionality

The application tracks various triathlon and fitness activities with:
- Activity tracking (swimming, biking, running, rucking, paddleboarding, kayaking, etc.)
- Progress visualization with hand-drawn style charts
- Goal setting and progress monitoring
- Data export/sharing capabilities
- Monthly progress interpolation

## Development Workflow

Since there's no build process:
- Open `index.html` directly in a browser to test changes
- Modify `styles.css` for styling changes
- Modify `script.js` for functionality changes
- No package managers, build tools, or testing frameworks are used

## Code Structure

Key JavaScript functions in `script.js`:
- `updateProgress()`: Core progress calculation and display
- `saveProgress()`: Persists data to localStorage
- `createDropdown()`: UI interaction handling
- `shareProgress()`: Data export functionality
- Various activity-specific update functions (`updateSwimming()`, etc.)

## Styling

Uses a hand-drawn/sketchy aesthetic with:
- Gloria Hallelujah and Special Elite fonts
- Wired Elements for UI components
- Custom CSS for layout and theming