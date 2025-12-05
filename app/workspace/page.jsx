import CourseList from "./_components/CourseList"
import EnrollCourseList from "./_components/EnrollCourseList"
import WelcomeBanner from "./_components/WelcomeBanner"

const Workspace = () => {
  return (
    <div className="space-y-8 pb-10">
      <WelcomeBanner />

      <div className="space-y-12">
        <EnrollCourseList />
        <CourseList />
      </div>
    </div>
  );
}

export default Workspace