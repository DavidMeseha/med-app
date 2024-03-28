import useMessage from "@/hooks/useMessage";
import { queryClient } from "@/pages/_app";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/router";
import { createContext, ReactNode, type FC, useState, useEffect } from "react";

export interface User {
  id: string;
  email: string;
  name: string;
  role: "doctor" | "user" | "";
}

export interface Credentials {
  email?: string;
  password?: string;
}

const UserContext = createContext<{
  user: User | null;
  isFetching: boolean;
  logout: () => void;
  login: (pass: string, email: string) => void;
}>({
  user: null,
  isFetching: false,
  logout: () => {},
  login: () => {},
});

export const UserProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const router = useRouter();
  const { setErrorMessage } = useMessage();
  const [user, setUser] = useState<User | null>(null);

  const loginQuery = useQuery({
    queryKey: ["user"],
    queryFn: () =>
      axios
        .post<User>("/api/login")
        .then((response) => response.data)
        .then((data) => {
          setUser(data);
          if (router.pathname === "/login") router.push("/");
          return data;
        })
        .catch(() => {
          setUser(null);
          return null;
        }),
  });

  const loginMutation = useMutation({
    mutationKey: ["user"],
    mutationFn: ({ password, email }: Credentials) =>
      axios
        .post<User>("/api/login", { email, password })
        .then((response) => response.data),
    onSuccess: (data) => {
      setUser(data);
      if (router.pathname === "/login") router.push("/profile");
    },
    onError: (error: AxiosError) => {
      if (error.response?.status === 500)
        return setErrorMessage("Internal server error");
      if (error.response?.status === 401 || error.response?.status === 404)
        setErrorMessage("Wrong email or Password");
      queryClient.clear();
    },
  });

  const logoutMutation = useMutation({
    mutationKey: ["logout"],
    mutationFn: () => axios.get("/api/logout"),
    onSuccess: () => {
      queryClient.clear();
    },
  });

  function logout() {
    logoutMutation.mutate();
  }

  function login(email: string, password: string) {
    loginMutation.mutate({ email, password });
  }

  return (
    <UserContext.Provider
      value={{
        user,
        isFetching: loginQuery.isPending || loginMutation.isPending,
        logout,
        login,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
export default UserContext;
