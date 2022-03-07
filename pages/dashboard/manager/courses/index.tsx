import React, { useEffect, useState } from "react";
import "antd/dist/antd.css";
import ManagerLayout from "../../../../components/student/manager-layout";
import CourseCard from "../../../../components/course/course-card";
import { getCourseList } from "../../../api/api-service";
import { BackTop, Divider, List, Skeleton } from "antd";
import InfiniteScroll from "react-infinite-scroll-component";

interface ICourse {
  [key: string]: string | number;
}

export default function AllCourses() {
  const [loading, setLoading] = useState(false);
  const [courseList, setCourseList] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [paginator, setPaginator] = useState({
    page: 1,
    limit: 20,
  });

  // Show Courses List
  useEffect(() => {
    setLoading(true);

    getCourseList({ page: paginator.page, limit: paginator.limit }).then(
      (res) => {
        const { courses } = res;

        if ( courses) {
          setTimeout(()=>{
            // to concat a new courseList
            const newCourses = courseList.concat(courses);
            setCourseList(newCourses);
            console.log("new",newCourses)
          }, 1500)        
        }else {
          setHasMore(false)
        }
      }
    );

    setLoading(false);
  }, [paginator.page]);

  return (
    <ManagerLayout>
      <InfiniteScroll
        dataLength={courseList.length}
        next={() => setPaginator({ ...paginator, page: paginator.page + 1})}
        hasMore={hasMore}
        loader={<Skeleton avatar paragraph={{ rows: 1 }} active />}
        endMessage={<Divider plain>It is all, nothing more 🤐</Divider>}
        scrollableTarget="scrollableDiv"
      >
        <List
          grid={{ gutter: 16, column: 4 }}
          dataSource={courseList}
          renderItem={(course: ICourse) => (
            <List.Item>
              <CourseCard
                id={course.id}
                image={course.cover}
                name={course.name}
                duration={course.duration}
                teacher={course.teacherName}
                studentLimit={course.maxStudents}
                startTime={course.startTime}
                star={course.star}
              />
            </List.Item>
          )}
        />
      </InfiniteScroll>
      <BackTop/>
    </ManagerLayout>
  );
}
