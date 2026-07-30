# Springboot-React-APP
# Portfolio — React (Vite) + Spring Boot

Bringing a Figma design by Elias to the web. This project contains a React front-end (Vite) and a Spring Boot back-end (Java 11). The backend exposes simple REST endpoints to serve portfolio data (user, skills, experiences, projects, fun facts). The client consumes those endpoints and includes an EmailJS-based contact form.

Repository: https://github.com/Azlouk-Ahmed/portfolio-react-springboot

---

## Contents

- `client/portfolio/` — React (Vite) front-end
- `server/portfolio/` — Spring Boot back-end (Maven)
- (No README present yet — this file)

---

## Features

- React + Vite front-end (modern React 18)
  - Uses axios, framer-motion, react-icons, react-scroll, Redux Toolkit (installed)
  - Email contact form implemented with EmailJS
- Spring Boot back-end
  - Java 11, Spring Boot 2.7.11
  - JPA / Spring Data repositories
  - Example models: User, Projects, Skills, Experiences, Fun_facts
  - REST controllers under `/api` for reading/writing portfolio content
- Easily run front-end and back-end independently for development

---

## API (discovered in code)

The server registers controllers under `/api`. Available endpoints found in the code:

- Users
  - GET /api/user/{id} — get a user by id

- Skills
  - GET /api/skills — list all skills
  - POST /api/skills — add a skill
  - DELETE /api/skills/delete/{skillID} — delete skill by id

- Experiences
  - GET /api/experience — list all experiences
  - POST /api/experience — add an experience
  - DELETE /api/experience/delete/{ffID} — delete experience by id

- Fun facts
  - GET /api/funfacts — list all fun facts
  - POST /api/funfacts — add a fun fact
  - PUT /api/updatefunfact/{ff_ID} — update a fun fact
  - DELETE /api/funfact/delete/{ffID} — delete a fun fact

Notes:
- These endpoints were inferred from controllers in `server/portfolio/src/main/java/com/portfolio/portfolio/controllers/`.
- The code search used to produce the list may be incomplete — check the repository for additional controllers or routes: https://github.com/Azlouk-Ahmed/portfolio-react-springboot

---

## Local development

Prerequisites
- Java 11 (for the server)
- Maven (for the server)
- Node.js (14+ recommended) and npm (for the client)
- A running database for the server (MySQL, PostgreSQL or any JDBC-compatible DB) OR configure in-memory DB for testing

1. Backend (Spring Boot)
   - Open a terminal:
     - cd server/portfolio
     - Configure database and JPA in `src/main/resources/application.properties` (create if missing). Example:
       ```
       spring.datasource.url=jdbc:mysql://localhost:3306/portfolio_db
       spring.datasource.username=your_db_user
       spring.datasource.password=your_db_password
       spring.jpa.hibernate.ddl-auto=update
       spring.jpa.show-sql=true
       server.port=8080
       ```
     - Build and run:
       - mvn clean package
       - mvn spring-boot:run
     - The API will be available at http://localhost:8080/api/...

   - If you prefer PostgreSQL, adjust the JDBC url and driver accordingly (pom already includes mysql and postgresql dependencies; provide the correct runtime dependency via properties).

2. Frontend (React + Vite)
   - Open a terminal:
     - cd client/portfolio
     - npm install
     - npm run dev
   - Vite defaults to a dev server (e.g., http://localhost:5173). Configure the client to call the backend API base URL (e.g., http://localhost:8080).
     - The project likely uses axios; update the axios base URL or use an environment variable (e.g., VITE_API_URL) and reference it in code.
     - If you want to set up Vite proxy, create `vite.config.js` with proxy rules to the backend during development.

3. EmailJS (Contact form)
   - The front-end currently uses EmailJS via `@emailjs/browser`.
   - The code contains service/template/user IDs; if you want to customize, create an EmailJS account and replace service ID / template ID / public key where used.
   - For security, keep keys out of public repos and use environment variables in production.

---

## Build for production

Option A — Separate deployment:
- Build client:
  - cd client/portfolio
  - npm run build
- Deploy the generated `dist/` to any static hosting (Netlify, Vercel, S3, etc.)
- Deploy the backend JAR to your server (e.g., run `java -jar target/portfolio-0.0.1-SNAPSHOT.jar`) and ensure API_URL in the front-end points to the deployed backend.

Option B — Serve front-end from Spring Boot:
- Build client and copy `dist/` contents into `server/portfolio/src/main/resources/static/` (or configure Spring Boot to serve these files).
- Build and run the Spring Boot application. The app will serve static files and API from same host.

---

## Project structure (high level)

- server/portfolio
  - src/main/java/com/portfolio/portfolio
    - controllers/ — REST controllers (userController, SkillsController, experienceController, funFactsController, ...)
    - Model/ — JPA entities (User, Projects, Skills, Experiences, Fun_facts)
    - repositories/ — Spring Data JPA repositories (used by services)
    - serviceImpliment/ — service implementations
    - PortfolioApplication.java — Spring Boot main class
  - pom.xml — Maven configuration

- client/portfolio
  - src/ — React components (contact form uses EmailJS)
  - package.json — client dependencies & scripts

---

## Environment variables & configuration suggestions

- Backend (`application.properties` or environment)
  - spring.datasource.url
  - spring.datasource.username
  - spring.datasource.password
  - spring.jpa.hibernate.ddl-auto (e.g., update for development)
  - server.port (optional)

- Frontend (Vite)
  - VITE_API_URL — URL of backend API (http://localhost:8080)
  - EMAILJS keys — do NOT commit secrets; use environment variables or runtime config

---

## Examples: curl

- Get user with id 1:
  curl http://localhost:8080/api/user/1

- List skills:
  curl http://localhost:8080/api/skills

- Add a skill (example):
  curl -X POST http://localhost:8080/api/skills -H "Content-Type: application/json" -d '{"skill_name":"React","skill_list":"Hooks,Context"}'

---

## Notes, TODOs & suggestions

- Add `application.properties.example` or `.env.example` to document required configuration.
- Remove hard-coded EmailJS keys from front-end code and store them securely (or use a build-time env var).
- Consider adding CORS config on the backend to allow requests from the dev server if needed.
- Add basic integration tests for API endpoints and an npm script to lint/build the client.

---

## Contributing

- Feel free to open issues or PRs.
