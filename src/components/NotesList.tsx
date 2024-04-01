import { formatTime } from "@/utility/formatTime";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Note } from "./profile/User";
import { useTranslation } from "next-i18next";

export default function NotesList() {
  const { t } = useTranslation();

  const { data, isFetching } = useQuery({
    queryKey: ["notes"],
    queryFn: async () =>
      axios.get<Note[]>("/api/notes").then((response) => response.data),
  });

  return (
    <ul className="space-y-4 overflow-auto max-h-[50vh]">
      {isFetching ? (
        <div className="my-6 text-center">{t("loading")}</div>
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
        <div className="my-10 text-center">{t("noNotesAvailable")}</div>
      )}
    </ul>
  );
}
