# Periodic Table API

A RESTful API built with Express.js for managing and querying chemical element data. This API supports CRUD operations, advanced search, and filtering functionality.

---

## Features

- **CRUD Operations**: Create, Read, Update, and Delete elements.
- **Search and Filter**: Search elements by name, discovery year, discovered by, and more.
- **Categorization**: Fetch elements by category, group, period, or physical state.
- **Error Handling**: Comprehensive error responses for client and server issues.
- **404 Handling**: Custom message for undefined routes.

---

## Base URL

`http://localhost:<port>/api/v1/elements`

---
## API Endpoints

### CRUD Operations

- **GET** `api/v1/elements`
  - Fetch all chemical elements.
  - **Response**: 
    ```json
    {
      "success": true,
      "data": [
        { "name": "Hydrogen", "atomicNumber": 1, ... },
        { "name": "Helium", "atomicNumber": 2, ... }
      ]
    }
    ```

- **GET** `api/v1/elements/:name`
  - Fetch a specific element by its name.
  - **Parameters**: 
    - `:name` (string) - The name of the element.
  - **Response**:
    ```json
    {
      "success": true,
      "data": { "name": "Hydrogen", "atomicNumber": 1, ... }
    }
    ```

- **POST** `api/v1/elements`
  - Add a new element.
  - **Request Body**:
    ```json
    {
      "name": "Hydrogen",
      "atomicNumber": 1,
      "category": "Nonmetal",
      ...
    }
    ```
  - **Response**:
    ```json
    {
      "success": true,
      "message": "Element created successfully",
      "data": { "name": "Hydrogen", "atomicNumber": 1, ... }
    }
    ```

- **PUT** `api/v1/elements/:atomicNumber`
  - Update an existing element by its atomic number.
  - **Parameters**: 
    - `:atomicNumber` (number) - The atomic number of the element.
  - **Request Body**:
    ```json
    {
      "name": "Updated Element Name",
      ...
    }
    ```
  - **Response**:
    ```json
    {
      "success": true,
      "data": { "name": "Updated Element Name", ... }
    }
    ```

- **DELETE** `api/v1/elements/:atomicNumber`
  - Delete an element by its atomic number.
  - **Parameters**: 
    - `:atomicNumber` (number) - The atomic number of the element.
  - **Response**:
    ```json
    {
      "success": true,
      "message": "Element deleted successfully"
    }
    ```

---

### Search and Filter

- **GET** `api/v1/elements/search`
  - Search elements by query parameters.
  - **Query Parameters**:
    - `name` (string) - The name of the element.
    - `discoveryYear` (number) - The year the element was discovered.
    - `discoveredBy` (string) - The scientist who discovered the element.
  - **Response**:
    ```json
    {
      "success": true,
      "data": [
        { "name": "Hydrogen", "atomicNumber": 1, ... }
      ]
    }
    ```

- **GET** `api/v1/elements/category/:category`
  - Fetch elements by category.
  - **Parameters**: 
    - `:category` (string) - The category of the element.
  - **Response**:
    ```json
    {
      "success": true,
      "data": [
        { "name": "Oxygen", "category": "Nonmetal", ... }
      ]
    }
    ```

- **GET** `api/v1/elements/group/:group`
  - Fetch elements by group.
  - **Parameters**: 
    - `:group` (number) - The group number of the element.
  - **Response**:
    ```json
    {
      "success": true,
      "data": [
        { "name": "Lithium", "group": 1, ... }
      ]
    }
    ```

- **GET** `api/v1/elements/period/:period`
  - Fetch elements by period.
  - **Parameters**: 
    - `:period` (number) - The period of the element.
  - **Response**:
    ```json
    {
      "success": true,
      "data": [
        { "name": "Sodium", "period": 3, ... }
      ]
    }
    ```

- **GET** `api/v1/elements/state/:state`
  - Fetch elements by their state at room temperature.
  - **Parameters**: 
    - `:state` (string) - The state of the element (e.g., solid, liquid, gas).
  - **Response**:
    ```json
    {
      "success": true,
      "data": [
        { "name": "Hydrogen", "stateAtRoomTemp": "gas", ... }
      ]
    }
    ```

---

### Additional Routes

- **ALL** `*`
  - Handle undefined routes with a custom 404 message.
  - **Response**:
    ```html
    <h1>404! Page not found</h1>
    ```
