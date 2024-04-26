# course-review-with-auth

- github: https://github.com/mahdimortuza/course-review-with-auth.git
- vercel live server: https://course-review-with-auth-delta.vercel.app/

- This is the server side of Course Review project. It is built to create, update, category wise sorting and reviewing courses. It has also authentication system that helps to login and registration

* steps to use the server.

1. Clone the code from provided github link
2. Add MongoDB link on the .env file
3. Make HTTP requests using Postman or any other API testing application. Check MongoDB database to be assured about creating updating and fetching data.

### credentials------->

User Login:
Username: user_doe
Password: 123456

Admin Login:
Username: admin_doe
Password: 123456

### env info for development purpose

NODE_ENV=development
PORT=5000
DB_URL=mongodb+srv://course-review:zqX5LDx3wqeJPgdm@cluster0.kqpbf9w.mongodb.net/course-review?retryWrites=true&w=majority
BCRYPT_SALT_ROUND= 12
JWT_ACCESS_SECRET=f5d45379679d19716892bef8d753fe7891eb1a86c546a2090c5237e2a037f3d2
