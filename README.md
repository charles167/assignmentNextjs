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

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.


## Onrender deploy link
https://assignmentnextjs-1.onrender.com/login

Overview
This website is a comprehensive Department Management System that allows users to manage departments and their respective sub-departments. With a simple login form and intuitive user interface, users can add, edit, delete, and view departments efficiently. The system is built using Next.js for the frontend and NestJS for the backend, ensuring a robust and scalable architecture.

Features
1. Login System
The website requires users to log in to access the Department Management Dashboard.
Ensures a secure and personalized experience.
2. Dashboard
Upon login, users are directed to a dashboard that lists all departments and their corresponding sub-departments.
3. Create Department
Users can easily create a new department by clicking on the "Create Department" button.
Multi-select Sub-Departments:
Use the dropdown menu to select one or more sub-departments.
Hold and drag your mouse up or down to select multiple options from the dropdown list.
4. Edit Department
Modify existing departments with ease.
Update the department name and change the list of sub-departments.
5. Delete Department
Remove any department from the system with a single click.
Confirmation prompts ensure that no accidental deletions occur.
6. View Single Department
Get detailed information about a specific department, including its name and all its sub-departments.
Tech Stack
Frontend
Next.js: A React framework for building fast, user-friendly interfaces.
Provides server-side rendering and excellent performance optimization.
Bootstrap: Ensures responsive and visually appealing designs.
CSS: For custom styling and layout enhancements.
Backend
NestJS: A progressive Node.js framework for building efficient and scalable APIs.
Handles authentication, data management, and business logic.
TypeORM: For seamless interaction with the database.
PostgreSQL: Used for storing department and sub-department data.
How to Use
Login:

Navigate to the login page and enter your credentials.
On successful login, you will be redirected to the department dashboard.
View Departments:

The dashboard lists all departments and their sub-departments.
Create a New Department:

Click the "Create Department" button.
Enter the department name.
Use the dropdown menu to select sub-departments. You can select multiple sub-departments by dragging your mouse up or down in the list.
Submit the form to add the new department.
Edit a Department:

Click the edit icon next to a department in the table.
Modify the department name or update the list of sub-departments.
Save changes.
Delete a Department:

Click the delete icon next to a department.
Confirm the deletion in the prompt that appears.
View a Single Department:

Click the view icon next to a department to open a modal displaying its details.

