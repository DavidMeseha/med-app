import type { FC, ReactNode } from "react";
import Nav from "./Nav";
import { MessageProvider } from "@/context/MessageContext";
import { UserProvider } from "@/context/UserContext";
import { useRouter } from "next/router";

interface LayoutProps {
  children: ReactNode;
}

const AppLayout: FC<LayoutProps> = ({ children }) => {
  const router = useRouter();

  return (
    <MessageProvider>
      <UserProvider>
        <div className={router.locale === "ar" ? "rtl" : "ltr"}>
          <nav className="fixed top-0 w-full z-20">
            <Nav />
          </nav>
          <main className="h-[100vh]">{children}</main>
        </div>
      </UserProvider>
    </MessageProvider>
  );
};

export default AppLayout;
