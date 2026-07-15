# Quizzo: The Smart Teaching Assistant

### Deployed Link:
[https://quizzo-teacher-assistant.netlify.app/](https://quizzo-teacher-assistant.netlify.app/)

Frontend Local Command: `npm run dev`

Built a full-stack AI application using Next.js (React + Tailwind CSS + TypeScript) and Node.js/Express, powered by Google Gemini API function calling. The assistant helps teachers generate quizzes, grade short-answer responses, and summarize class performance. I used the `gemini-1.5-flash` model alongside other modals as they support function calling.

### Frontend (Next.js + Tailwind CSS + TypeScript)
- **Framework**: Next.js App Router.
- **Pages**: Login, Register, Chat Dashboard.
- **State Management**: React Context or Zustand for Auth and Chat state.
- **UI Components**: ChatWindow, MessageBubble, ToolCallIndicator.

## Step-by-Step Build Process
**Frontend Setup**: Initialize Next.js project with Tailwind CSS and TypeScript.
**Frontend UI**: Build the Login/Register pages and the main Chat interface with tool call indicators.
**Integration & Polish**: Connect the frontend to the backend, handle loading/error states, and ensure mobile responsiveness.

## Verification Plan

### Automated Tests
- Run simple Jest tests for one tool's execution logic.
- Run tests for auth flow (e.g., rejecting an invalid token).

### Manual Verification
- Test registration and login flow.
- Send a message asking to "generate a quiz about photosynthesis" and verify the tool is called and UI updates.
- Test grading and summarization flows.

