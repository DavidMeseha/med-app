import { type FC, useState } from "react";
import Input from "./Input";
import Button from "./Button";
import useUser from "@/hooks/useUser";
import useMessage from "@/hooks/useMessage";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";

interface UserCommentProps {
  id: string;
}

const UserComment: FC<UserCommentProps> = ({ id }) => {
  const router = useRouter();
  const { setDoneMessage, setErrorMessage } = useMessage();
  const [comment, setComment] = useState("");
  const { t } = useTranslation();

  const addCommentMutation = useMutation({
    mutationKey: ["add-comment"],
    mutationFn: ({ to, comment }: { to: string; comment: string }) =>
      axios
        .post<string>("/api/note", { to, comment })
        .then((response) => response.data),
    onSuccess: () => {
      setDoneMessage(t("commentAddedSuccessfuly"));
      setComment("");
    },
    onError: (error: AxiosError) => {
      if (error.response?.status === 401) {
        setErrorMessage(t("notAuthorized"));
        router.push("/login");
      } else {
        setErrorMessage(t("serverErrorComment"));
      }
    },
  });

  const addComment = () => addCommentMutation.mutate({ to: id, comment });

  return (
    <div className="flex gap-2 w-full">
      <div className="grow">
        <Input
          onChange={(e) => setComment(e.target.value)}
          value={comment}
          type="text"
          placeholder={t("comment")}
          name="comment"
          required
        />
      </div>
      <div className="w-20">
        <Button onClick={addComment} loading={addCommentMutation.isPending}>
          {t("send")}
        </Button>
      </div>
    </div>
  );
};
export default UserComment;
