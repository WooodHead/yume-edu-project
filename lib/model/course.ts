
export interface CourseShort {
  id: number;
  name: string;
  courseId: number;
}

export interface ICourseDetails {
    cover: string;
    name: string;
    id: number;
    duration: number;
    teacherName: string;
    maxStudents: number;
    startTime: string;
    star: number;
  }