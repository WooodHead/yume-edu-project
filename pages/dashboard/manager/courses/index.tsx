import React, { useEffect, useState } from "react";
import "antd/dist/antd.css";
import ManagerLayout from "../../../../components/student/manager-layout";
import CourseCard from "../../../../components/course/course-card";
import { getCourseList } from "../../../api/api-service";
import { BackTop, Divider, List, Skeleton, Spin } from "antd";
import InfiniteScroll from "react-infinite-scroll-component";
import { ICourseDetails } from "../../../../lib/model/course";

export default function AllCourses() {
  const [courseList, setCourseList] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [paginator, setPaginator] = useState({
    page: 1,
    limit: 20,
  });

  // Show Courses List
  useEffect(() => {
    getCourseList({ page: paginator.page, limit: paginator.limit }).then(
      (res) => {
        const { courses } = res;

        if (courses) {
          setTimeout(() => {
            // to concat a new courseList
            const newCourses = courseList.concat(courses);
            setCourseList(newCourses);
            // console.log("new", newCourses);
          }, 1500);
        } else {
          setHasMore(false);
        }
      }
    );

  }, [paginator.page]);

  return (
    <ManagerLayout>
      <InfiniteScroll
        dataLength={courseList.length}
        next={() => setPaginator({ ...paginator, page: paginator.page + 1 })}
        hasMore={hasMore}
        loader={
          <Spin
            style={{
              position: "relative",
              left: "50%",
              transform: "translateX(50%)",
            }}
          />
        }
        endMessage={<Divider plain>It is all, nothing more 🤐</Divider>}
        scrollableTarget="scrollableDiv"
      >
        <List
          grid={{ gutter: 16, column: 4 }}
          dataSource={courseList}
          renderItem={(course: ICourseDetails) => (
            <List.Item>
              <CourseCard {...course} />
            </List.Item>
          )}
        />
      </InfiniteScroll>
      <BackTop />
    </ManagerLayout>
  );
}
