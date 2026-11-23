# 🚗 Vehicle Inventory Manager

An **Angular 19 + Tailwind CSS 4** web app for managing a vehicle inventory. It is the frontend for my **[Vehicles API](https://github.com/LazaroDevelop/Vehicles)** (Spring Boot) and covers the full vehicle lifecycle: register, browse, edit, convert to electric, delete, and report.

## ✨ What it does
- 📋 **Paginated vehicle list** with a reusable paginator
- 📝 **Register and edit vehicles** with a shared reactive form
- 🔍 **Vehicle detail** page
- ⚡ **Convert** a gasoline or diesel vehicle to **electric**
- 🗑️ **Delete** vehicles
- 📊 **Registration report** page
- ⛽ Supports three vehicle types: **Electrical**, **Gasoline** and **Diesel**
- 🎨 Responsive UI with **Tailwind CSS 4**

## 🛠️ Tech stack
| Layer | Technology |
|-------|------------|
| Framework | Angular 19 (standalone components, Angular Router) |
| Styling | Tailwind CSS 4, PostCSS |
| HTTP | Angular `HttpClient`, RxJS |
| Language | TypeScript |
| Backend | [Vehicles API](https://github.com/LazaroDevelop/Vehicles) (Spring Boot) |

## 🚀 Run it

### Prerequisites
- Node.js 20+ and npm 10+
- The [Vehicles API](https://github.com/LazaroDevelop/Vehicles) running on **http://localhost:8082**

### Steps
~~~bash
git clone https://github.com/LazaroDevelop/Vehicle-Front-end-manager.git
cd Vehicle-Front-end-manager
npm install
npm start
~~~
Open **http://localhost:4200**.

The API URL is configured in `src/environments/environment.ts`.

## 🧭 Pages
| Route | Page |
|-------|------|
| `/` | Vehicle list |
| `/vehicle/:id` | Vehicle detail |
| `/register` | Register a new vehicle |
| `/report` | Registration report |
| `**` | Not found |

## 🏗️ Project structure
The app is organized by **domain** instead of by technical type:
~~~text
src/app/domains
├── info/pages/not-found
├── shared
│   ├── components   # header, layout, multi-select, paginator
│   ├── models       # vehicle, registration, vehicle type
│   └── services     # VehicleService (HTTP calls to the API)
└── vehicles
    ├── components   # vehicle card, vehicle form
    └── pages        # list, register, report, vehicle detail
~~~

## 📜 Available scripts
| Command | Description |
|---------|-------------|
| `npm start` | Run the dev server |
| `npm run build` | Production build into `dist/` |
| `npm test` | Run unit tests |

## 🗺️ Roadmap
- [ ] Add unit tests for components and services
- [ ] Add a production environment file
- [ ] Deploy to GitHub Pages

## 👤 Author

**Lazaro Noel Guerra Medina**, Java Backend Engineer

> *"Make it work, make it right, make it fast."* ☕
