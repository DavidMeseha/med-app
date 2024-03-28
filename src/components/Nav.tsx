import { useRouter } from "next/router";
import useUser from "@/hooks/useUser";
import Link from "next/link";

const Nav = () => {
  const router = useRouter();
  const { user, isFetching, logout } = useUser();

  return (
    <div className="flex justify-between items-center bg-white py-4 px-4 md:px-16 shadow-sm text-primary">
      <Link href="/" className="font-extrabold text-2xl">
        LOGO
      </Link>
      <div className="flex justify-end gap-2 min-w-[150px]">
        {isFetching && <div className="text-strong-highlight">...loading</div>}
        {!user && !isFetching && (
          <div
            className="cursor-pointer hover:underline"
            onClick={() => router.push("/login")}
          >
            login
          </div>
        )}
        {user && !isFetching && (
          <div
            onClick={() => {
              if (router.pathname.startsWith("/profile")) router.push("/");
              logout();
            }}
            className="cursor-pointer hover:underline"
          >
            logout
          </div>
        )}
        {user && !isFetching && (
          <div className="cursor-pointer hover:underline">
            Hello <Link href={"/profile"}>{user.name.split(" ")[0]}</Link> !
          </div>
        )}
      </div>
    </div>
  );
};
export default Nav;
