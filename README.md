# JalSrot – Water Resource Monitoring & Registry Platform

**JalSrot** is a web-based platform designed to support the discovery, documentation, monitoring, and management of water resources.

The platform provides a centralized interface for exploring water sources, viewing water quality information, understanding geographical distribution, and supporting data-driven water resource management.

## Key Features

### 1. Water Resource Registry
- Browse and explore registered water sources.
- Search and filter sources using relevant attributes.
- View detailed information about individual water resources.
- Access geographical and water quality information.

### 2. Interactive Map
- Explore registered water sources through an interactive map.
- View geographical locations using OpenStreetMap.
- Support location-based exploration of water resources.

### 3. Water Quality Information
- Display water quality parameters, including:
  - pH
  - Total Dissolved Solids (TDS)
  - Electrical Conductivity
  - Turbidity
  - Total Alkalinity
  - Total Acidity
  - Total Hardness
  - Chloride levels
- Present available water quality information in a structured format.

### 4. Administrative Dashboard
- Manage registered water source information.
- Add, update, and remove source records.
- Manage authorized user permissions.
- Configure geographical and source-related information.

### 5. Storage Volume Monitoring
- Support integration with water-level monitoring hardware.
- Record water-level measurements.
- Estimate water storage volume using configured storage area and measured water height.
- Maintain historical measurement records.

The volume estimation follows:

**Volume = Storage Area × Water Height**

### 6. Media Gallery
- Display photographs and videos related to water resources.
- Support media links and descriptive captions.
- Provide a centralized gallery for project-related visual documentation.

## Technology Stack

| Component | Technology |
|---|---|
| Frontend | React 19 |
| Build Tool | Vite |
| Styling | Tailwind CSS v4 |
| Routing | React Router |
| Mapping | Leaflet |
| Map Data | OpenStreetMap |
| Icons | React Icons |
| Backend Integration | REST APIs |

## Application Structure

The application is organized into modular components:

- **API Layer:** Communication with backend services.
- **Components:** Reusable interface elements.
- **Pages:** Application-level views and navigation.
- **Context:** Application-wide state management.
- **Hooks:** Reusable application logic.
- **Utilities:** Data processing and helper functions.
- **Constants:** Shared application configuration.

## Getting Started

### Prerequisites

Ensure that the following tools are installed:

- Node.js
- npm
- Git

### Installation

Clone the repository:

```bash
git clone https://github.com/Alisha9ziya/Jalshrott.git
```

Navigate to the project directory:

```bash
cd Jalshrott
```

Install dependencies:

```bash
npm install
```

### Environment Configuration

Configure the frontend API endpoint using an environment file.

Create a `.env` file based on the project's environment template and configure the required API URL.

Example:

```env
VITE_API_URL=your_backend_api_url
```

Do not commit credentials, API keys, passwords, or other confidential configuration values to the repository.

### Run Development Server

```bash
npm run dev
```

The development server is available at:

```text
http://localhost:5173
```

### Production Build

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

### Code Quality

```bash
npm run lint
```

## Hardware Integration

JalSrot is designed to support integration with external water-level monitoring devices.

The hardware integration architecture supports:

- Water-level measurement collection.
- Device-based identification.
- Measurement recording.
- Water storage volume estimation.
- Historical reading management.

Hardware communication and authentication are handled through backend services.

## Access and User Roles

The platform supports role-based access:

- **Government Administrator:** Administrative management and user permission control.
- **Source Manager:** Management of water source records.
- **Public User:** Access to publicly available water resource information.

Access to administrative operations is controlled by the application backend.

## Mapping and Geographical Data

The platform uses:

- **Leaflet** for interactive map rendering.
- **OpenStreetMap** for geographical map data.
- **Nominatim** for location search and geocoding.

External mapping services are subject to their respective usage policies and limitations.

## Deployment

The frontend can be deployed using modern static web hosting platforms.

The application supports production builds through Vite. Backend services and API endpoints must be configured separately for the deployed environment.

## Project Objective

JalSrot aims to improve the accessibility and organization of water resource information through digital mapping, structured data management, water quality documentation, and hardware-assisted monitoring.

By combining web technologies with potential IoT integration, the platform provides a foundation for more informed and accessible water resource management.

---

**Project:** JalSrot  
**Category:** Water Resource Management | Web Development | IoT Integration  
**Repository:** [GitHub – JalSrot](https://github.com/Alisha9ziya/Jalshrott)
