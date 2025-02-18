# Functional Login Test QA Project

## Overview
A simple login testing project that checks if users can log in and register correctly. It includes basic features like login, registration, and a dashboard. Made with React, TypeScript, and Tailwind CSS to test if login works properly.

## Features
- **Login & Logout:** Implements a fully functional login system that uses localStorage for session management.
- **User Registration:** Provides a registration workflow with OTP-based email verification.
- **Dashboard:** Displays user-specific information with a session expiration countdown and time-based greetings.
- **Responsive UI:** Uses Tailwind CSS to create a modern, responsive, and modular interface.
- **Reusable Components:** Incorporates components such as Card, Button, Input, Alert, and Dialog to enhance UI consistency.
- **Routing:** Utilizes react-router-dom for smooth navigation between different application states.

## Project Structure
- **src/App.tsx:** Main application component that handles user authentication and routing.
- **src/components:** Contains all reusable React components, including the Login, Register, and Dashboard components as well as UI elements.
- **src/main.tsx:** Application entry point.
- **Configuration Files:** Includes configurations for package management, Vite, Tailwind CSS, and TypeScript.

## Testing Documentation
For detailed information on test cases and documentation, please refer to the following documents:
- [Test Documentation (English)](docs/en/test-documentation.md)
- [Test Documentation (Turkish)](docs/tr/test-dokumentasyonu.md)

## How to Run the Project
1. Install the dependencies:
   ```bash
   npm install
   ```
2. Start the development server:
   ```bash
   npm start
   ```
3. Open your browser and navigate to the local development URL (typically http://localhost:3000).

## Contributing
Contributions are welcome! Please see the contributing guidelines in the repository before submitting pull requests or issues.

## Disclaimer
This project is intended solely for QA testing purposes. The login functionalities, user data validations, and OTP verifications are simulated and should not be used in production environments.

## Author and License
- **Author:** Gülşah ÜNAL
- **License:** MIT License
