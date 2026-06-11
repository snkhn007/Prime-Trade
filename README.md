# Prime Trade API

## Setup
1. Clone the repo
2. Run `npm install`
3. Create `.env` file:
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret
ADMIN_EMAIL=admin@primetrade.com
ADMIN_PASSWORD=yourpassword

4. Seed admin: `node seedAdmin.js`
5. Run: `npx nodemon app.js`

## API Endpoints

### Auth
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/v1/signup | Register user |
| POST | /api/v1/login | Login |
| GET | /api/v1/logout | Logout |

### Tasks (JWT required)
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/v1/tasks | Get all tasks |
| POST | /api/v1/tasks | Create task |
| PUT | /api/v1/tasks/:id | Update task |
| DELETE | /api/v1/tasks/:id | Delete task |

### Admin (Admin JWT required)
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/v1/admin/users | Get all users |

## Tech Stack
- Node.js, Express.js
- MongoDB, Mongoose
- JWT, bcryptjs
- HTML, CSS, Vanilla JS