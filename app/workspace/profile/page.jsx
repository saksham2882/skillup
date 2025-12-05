import { UserProfile } from "@clerk/nextjs"

const Profile = () => {
  return (
    <div className="flex flex-col items-center">
      <h2 className="font-bold text-3xl text-white mb-8 self-start">
        Profile Settings
      </h2>

      <div className="w-full flex justify-center">
        <UserProfile
          routing="hash"
        />
      </div>
    </div>
  );
}

export default Profile