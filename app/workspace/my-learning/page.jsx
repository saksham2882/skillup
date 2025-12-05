import EnrollCourseList from "../_components/EnrollCourseList"

const MyLearning = () => {
  return (
    <div className="space-y-6">
      <div className="bg-slate-900/50 border border-white/5 p-6 rounded-2xl flex flex-col md:flex-row justify-between items-center gap-4">
        <div>
          <h2 className="font-bold text-2xl text-white">
            My Learning Journey
          </h2>
          
          <p className="text-slate-400 text-sm">
            Track your progress and continue your active courses.
          </p>
        </div>
      </div>

      <EnrollCourseList />
    </div>
  );
}

export default MyLearning