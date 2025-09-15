# Card Portal

A modern web application for managing cards with Spring Boot backend, React frontend, and Oracle database.

## Architecture

- **Backend**: Spring Boot 3.2.0 with Java 17
- **Frontend**: React 18 with Bootstrap 5
- **Database**: Oracle Database
- **Build Tools**: Maven (Backend), npm (Frontend)

## Features

- ✅ CRUD operations for cards
- ✅ Card validation and form handling
- ✅ Responsive React UI with Bootstrap
- ✅ RESTful API with Spring Boot
- ✅ Oracle database integration
- ✅ Docker containerization
- ✅ CORS configuration for frontend-backend communication

## Project Structure

```
cardportal/
├── backend/                 # Spring Boot application
│   ├── src/main/java/       # Java source code
│   ├── src/main/resources/  # Application properties
│   ├── pom.xml             # Maven dependencies
│   └── Dockerfile          # Backend container
├── frontend/                # React application
│   ├── src/                # React source code
│   ├── public/             # Static assets
│   ├── package.json        # npm dependencies
│   └── Dockerfile          # Frontend container
├── database/               # Database scripts
│   └── scripts/            # Oracle SQL scripts
├── docker-compose.yml      # Multi-container setup
└── README.md              # This file
```

## Prerequisites

- Java 17 or higher
- Node.js 18 or higher
- Oracle Database (or Docker for containerized setup)
- Maven 3.6+
- npm or yarn

## Local Development Setup

### 1. Database Setup

#### Option A: Using Docker (Recommended)
```bash
# Start Oracle database container
docker run -d \
  --name cardportal-oracle \
  -p 1521:1521 \
  -e ORACLE_PASSWORD=oracle123 \
  -e APP_USER=cardportal \
  -e APP_USER_PASSWORD=password \
  gvenzl/oracle-xe:21-slim
```

#### Option B: Existing Oracle Database
1. Connect as SYSDBA and run `database/scripts/01-create-user.sql`
2. Connect as cardportal user and run `database/scripts/02-create-tables.sql`

### 2. Backend Setup

```bash
cd backend

# Install dependencies and run
./mvnw spring-boot:run

# Or build and run JAR
./mvnw clean package
java -jar target/cardportal-backend-0.0.1-SNAPSHOT.jar
```

The backend will be available at `http://localhost:8080`

### 3. Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Start development server
npm start
```

The frontend will be available at `http://localhost:3000`

## Docker Setup

### Full Stack with Docker Compose

```bash
# Start all services (database, backend, frontend)
docker-compose up -d

# View logs
docker-compose logs -f

# Stop all services
docker-compose down
```

### Individual Container Setup

```bash
# Backend only
cd backend
docker build -t cardportal-backend .
docker run -p 8080:8080 cardportal-backend

# Frontend only
cd frontend
docker build -t cardportal-frontend .
docker run -p 3000:3000 cardportal-frontend
```

## API Endpoints

### Cards API

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/cards` | Get all cards |
| GET | `/api/cards/{id}` | Get card by ID |
| GET | `/api/cards/number/{cardNumber}` | Get card by number |
| GET | `/api/cards/holder/{holderName}` | Get cards by holder name |
| GET | `/api/cards/type/{cardType}` | Get cards by type |
| GET | `/api/cards/active` | Get active cards |
| GET | `/api/cards/types` | Get all card types |
| POST | `/api/cards` | Create new card |
| PUT | `/api/cards/{id}` | Update card |
| DELETE | `/api/cards/{id}` | Delete card |
| PATCH | `/api/cards/{id}/deactivate` | Deactivate card |

### Example API Usage

```bash
# Get all cards
curl http://localhost:8080/api/cards

# Create a new card
curl -X POST http://localhost:8080/api/cards \
  -H "Content-Type: application/json" \
  -d '{
    "cardNumber": "1234567890123456",
    "cardHolderName": "John Doe",
    "cardType": "Credit",
    "expiryDate": "2025-12-31T23:59:59",
    "isActive": true
  }'
```

## Configuration

### Backend Configuration

Edit `backend/src/main/resources/application.properties`:

```properties
# Database configuration
spring.datasource.url=jdbc:oracle:thin:@localhost:1521:xe
spring.datasource.username=cardportal
spring.datasource.password=password

# Server configuration
server.port=8080

# JPA configuration
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
```

### Frontend Configuration

The frontend uses a proxy configuration in `package.json` to connect to the backend:

```json
{
  "proxy": "http://localhost:8080"
}
```

For production builds, set the `REACT_APP_API_URL` environment variable.

## Database Schema

### Cards Table

| Column | Type | Description |
|--------|------|-------------|
| id | NUMBER(19) | Primary key |
| card_number | VARCHAR2(20) | Unique card number |
| card_holder_name | VARCHAR2(100) | Card holder name |
| card_type | VARCHAR2(50) | Type of card |
| expiry_date | TIMESTAMP | Card expiry date |
| is_active | NUMBER(1) | Active status (0/1) |
| created_at | TIMESTAMP | Creation timestamp |
| updated_at | TIMESTAMP | Last update timestamp |

## Testing

### Backend Tests

```bash
cd backend
./mvnw test
```

### Frontend Tests

```bash
cd frontend
npm test
```

## Building for Production

### Backend

```bash
cd backend
./mvnw clean package
```

The JAR file will be created in `target/cardportal-backend-0.0.1-SNAPSHOT.jar`

### Frontend

```bash
cd frontend
npm run build
```

The build artifacts will be created in the `build/` directory.

## Troubleshooting

### Common Issues

1. **Database Connection Issues**
   - Ensure Oracle database is running
   - Verify connection parameters in `application.properties`
   - Check if the cardportal user exists and has proper permissions

2. **CORS Issues**
   - Verify CORS configuration in `CorsConfig.java`
   - Check that frontend URL is allowed in backend configuration

3. **Port Conflicts**
   - Backend default port: 8080
   - Frontend default port: 3000
   - Oracle default port: 1521

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.