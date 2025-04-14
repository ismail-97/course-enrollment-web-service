# Course Enrollment Managment API
### A RESTful API for managing courses and enrollments that uses JWT for authentication, authorizes actions depending on user's role, and persists data in a database.

## Setup Instructions

1. **Clone the repository:**
 
   ```bash
   git clone git@github.com:ismail-97/course-enrollment-web-service.git

3. **Provide enviroment variables in .env file:**

   ```bash
   DATABASE_URL=<valid-postgres-url>
   SECRET= <JWT-secret>


## Two Options For Running:

### First Option: Run With Docker
    
    docker-compose up --build
    
### Second Option: Run in Local Machine

  1. **Install dependencies:**

     ```bash
     npm install

  3. **Run the app:**
      
      - for production:

        ```bash
        node index.js
      
      - for development

        ```bash
        npm run dev


## Sample API requests using Postman:

  1. **Login**

     ```bash
     POST /api/login
     Content-Type: application/json
     {
       "email": "ismail@gmail.com",
       "password": "12ertyre"
     }
     
  2. **Get Courses as Student**

     ```bash
     GET /api/courses
     Authorization: Bearer + "JWT token"

  3. **Get Courses as Student (Only Published Courses Returned with limited access)**

     ```bash
     GET /api/courses
     Authorization: Bearer + "JWT token"

  4. **Get Enrollments as Student (Only his own Enrollments Returned with full details)**

     ```bash
     GET /api/enrollments
     Authorization: Bearer + "JWT token"

  5. **Enroll student (Only Instructor)**

     ```bash
     post /api/enrollments
     Content-Type: application/json
     Authorization: Bearer + "JWT token"
     {
       "email": "ismail@gmail.com",
       "courseId": 15
     }

  6. **Un-enroll student (Only Instructor)**

     ```bash
     delete /api/enrollments
     Content-Type: application/json
     Authorization: Bearer + "JWT token"
     {
       "email": "ismail@gmail.com",
       "courseId": 15
     }
     
  7. **Add course (Only Instructor)**

     ```bash
     POST /api/courses
     Content-Type: application/json
     Authorization: Bearer + "JWT token"
     {
       "title": "Advanced Docker Orchestration",
       "description": "Master Docker Swarm and Kubernetes in 4 weeks",
       "price": 129,
       "is_published": true,
       "content": "Week 1: Containers 101\nWeek 2: Kubernetes Fundamentals\n..."
     }
  
  8. **Remove course (Only Admin)**

     ```bash
     Delete /api/courses/:id
     Content-Type: application/json
     Authorization: Bearer + "JWT token"

    


