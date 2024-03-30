import { type FC, useState } from "react";
import Input from "./Input";
import Button from "./Button";
import useUser from "@/hooks/useUser";
import useMessage from "@/hooks/useMessage";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";

interface UserCommentProps {
  id: string;
}

const UserComment: FC<UserCommentProps> = ({ id }) => {
  const { user } = useUser();
  const router = useRouter();
  const { setDoneMessage, setErrorMessage } = useMessage();
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();

  const addComment = () => {
    setLoading(true);

    let body = {
      to: id,
      doctor: user?.id,
      comment,
    };

    fetch("/api/note", { method: "POST", body: JSON.stringify(body) })
      .then((res) => {
        if (res.status === 200) {
          setDoneMessage(t("commentAddedSuccessfuly"));
        } else if (res.status === 401) {
          setErrorMessage(t("notAuthorized"));
          router.push("/login");
        } else {
          setErrorMessage(t("serverErrorComment"));
        }
      })
      .catch((e) => {
        setErrorMessage(t("serverErrorComment"));
        console.log(e);
      });

    setLoading(false);
  };

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
        <Button onClick={addComment} loading={loading}>
          {t("send")}
        </Button>
      </div>
    </div>
  );
};
export default UserComment;
