import Button from "@/components/Button";
import Input from "@/components/Input";
import useUser from "@/hooks/useUser";
import { useRouter } from "next/router";
import { useState } from "react";

const index = ({}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { user, isFetching, login } = useUser();
  const router = useRouter();

  function submitHandle(e: any) {
    e.preventDefault();
    login(email, password);
  }

  if (!user)
    return (
      <div className="flex justify-center items-center h-full">
        <form
          onSubmit={submitHandle}
          className="space-y-4 w-11/12 max-w-[400px] p-4 bg-white shadow-sm rounded-md"
        >
          <div className="flex justify-between items-center w-full">
            <div className="font-bold text-3xl">Login</div>
            <div
              onClick={() => router.push("/regester")}
              className="text-primary text-sm underline cursor-pointer"
            >
              Don't have an account?
            </div>
          </div>
          <div>
            <Input
              type="email"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              name="email"
              required
            />
          </div>
          <div>
            <Input
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              name="password"
              required
            />
          </div>
          <Button onClick={() => {}} loading={isFetching}>
            Login
          </Button>
        </form>
      </div>
    );
};
export default index;
