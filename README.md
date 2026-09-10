# playmates

A social gaming prototype built around **Gaming DNA**, taste matching, community, and creator content.

## What's included

- Next.js + React + TypeScript
- Responsive dark UI inspired by the current playmates concept
- Interactive onboarding and game selection
- Gaming DNA reveal and archetype exploration
- People discovery and taste-match detail
- Local conversation demo
- Community feed with Twitch / YouTube / Kick-style content
- Profile with connected-platform controls

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Deploy

The easiest path is GitHub → Vercel. Push this folder to a GitHub repository, import the repository into Vercel, and deploy.

## Next production steps

1. Add Supabase authentication and Postgres.
2. Add a real game metadata provider such as IGDB.
3. Persist users, games, ratings, archetypes, follows, posts, and messages.
4. Build the Gaming DNA scoring model.
5. Add OAuth connections for Twitch, YouTube, Kick, Discord, Steam, and Xbox.
6. Pull creator content into the unified social feed.
7. Add moderation, reporting, privacy controls, and account deletion.
