import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import { AuthRoute } from './app/modules/auth/auth.route';
import { CategoryRoutes } from './app/modules/category/category.route';
import { CourseRoutes } from './app/modules/course/course.route';
import { ReviewRoutes } from './app/modules/review/review.router';
import { UserRoute } from './app/modules/users/user.route';
const app: Application = express();

// parsers
app.use(express.json());
app.use(cors());

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World! from course-review-with-auth server');
});

app.use('/api', CourseRoutes);
app.use('/api', CategoryRoutes);
app.use('/api', ReviewRoutes);
app.use('/api', UserRoute);
app.use('/api', AuthRoute);

export default app;
