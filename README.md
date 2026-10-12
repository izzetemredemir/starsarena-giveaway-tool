# Stars Arena Giveaway Tool

A small Node.js service that picks a giveaway winner on Stars Arena, an Avalanche-based SocialFi app, from the accounts that replied to a given post.

> **Status:** archived. Built in 2023. Kept for reference, not maintained.

<img width="633" alt="Giveaway page with a post URL field and a Start Giveaway button" src="https://github.com/izzetemredemir/starsarena-giveaway-tool/assets/11755605/16280666-86c1-4cdd-8ddc-52b43c9b1a13">

## What it does

- Exposes `GET /getRandomHandle?url=<post URL>` and extracts the thread ID from the post URL (the part after `/status/`).
- Fetches every page of the post's replies from the Stars Arena API, using a bearer token from `AUTH_TOKEN`.
- Removes duplicate reply authors, so each account counts once, then returns one handle picked with `Math.random()` and the number of unique participants.
- `files/index.html` is a static page where you paste a post URL and see the participant count and the winner.

## Tech stack

- Node.js 18, Fastify with `@fastify/cors`, axios, dotenv
- Docker

## Running it locally

```bash
npm install
cp .env.example .env     # set AUTH_TOKEN to a Stars Arena bearer token
node index.js            # listens on $PORT, default 3000
```

Then call `http://localhost:3000/getRandomHandle?url=<post URL>`. To use `files/index.html`, change its `apiUrl` to your server: it still points at the original hosted backend, which is no longer online.

With Docker:

```bash
docker build -t starsarena-giveaway-tool .
docker run -p 3000:3000 --env-file .env starsarena-giveaway-tool
```

## License

MIT, see [LICENSE](LICENSE).
