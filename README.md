# Account Management
*(Just like a full-stack project template)*

#### Tech Stacks:
- **Vite React (Typescript)**
- **Tailwind CSS**
- **Express.js**
- **PostgreSQL**
- **Nodejs** *(Runtime Environment)*

---

## Prerequisites
- NodeJS
- PostgreSQL Server

---

## Setup:
1. Clone this project by running `git clone https://github.com/khianvictorycalderon/rtep-account-management.git`
2. Create a separate terminal for both frontend and backend folder:
    - *Terminal 1*: `cd backend`
    - *Terminal 2*: `cd frontend`

### Inside `backend` folder:
1. Createa an `.env` file that contains:
    ```env
    CORS_ALLOWED_ORIGINS=https://origin1.com,https://origin2.com
    DATABASE_URL=postgresql://USER:PASSWORD@HOST:PORT/DATABASE
    ```
    **NOTES**:
    - *Change `CORS_ALLOWED_ORIGINS` into the actual origins based on your frontend. Comma separated, no space and trailing slash.*
    - *Change the `DATABASE_URL` based on your actual database credentials.*
2. Go to your PostgreSQL database and run the following SQL query:
    ```sql
    -- Built-in table (Template)
    CREATE EXTENSION IF NOT EXISTS "pgcrypto";
    CREATE TABLE users (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

        first_name VARCHAR(30) NOT NULL,
        middle_name VARCHAR(30),
        last_name VARCHAR(30) NOT NULL,

        birth_date DATE NOT NULL,

        email VARCHAR(255) NOT NULL UNIQUE,

        password_hash TEXT NOT NULL,

        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
    CREATE TABLE sessions (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,

        ip TEXT,
        user_agent TEXT,
        browser TEXT,
        os TEXT,
        device TEXT,

        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        last_seen TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        expires_at TIMESTAMP NOT NULL
    );
    ```
3. Run `npm install` to install necessary packages.
4. Run `npm run dev` to test your development backend.

### Inside `frontend` folder:
1.  Createa an `.env` file that contains:
    ```env
    VITE_API_URL=https://your-backend.com
    ```
    **NOTE**:
      - *Change `VITE_API_URL` into the actual backend host without trailing slash.*
2. Run `npm install` to install necessary packages.
3. Run `npm run dev` to test your development frontend.

---

## Previews
![Hero Dark Preivew](previews/hero_dark.png)
![Hero Light Preivew](previews/hero_light.png)
![Login Preivew](previews/login.png)
![Register Preivew](previews/register.png)
![Account Dark Preivew](previews/account_dark.png)
![Account Light Preivew](previews/account_light.png)
![Development Preivew](previews/development.png)

---

## Dependencies & Configuration
The following is a list of installed dependencies and configuration settings used in this project.
You don’t need to install anything manually, as all dependencies are already managed through `package.json` (both frontend and backend).
This section is provided for reference only, to give you insight into how the project was set up.

## Backend Dependencies
- `npm install express cors dotenv pg zod bcryptjs cookie-parser`
- `npm install nodemon --save-dev`

## Backend Configuration
- Updated `package.json`:
    ```json
    "scripts": {
        "dev": "nodemon ./api/index.js"
    }
    ```

## Frontend Dependencies
- `npm install tailwindcss @tailwindcss/vite axios react-router-dom react-redux @reduxjs/toolkit`

## Frontend Configuration
- Update `vite.config.ts`:
  ```ts
  import tailwindcss from '@tailwindcss/vite'

  export default defineConfig({
    plugins: [
      tailwindcss(),
    ],
  })
  ```