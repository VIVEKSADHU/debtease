# DebtEase & HomeStock

This is a Next.js application built with Firebase that helps you track debts and manage home inventory lists.

## Getting Started

To get the development server running locally, you'll first need to install the dependencies.

```bash
npm install
```

Then, run the development server:

```bash
npm run dev
```

Open [http://localhost:9002](http://localhost:9002) with your browser to see the result.

## Features

*   **Firebase Authentication**: Secure user login and signup.
*   **Firestore Database**: Real-time database for storing customers, debts, and shopping lists.
*   **Debt Tracking**: Add customers and track the money they owe you.
*   **List Management**: Create and manage a market shopping list and a home restock list.
*   **Modern UI**: Built with Next.js, Tailwind CSS, and ShadCN UI components.

## Deployment

This application is configured for deployment on Firebase App Hosting. When you push your code to a connected GitHub repository, it will be built and deployed automatically. The necessary Firebase configuration is injected during the build process, so you don't need to worry about managing API keys in your source code.
