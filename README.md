# Code Before AI

A Windows XP-flavored event site for programmers telling stories about writing
code before AI.

## Prerequisites

- Node.js `>=22.13.0`

## Wix Events

The app reads events from Wix Events and sends RSVPs there when credentials are
available. Without credentials it falls back to the built-in demo events, so the
site still previews locally.

Create `.env.local`:

```bash
WIX_API_KEY="your-wix-api-key"
WIX_SITE_ID="your-wix-site-id"
```

`WIX_ACCOUNT_ID` can be used instead of `WIX_SITE_ID` for account-scoped API
keys.

## Quick Start

```bash
npm ci
npm run dev
npm run build
```

## Useful Commands

- `npm run dev`: start local development
- `npm run build`: verify the vinext build output
- `npm run db:generate`: generate Drizzle migrations after schema changes
- `CI=1 npx @wix/cli@latest release`: publish the static Wix-hosted
  `wix-static` build configured in `wix.config.json`

## Wix Hosting

Wix managed hosting serves `wix-static/index.html`. The interactive local app
still uses server routes for local previews, but the hosted version links each
RSVP button to the matching Wix Events page so Wix handles registration forms
directly.

## Learn More

- [vinext Documentation](https://github.com/cloudflare/vinext)
- [Drizzle D1 Guide](https://orm.drizzle.team/docs/get-started/d1-new)
