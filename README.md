# HomeMatch Hub

Welcome to **HomeMatch Hub**, a social platform designed to connect international students with rental properties and like-minded roommates in Spain.

This project is built with Next.js, Tailwind CSS, and shadcn/ui, featuring a modern, clean, and user-friendly interface. It includes GenAI-powered features for roommate matching to create a supportive community for students abroad.

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- Node.js (v18 or later)
- npm or yarn

### Installation

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd HomeMatch-Hub
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Set up environment variables:**

    Create a `.env.local` file in the root of your project and add any necessary environment variables (e.g., for database connections, AI services).

4.  **Run the development server:**
    ```bash
    npm run dev
    ```

The application will be available at `http://localhost:9002`.

### Running Genkit Flows

To run the Genkit AI flows in a local development environment, use the following command:

```bash
npm run genkit:dev
```

This will start the Genkit development server, allowing you to interact with and test the AI-powered features.

## Demo Accounts

To explore the app's features, you can use the following demo accounts:

-   **Student:** `student@demo.es`
-   **Landlord:** `owner@demo.es`

*(Note: Authentication is not fully implemented in the current prototype. These are for representational purposes.)*

## Key Features

-   **Property Listings:** Browse properties with an interactive map and advanced filters.
-   **AI Roommate Matching:** Find compatible roommates using an AI-powered matching algorithm.
-   **Bilateral Reviews:** A transparent review system for both students and landlords.
-   **Community Events:** Discover and join local events to connect with other students.
-   **Direct Messaging:** Communicate securely with landlords and potential roommates.
-   **Light &