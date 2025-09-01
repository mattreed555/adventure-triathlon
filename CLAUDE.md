# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a web application for "Adventure Triathlon 2025" - a fitness tracking application focused on triathlon training activities with authentication and user data persistence.

## File Structure

### Core Application Files
- **index.html**: Main HTML markup and structure
- **styles.css**: All CSS styles and layout definitions  
- **script.js**: JavaScript functionality and application logic

### Authentication & Landing Page
- **landing-page.js**: Generates landing page HTML and handles sketchy border initialization
- **landing-styles.css**: CSS styles for landing page (MUST be committed with any landing page changes!)
- **auth.js**: AuthManager class handling all authentication operations
- **config.js**: Centralized Supabase configuration
- **ui-manager.js**: UIManager controlling landing vs app view based on auth state

## Architecture

- **Client-side only**: No server-side components or build process
- **Authentication**: Supabase-based with Google OAuth and Magic Link support
- **Single-entry-point pattern**: All navigation through index.html with dynamic view switching
- **External dependencies**: Uses CDN-hosted libraries including:
  - Twemoji for emoji rendering
  - RoughJS for hand-drawn style graphics (also used for sketchy borders on landing page)
  - Runes for text processing
  - Wired Elements for UI components
  - Supabase for authentication and data persistence
- **Data storage**: 
  - User preferences and activity data in Supabase database
  - Local storage for offline capability
  - UserInfo table for avatar URLs

## Key Functionality

The application tracks various triathlon and fitness activities with:
- Activity tracking (swimming, biking, running, rucking, paddleboarding, kayaking, etc.)
- Progress visualization with hand-drawn style charts
- Goal setting and progress monitoring
- Data export/sharing capabilities
- Monthly progress interpolation
- Friends feature to view other users' progress

## Development Workflow

Since there's no build process:
- Open `index.html` directly in a browser to test changes
- Modify `styles.css` for styling changes
- Modify `script.js` for functionality changes
- No package managers, build tools, or testing frameworks are used

## Code Structure

Key JavaScript functions in `script.js`:
- `updateProgress()`: Core progress calculation and display
- `saveProgress()`: Persists data to localStorage and Supabase
- `createDropdown()`: UI interaction handling
- `shareProgress()`: Data export functionality
- Various activity-specific update functions (`updateSwimming()`, etc.)
- `showFriends()`: Displays popup with all users' progress
- `createAvatarSVG()`: Modular avatar creation (74x74 SVG, 60x60 image)
- `createFriendRow()`: Renders each friend in the popup
- `calculateFriendProgress()`: Calculates progress percentages for friends

## Styling

Uses a hand-drawn/sketchy aesthetic with:
- Gloria Hallelujah and Special Elite fonts
- Wired Elements for UI components
- Custom CSS for layout and theming
- RoughJS for sketchy borders on landing page boxes

## Landing Page Design Requirements

The landing page consists of:
1. **Logo**: Centered at top (adventure-triathlon-logo.svg, 550x51px)
2. **Hero box**: 600px wide with sketchy border containing:
   - Title: "Track Your Active Summer Journey"
   - Tagline and three activity icons (swim, bike, run)
3. **Auth box**: Same 600px width with sketchy border containing:
   - Google OAuth button and Magic Link email input
4. **Footer**: Centered below auth box with 30px gap
   - Contains chickpea logo and "BLACK MARKET hummus + design collective"

**IMPORTANT**: The footer must be centered horizontally beneath the bottom box, not in the bottom-right corner of the screen. Both boxes must be the same width (600px).

## Authentication Flow

1. User lands on landing page (landing-page.js generates HTML)
2. User authenticates via Google OAuth or Magic Link (auth.js)
3. UIManager switches from landing view to app view (ui-manager.js)
4. User avatar loaded from UserInfo table with initials fallback (script.js)
5. Logout returns user to landing page, not production domain

## Friends Feature

The "See Friends" button displays a popup showing all users' progress:
- **Database View**: `user_progress_summary` joins UserInfo and triathlon_activities tables
- **UI Components**:
  - Wired Elements dialog with "Friend Group" header
  - Scrollable list (max 6 rows visible)
  - Each row shows avatar (74x74) and progress bar (380x35)
- **Visual Details**:
  - Avatars use same component as main page (`createAvatarSVG`)
  - Current user has purple border (#4806d8), others have black (#0e0f0d)
  - Progress bars match main page visualization with tooltips showing percentage
  - Tooltips on avatars show friendly_name
- **Data Handling**:
  - Queries all users ordered by friendly_name
  - Calculates progress using same logic as main app
  - Shows "Not started" for users with no progress
  - Initials fallback using first 2 letters of friendly_name