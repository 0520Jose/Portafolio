<p align="right">
  <strong>EN</strong> | <a href="./README-es.md">ES</a>
</p>

# Emanuel Monzon - Portfolio

Personal portfolio and engineering showcase designed to highlight technical skills, architecture principles, and selected projects.

- **Live Site:** [emanuelmonzon.netlify.app](https://emanuelmonzon.netlify.app)
- **Organization:** [trebol4devop.netlify.app](https://trebol4devop.netlify.app)
- **LinkedIn:** [José Emanuel Monzón](https://www.linkedin.com/in/josé-emanuel-monzón-lémus-4970b4237)
- **Email:** emanuelmonzon360@gmail.com

---

## Overview

This repository contains the source code for my personal web portfolio. It is designed with a modern dark-mode aesthetic, strict component decoupling, and full internationalization support across six languages.

---

## Technical Stack

- **Core:** React 19, TypeScript
- **Tooling:** Vite 6
- **Styling:** Tailwind CSS v4
- **Animations:** Motion
- **Icons:** Lucide React
- **Internationalization:** i18next, react-i18next

---

## Key Features

- **Multi-language support:** Dynamic language switching for English, Spanish, German, French, Italian, and Portuguese.
- **Theme management:** System-aware dark and light theme switching.
- **Modular architecture:** Component separation for navigation, hero showcase, skills arsenal, projects gallery, and contact flows.
- **Responsive design:** Fully optimized layout for mobile, tablet, and desktop viewports.

---

## Project Structure

```text
Portafolio/
├── public/                # Static assets and icons
├── src/
│   ├── components/        # UI components
│   │   ├── Navbar.tsx     # Navigation bar
│   │   ├── Hero.tsx       # Main presentation view
│   │   ├── Projects.tsx   # Project showcase
│   │   ├── Skills.tsx     # Categorized skill set
│   │   ├── Contact.tsx    # Contact links and form
│   │   ├── Footer.tsx     # Footer content
│   │   ├── LanguageSelector.tsx
│   │   └── ThemeToggle.tsx
│   ├── hooks/             # Custom React hooks
│   ├── locales/           # Translation dictionaries (en, es, de, fr, it, pt)
│   ├── App.tsx            # Main application shell
│   ├── main.tsx           # Application entry point
│   └── index.css          # Design tokens and styles
├── netlify.toml           # Deployment configuration
└── package.json           # Dependencies and scripts
```

---

## Author

**Emanuel Monzón**  
Systems Engineering Student | Full Stack & Cloud Architect  
Co-founder at Trebol4Devop  
Copyright (c) 2026 Emanuel Monzón. All rights reserved.
