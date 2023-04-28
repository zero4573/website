# Nuxt 3 Minimal Starter

Look at the [Nuxt 3 documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

## Setup

Make sure to install the dependencies:

```bash
# npm (--legacy-peer-deps is needed for pinia)
npm install --legacy-peer-deps
```

## Development Server

Start the development server on `http://localhost:3000`

```bash
npm run dev
```

## Production

Build the application for production (this project only uses static pages):

```bash
npm run generate
```

Locally preview production build:

```bash
docker run --name test --rm -p 80:80 -v $(pwd)/dist:/usr/share/nginx/html/:ro nginx
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.
