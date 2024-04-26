import { TCourse } from './course.interface';
import { CourseModel } from './course.model';

const createCourseIntoDB = async (course: TCourse) => {
  const result = await CourseModel.create(course);
  return result;
};

const getAllCoursesFromDB = async (query: Record<string, unknown>) => {
  const queryObject = { ...query };

  let searchTerm = '';
  if (query?.searchTerm) {
    searchTerm = query?.searchTerm as string;
  }

  // filtering
  const excludeFields = ['searchTerm', 'sort', 'limit', 'page', 'fields'];
  excludeFields.forEach((el) => delete queryObject[el]);

  const searchQuery = CourseModel.find({
    $or: ['title', 'instructor', 'language', 'provider'].map((field) => ({
      [field]: { $regex: searchTerm, $options: 'i' },
    })),
  });

  const filterQuery = searchQuery.find(queryObject);

  let sort = '-title';
  if (query.sort) {
    sort = query.sort as string;
  }

  const sortQuery = filterQuery.sort(sort);

  let page = 1;
  let limit = 0;
  let skip = 0;

  if (query.limit) {
    limit = Number(query.limit);
  }

  if (query.page) {
    page = Number(query.page);
    skip = (page - 1) * limit;
  }

  const paginateQuery = sortQuery.skip(skip);

  const limitQuery = paginateQuery.limit(limit);

  let fields = '-__v';
  if (query.fields) {
    fields = (query.fields as string).split(',').join(' ');
  }

  const fieldQuery = await limitQuery.select(fields);

  return fieldQuery;
};

const updateACourseIntoDB = async (
  courseId: string,
  payload: Partial<TCourse>,
) => {
  const { tags, details, ...remainingCourseData } = payload;
  const modifiedUpdatedData: Record<string, unknown> = {
    ...remainingCourseData,
  };

  if (tags && Object.keys(tags).length) {
    for (const [key, value] of Object.entries(tags))
      modifiedUpdatedData[`tags.${key}`] = value;
  }

  if (details && Object.keys(details).length) {
    for (const [key, value] of Object.entries(details))
      modifiedUpdatedData[`details.${key}`] = value;
  }

  const result = await CourseModel.findByIdAndUpdate(
    courseId,
    modifiedUpdatedData,
    {
      new: true,
      runValidators: true,
    },
  );
  return result;
};

// const getCourseWithReviewFromDB = async (courseId:string, payload) => {

// }
export const CourseServices = {
  createCourseIntoDB,
  getAllCoursesFromDB,
  updateACourseIntoDB,
};
