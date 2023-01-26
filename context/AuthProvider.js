import { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const router = useRouter();
  const [auth, setAuth] = useState({
    isLoggedIn: false,
  });
  const [IsTeacher, setIsTeacher] = useState(false);
  const [isStudent, setIsStudent] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const headers = {
    "Content-Type": "application/json",
  };

  useEffect(() => {
    setLoading(true);
    const verifyCookie = async () => {
      try {
        const result = await axios.post(
          "/api/auth/verify",
          "",
          {
            headers: headers,
          },
          { withCredentials: true }
        );
        const email = result.data.user.email;
        const name = result.data.user.name;
        const id = result.data.user.id;

        console.log("from context", result.data);
        setAuth({
          user: email,
          name: name,
          id: id,
          isLoggedIn: true,
          role: result.data.user.role,
        });
        
        setIsLoggedIn(true);
        if (result.data.user.role === "teacher") setIsTeacher(true);
        if (result.data.user.role === "student") setIsStudent(true);
        console.log("from context", IsTeacher, result.data.user.role);
        setLoading(false);
      } catch (e) {
        console.log(e);
      } finally {
        setLoading(false);
      }
    };
    verifyCookie();
  }, []);
  const logout = async () => {
    setLoading(true);
    try {
      const result = await axios.post("/api/auth/logout");
      setAuth({});
      setIsTeacher(false);
      setIsStudent(false);
      setLoading(false);
      router.push("/");
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };
  return (
    <AuthContext.Provider
      value={{
        auth,
        setAuth,
        loading,
        IsTeacher,
        setIsTeacher,
        isStudent,
        setIsStudent,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
export const useAuth = () => {
  return useContext(AuthContext);
};

export default AuthContext;
