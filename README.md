# TruckWay

![TruckWay](/images/Landing_page.png)

## Overview

TruckWay is a platform that connects truck drivers with companies or individuals who need transportation services across Africa. Whether it's moving goods, furniture, or materials, TruckWay provides a seamless solution for both companies and drivers by streamlining the process of job posting, selection, contract signing, and real-time updates.

## Key Features

- **User Registration**: Allows companies/individuals and truck drivers to register and create profiles.
- **Post Transport Requests**: Companies or individuals can post their transportation needs, including price, weight, pickup and drop-off locations, and timing.
- **Job Listings**: Truck drivers can browse available jobs and apply for transportation requests.
- **Contract Signing**: Once a company selects a driver, both parties can sign a contract through the platform.
- **Real-time Notifications**: The platform provides updates at pickup and drop-off points.
- **Search and Filter**: Users can search and filter transport requests based on criteria like price, location, and weight.

## Tech Stack

### Frontend
- **React**: For building the user interface and handling state.
- **React Router**: For navigating between pages.
- **Axios/Fetch**: For making API requests to the backend.
- **Material-UI**: (optional) for enhancing the UI design.

### Backend
- **Node.js**: As the JavaScript runtime environment.
- **Express**: For building the RESTful API.
- **MongoDB**: Database to store user data and transport requests.
- **Mongoose**: ORM to interact with MongoDB.
- **JWT (JSON Web Tokens)**: For authentication and authorization.

### Key Backend Routes
- **/auth**: Handles authentication (register, login).
- **/jobs**: For posting, listing, and managing transport requests.
- **/users**: Manages user data and profiles.

## Getting Started

### Prerequisites
- Node.js
- MongoDB

### Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/ermi4sol/truckway.git
    ```

2. Navigate into the project directory:
    ```bash
    cd truckway
    ```

3. Install the dependencies:
    ```bash
    npm install
    ```

4. Set up environment variables:
   - Create a `.env` file in the root directory and add the following:
     ```
     MONGO_URI=your_mongodb_connection_string
     JWT_SECRET=your_jwt_secret_key
     ```

5. Run the application:
    ```bash
    npm run dev
    ```

### Running the Frontend

Navigate to the `client` folder:
```bash
cd client
