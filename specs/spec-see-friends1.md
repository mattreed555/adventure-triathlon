Goal
- Allow the user to see the status of their friends Adventure Triathlon progress
- This is an MVP version so I don't want to be fancy for now.  Something simple that gets the job done.  We may want to build this out in the future, but I'm not sure how, so keep it simple.
- NOTE: Friend relationships will be added in the future. For MVP, show all users in the database.

UX 
- When the user clicks the "See Friends" button in the main app (existing wired-button with id="see-friends-button" in index.html), open a pop up window with all the other users and a bar chart of their progress.
- The pop up should be based upon Wired Elements like all other popups in the app. The visualizations should use RoughJS just like the main app.  It should feel naturally part of the application experience.
- The layout:
  - The header says "Friend Group"
  - There is a list of friends and their progress.
  - Show the avatar of the user, the same size as the avatar on the main page, surrounded by a RoughJS circle border (black for other users, purple border for the current logged-in user - matching the main app's avatar style).
  - Each avatar should have a tooltip showing the user's friendly_name when hovered over, just like the avatar on the main page.
  - Show the overall progress bar visualization (the one that appears next to the user's avatar on the main page) - exact same size and format.
  - The progress bar should have a tooltip showing the total percentage completed (e.g., "45% complete").
  - The avatar and bar chart should be centered vertically on the same line
  - The friends list shows all users in the database, ordered by friendly_name alphabetically (from UserInfo table).
  - The popup should have a fixed height to show approximately 6 user rows. If there are more users, a scrollbar appears around the friend list only.
- When the user is ready to leave, there is a close button in the bottom right of the popup. This button remains visible at all times (outside the scrollable area).
- Layout structure:
  - Header (fixed position)
  - Scrollable friend list (max 6 rows visible)
  - Close button (fixed position at bottom)

Data & Error Handling
- User data comes from the UserInfo table which contains: user_id, friendly_name, avatar_url
- Progress data will need to be aggregated from the activities table
- If a user has no progress data yet, show "Not started" text instead of the progress bar
- Avatar fallback: Use the first two letters of friendly_name if avatar_url is missing
- There will always be at least one user (the logged-in user)

Implementation Recommendations
- Create a Supabase database view (user_progress_summary) that:
  - Joins UserInfo and activities tables
  - Calculates aggregate progress for each user
  - Returns: user_id, friendly_name, avatar_url, and progress metrics
  - Simplifies client-side queries
- Database view benefits:
  - Handles complex aggregation server-side
  - Reduces data transfer
  - Provides consistent progress calculations
  - Easy to modify without changing client code
- Client implementation:
  - Add event handler to existing "see-friends-button"
  - Create Wired Elements dialog popup
  - Query the database view for all users
  - Render using existing RoughJS visualization functions
  - Reuse avatar and progress bar rendering logic from main app

