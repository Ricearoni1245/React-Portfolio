# Jody Holt | Developer Portfolio

This is the source code for my personal portfolio. 
Created using React//Tailwind//TypeScript

---

## Overview

This site demonstrates my personality, skills, and presents the tone I provide through all my collaborative/business endeavors. 

**STACK**

- SPA with React (functional components, hooks)
- TailwindCSS (custom tokens and theme system)
- Theme Engine (5 themes with automated color adaption per user preference )
- IntersectionObserver (based scroll nav)
- Modular component layout

---

## Project structure

```bash
src/
|-assets/ # Images
|-components/ #Reusable UI components 
|-hooks/ #Custom  React Hooks
|-styles/ #Tailwind + custom theme CSS
|App.tsx
|index.css

```

---

## Theme System

### within index:
#### 5 unique themes are laid out by:
- color-bg 
- color-primary
- color-text
- color-secondary
- color-tertiary

These themes are applied via html[data-theme="x"] and are used across the site for all gradients, tints, accents, etc.




## To run on local client: 
```bash
npm i

npm run dev

## Local:   http://localhost:5173/ (control + click local host url)

```

## Contact Form Setup

### Frontend env
Create `.env` in the project root:

```bash
VITE_CONTACT_API_URL=/api/contact
VITE_TURNSTILE_SITE_KEY=your_turnstile_site_key
```

### Backend API
The contact backend lives in `contact-api/`.

```bash
cd contact-api
npm i
npm run dev
```

Create `contact-api/.env` from `contact-api/.env.example` and set your real Turnstile + SMTP credentials.

### VPS service files
- systemd unit template: `ops/jody-contact-api.service`
- Nginx reverse proxy snippet: `ops/nginx-contact-api.conf`

## License

This project is licensed under the MIT License.  
See `LICENSE` for full text.

## Author

### Jody Holt
### Frontend Developer • Passion Pioneer
#### [GitHub](https://github.com/Ricearoni1245) • [LinkedIn](https://www.linkedin.com/in/jody-holt-9b19b0256)
