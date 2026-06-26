# Mini CRM - Frontend Test Task

[![Live Demo](https://img.shields.io/badge/Live_Demo-Vercel-black?style=for-the-badge&logo=vercel)](https://employees-dashboard-beta.vercel.app)

A mini CRM system built as a frontend test assignment. The application allows users to view metrics, manage a list of employees, and edit their details.

## Tech Stack

- **Core:** React, TypeScript
- **State Management:** Zustand
- **UI Library:** Mantine UI
- **Mock Data:** Faker.js
- **Charts:** Mantine charts (uses Recharts library)

## Features

- **Dashboard Page:** Displays key business metrics and visual charts.
- **Employees List Page:**
  - Data table containing all employees.
  - Search/filter functionality by Name or Email.
  - Filtering by Employee Status.
  - Sorting by Full Name via column header click.
  - Client-side pagination.
- **Employee Management:**
  - Dedicated page for creating a new employee.
  - Detailed view page accessible by clicking on any employee in the table.
  - Edit functionality on the employee details page.
- **UX Improvements:** Smooth loading indicators (loaders) are implemented across all pages to simulate data fetching.

## Data Storage Notice

The application uses **in-memory storage** combined with `faker-js` for data generation.
_Note: Every time you refresh the page, the state is reset and a completely new dataset of employees is generated._

## Getting Started

To run this project locally, follow these steps:

1. Clone the repository (or download the source code).
2. Open the project folder in your terminal.
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```
5. Open your browser and navigate to the local URL provided in the terminal (usually `http://localhost:5173` or `http://localhost:3000`).
