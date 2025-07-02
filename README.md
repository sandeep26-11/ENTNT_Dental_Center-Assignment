# ENTNT Dental Center Management Dashboard

This is a frontend-only application for a Dental Center Management Dashboard, built as a technical assignment for ENTNT.

## Project Description

The application provides a dashboard for managing patients and their dental appointments (incidents). It supports two user roles:
- **Admin (Dentist):** Full access to manage patients and appointments.
- **Patient:** Limited view to see their own data and appointment history.

All data is simulated and persisted using the browser's `localStorage`. No backend services or external APIs are used.

## Core Features

- **User Authentication:** Simulated login for Admin and Patient roles with session persistence.
- **Role-Based Access Control:** Frontend routes and components are protected based on user role.
- **Patient Management (Admin):** Admins can view, add, edit, and delete patient records.
- **Appointment/Incident Management (Admin):** Admins can manage patient incidents, including adding post-appointment details like cost, status, and file uploads.
- **Calendar View (Admin):** A monthly/weekly calendar view of all appointments.
- **Dashboard (Admin):** A landing page displaying KPIs like upcoming appointments, revenue, and treatment statuses.
- **Patient View:** Patients can view their own profile, upcoming appointments, and full history with costs and file attachments.

## Tech Stack & Architecture

- **React:** The core UI library, using functional components and hooks.
- **Vite:** The build tool for a fast development experience.
- **TypeScript:** For static typing and improved code quality.
- **React Router:** For all client-side routing and navigation.
- **React Context API:** For state management (`AuthContext` for user session, `DataContext` for application data). This choice keeps the app lightweight without needing a larger library like Redux for a project of this scale.
- **TailwindCSS:** For all styling. It allows for rapid development of a consistent, modern UI.
- **localStorage:** Used to simulate a database. All data is fetched from and persisted to `localStorage`, making the application self-contained.
- **Responsive Design:** The UI is built to be responsive across different device sizes.

## Setup and Installation

1.  **Clone the repository:**
    ```bash
    git clone <https://github.com/sandeep26-11/ENTNT_Dental_Center-Assignment.git>
    ```
2.  **Navigate to the project directory:**
    ```bash
    cd ENTNT-Assignment
    ```
3.  **Install dependencies:**
    ```bash
    npm install
    ```
4.  **Run the development server:**
    ```bash
    npm run dev
    ```
    The application will be available at `http://localhost:5173` (or the next available port).

## Login Credentials

You can use the following hardcoded credentials to test the application:

- **Admin:**
  - **Email:** `admin@entnt.in`
  - **Password:** `admin123`
- **Patient:**
  - **Email:** `john@entnt.in`
  - **Password:** `patient123`

## Issues and Technical Decisions

- **State Management:** Context API was chosen over Redux because the state is relatively simple and doesn't require the extensive boilerplate of Redux. `AuthContext` handles the user's session, while `DataContext` manages all CRUD operations for patients and incidents, providing a centralized and predictable state management system.
- **Data Persistence:** `localStorage` was used as required to simulate a backend. The `DataContext` acts as a service layer, abstracting the `localStorage` interactions away from the UI components.
- **Styling:** TailwindCSS was used for its utility-first approach, which speeds up development and helps maintain a consistent design system without writing custom CSS files.
- **File Uploads:** File uploads are simulated by creating Blob URLs (`URL.createObjectURL`). This provides a realistic preview and download experience without a backend to store the files.

This concludes the development of the ENTNT Dental Center Management Dashboard.
