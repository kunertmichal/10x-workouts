This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Testing

This project uses a comprehensive testing setup to ensure code quality and reliability:

### Unit and Integration Tests

- **Vitest** - Fast unit test runner with TypeScript support
- **React Testing Library** - Simple and complete testing utilities for React components

### End-to-End Tests

- **Playwright** - Modern end-to-end testing framework for web apps

### Mocking and Test Data

- **MSW (Mock Service Worker)** - API mocking library for browser and Node.js
- **@faker-js/faker** - Generate massive amounts of fake data in the browser and Node.js

### CI/CD

- **GitHub Actions** - Automated testing pipeline for continuous integration

Run tests with:

```bash
# Unit and integration tests
npm run test

# End-to-end tests
npm run test:e2e

# Test coverage
npm run test:coverage
```

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
