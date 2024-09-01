# Learning Management System

This repository contains a simple Learning Management System (LMS) designed to explore and learn about microservices architecture. The project demonstrates the fundamental concepts of microservices by breaking down the LMS into smaller, independently deployable services using Java and Python.

## Features

- **Course Management**: Create, update, and delete courses.
- **User Management**: Register and manage users and their roles.
- **Enrollment**: Enroll users in courses and track their progress.
- **API Gateway**: Routes requests to the appropriate microservices and handles authentication.

## Architecture

The system is built using a microservices architecture, where each service is responsible for a specific function:

1. **Course Service (Java)**: Manages course-related operations.
2. **User Service (Python)**: Handles user registration, authentication, and profile management.
3. **Enrollment Service (Java)**: Manages user enrollments and tracks course progress.
4. **API Gateway**: Acts as a single entry point, routing requests to the appropriate service.

Each service communicates via RESTful APIs and is independently deployable.

## Getting Started

### Prerequisites

- Docker and Docker Compose
- Java 17+ and Maven
- Python 3.10+ and pip
- MongoDB

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/AbsoluteZero000/learning-management-system.git
   cd learning-management-system
   ```

### Running Locally

To run the services without Docker, navigate to each service's directory and follow the specific instructions for Java and Python.

## Technologies Used

- **Java**: Core backend for course and enrollment services.
- **Python**: Backend for the user management service.
- **Flask**: Web framework for the user service.
- **Docker**: Containerization of services.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.

## License

This project is licensed under the MIT License.

## Contact

For any inquiries, please reach out via [GitHub](https://github.com/AbsoluteZero000).
