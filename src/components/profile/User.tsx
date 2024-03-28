import useUser from "@/hooks/useUser";
import { type FC } from "react";
import Link from "next/link";
import NotesList from "../NotesList";

export interface Note {
  doctor: { name: string; id: string };
  date: Date;
  body: string;
}

const UserProfile = () => {
  const { user, isFetching } = useUser();

  if (isFetching) return <div className="mt-28 text-center">Loading...</div>;

  if (!user && !isFetching)
    return (
      <div className="mt-28 text-center">
        You Need To
        <span className="text-blue-700 underline ms-2">
          <Link href="/login">Login</Link>
        </span>
      </div>
    );

  if (user) {
    return (
      <div className="flex justify-center items-center h-full">
        <div className="space-y-4 w-11/12 max-w-[400px] p-4 bg-white shadow-sm rounded-md">
          <div className="text-center font-bold text-lg text-primary">
            {user.name}
          </div>
          <div className="">Doctors Notes</div>
          <NotesList />
        </div>
      </div>
    );
  }
};
export default UserProfile;
