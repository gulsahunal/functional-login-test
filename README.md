# Functional Login Test QA Project

## Overview
This is a simple login testing project that checks if users can log in and register correctly. It includes basic features like login, registration, and a dashboard. Made with React, TypeScript, and Tailwind CSS to test if login works properly.

## Demo
You can try out the live demo at: [https://functional-login-test.vercel.app](https://functional-login-test.vercel.app)

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
- [Register Test Documentation (English)](https://docs.google.com/spreadsheets/d/1TbjFpvQMmZXTkUNXt2DqmBlM7pZK4YWT7mRMbO0zJes/edit?usp=drive_link)
- [Login Test Documentation (English)](https://docs.google.com/spreadsheets/d/1sayNDu8vERHo5MK5ClYS2z4GXbkCRRRZS4klkilb2tw/edit?usp=drive_link)
- [Register Test Documentation (Turkish)](https://docs.google.com/spreadsheets/d/1m6r3F1WDO91B68p-K5fUvfCx2RrVwofq8GpqfM7PKB4/edit?usp=drive_link)
- [Login Test Documentation (Turkish)](https://docs.google.com/spreadsheets/d/1U2jwiYArzjMqJyBmfRAiMp-n8XmpT4074q7izGjPt30/edit?usp=drive_link)

## How to Run the Project
1. Install the dependencies:
   ```bash
   bun install
   ```
2. Start the development server:
   ```bash
   bun start
   ```
3. Open your browser and navigate to the local development URL (typically http://localhost:3000).

## Contributing
Contributions are welcome! Please see the contributing guidelines in the repository before submitting pull requests or issues.

## Disclaimer
This project is intended solely for QA testing purposes. The login functionalities, user data validations, and OTP verifications are simulated and should not be used in production environments.

## Author and License
- **Author:** Gülşah ÜNAL
- **License:** MIT License
