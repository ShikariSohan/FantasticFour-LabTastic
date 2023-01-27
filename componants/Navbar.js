import Logo from "../componants/Logo";
import { Button } from "@mantine/core";
import { IconUser, IconTransferOut } from "@tabler/icons";
import axios from "axios";
import { useRouter } from "next/router";
import { useAuth } from "../context/AuthProvider";
import { useEffect, useState } from "react";

export default function Navbar() {
  const router = useRouter();
  const { auth, setAuth } = useAuth();
  const [isLoggedIn,setIsLoggedIn] = useState(false);
  const handleLogout = async () => {
    const result = await axios.post("/api/auth/logout");
    if (result.status === 200) {
      localStorage.setItem("user", JSON.stringify({ isLoggedIn: false }));
      router.push("/auth");
    }
  };
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setIsLoggedIn(user.isLoggedIn);
    }
  }, []);

   

  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div
          style={{
            justifyContent: "center",
            marginTop: 10,
            marginBottom: 20,
            alignSelf: "center",
          }}
        >
          <Logo size={35} weight={700} logoSize={"50px"} />
        </div>
        {isLoggedIn === true && (
          <div
            style={{ alignSelf: "flex-end", marginTop: -70, marginRight: 25 }}
          >
            <Button
              leftIcon={<IconUser />}
              variant="cyan"
              color="dark"
              sx={{ marginRight: "10px" }}
              onClick={() => router.push("/profile")}
            >
              Profile
            </Button>
            <Button
              leftIcon={<IconTransferOut />}
              variant="cyan"
              color="dark"
              onClick={handleLogout}
            >
              Logout
            </Button>
          </div>
        )}
        {isLoggedIn === false && (
          <div
            style={{ alignSelf: "flex-end", marginTop: -70, marginRight: 25 }}
          >
            <Button
              leftIcon={<IconUser />}
              variant="cyan"
              color="dark"
              sx={{ marginRight: "10px" }}
              onClick={() => router.push("/auth")}
            >
              Login
            </Button>
          </div>
        )}
      </div>
    </>
  );
}
