import { formatTime } from "@/utility/formatTime";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Note } from "./profile/User";

export default function NotesList() {
  const { data, isFetching } = useQuery({
    queryKey: ["notes"],
    queryFn: async () =>
      axios.get<Note[]>("/api/notes").then((response) => response.data),
  });

  return (
    <ul className="space-y-4">
      {isFetching ? (
        <div className="my-6 text-center">Loading</div>
      ) : !!data && data?.length > 0 ? (
        data.map((note, i) => {
          return (
            <li key={i} className="p-2 rounded-md bg-highlight">
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <div className="text-base text-primary">
                    {note.doctor.name}
                  </div>
                  <div className="text-xs">{formatTime(note.date)}</div>
                </div>
                <p className="text-sm">{note.body}</p>
              </div>
            </li>
          );
        })
      ) : (
        <div className="my-10 text-center">No notes avilable</div>
      )}
      <li className="p-2 rounded-md">
        <p className="text-gray-400 text-xs">
          This is a non-doctor's Profile Page and listed all notes for this
          user.
        </p>
      </li>
    </ul>
  );
}
