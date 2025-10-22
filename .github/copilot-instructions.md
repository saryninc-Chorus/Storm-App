# Copilot Instructions for AI Coding Agents

## Project Overview
This is a Vite-based React app integrating AI services, voice features, and authentication. The architecture is modular, with clear separation between UI components and service logic.

## Key Files & Structure
- `App.tsx`, `index.tsx`: Main app entry and root rendering.
- `components/`: UI components (e.g., `CommandPalette.tsx`, `InputBar.tsx`, `VoiceSelectionModal.tsx`).
- `services/`: Service modules for AI (`aiService.ts`), authentication (`authService.ts`), and voice (`deepgramService.ts`).
- `types.ts`: Shared TypeScript types.
- `manifest.json`, `metadata.json`: App metadata/configuration.
- `sw.js`: Service worker for offline/PWA support.
- `.env.local`: Stores secrets (e.g., `GEMINI_API_KEY`).

## Developer Workflow
- **Install dependencies:** `npm install`
- **Set up API keys:** Add `GEMINI_API_KEY` to `.env.local`.
- **Run locally:** `npm run dev`
- **Build for production:** `npm run build`

## Patterns & Conventions
- **Component-Driven:** UI logic is in `components/`, business logic in `services/`.
- **Service Abstraction:** External APIs (AI, auth, voice) are wrapped in service modules for easy mocking/testing.
- **Type Safety:** Shared types in `types.ts`.
- **Environment Variables:** Sensitive keys are loaded from `.env.local`.
- **Minimal Global State:** Prefer passing props/context over global stores.

## Integration Points
- **AI Service:** Interacts with Gemini API (see `aiService.ts`).
- **Voice Service:** Uses Deepgram (see `deepgramService.ts`).
- **Authentication:** Managed in `authService.ts`.

## Example: Adding a New Service
1. Create a new file in `services/` (e.g., `newService.ts`).
2. Export functions/classes for API interaction.
3. Import and use in components as needed.

## Debugging & Testing
- Use Vite's hot reload for rapid UI iteration.
- Mock service modules for isolated component testing.
- Check `.env.local` for required keys if API calls fail.

## References
- See `README.md` for setup and run instructions.
- Review `components/` and `services/` for code patterns.

---
_If any section is unclear or missing, please provide feedback to improve these instructions._
