"use client";
import { useState, useEffect } from "react";
import { signIn } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Loading from "../components/loading";
import Image from "next/image";
import BgLogin2 from "../assets/images/bg-login2.jpg";
import BgLogin from "../assets/images/bg-login.jpg";
import { FaUserLock } from "react-icons/fa6";
import { TbUser, TbCircleKey } from "react-icons/tb";
import Swal from "sweetalert2";
import Progress from "../components/progress";

export default function Login() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    if (status === "loading") return;

    if (session) router.replace("/");
    else setLoading(false);
  }, [session, status, router]);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    // setProcessing(true);
    setLoading(true);
    e.preventDefault();
    try {
      const res = await signIn("credentials", {
        username,
        password,
        redirect: false,
      });
      if (res.error) {
        Swal.fire({
          text: "Invalid credentials",
          icon: "error",
          confirmButtonText: "OK",
        });
        // setProcessing(false);
        setLoading(false);
        return;
      }
      // setProcessing(false);
      //setLoading(true);
      router.replace("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      {loading ? (
        <Loading />
      ) : (
        <div className="flex justify-center items-center bg-gray-200 loading-custom" style={{minHeight: "100vh"}}>
          <div
            className="grid grid-cols-2 gap-0 w-[70%]"
            style={{
              minHeight: "500px",
              backgroundColor: "#fff",
              borderRadius: "40px",
              boxShadow: "0 3px 6px rgba(0, 0, 0, 0.1)",
            }}
          >
            <div
              className="p-4 text-center"
              style={{
                //backgroundColor: "var(--main-color)",
                position: "relative",
                backgroundImage: `url(${BgLogin2.src})`,
                backgroundSize: "cover",
                borderRadius: "40px 0 0 40px",
                backgroundPosition: "center",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  backgroundImage:
                    "linear-gradient(45deg, var(--sub-color), var(--background))",
                  borderRadius: "40px 0 0 40px",
                  opacity: 0.8,
                }}
              ></div>
            </div>
            <div
              className="p-4 flex text-center justify-center items-center"
              style={{
                backgroundColor: "#fff",
                borderRadius: "0 40px 40px 0",
              }}
            >
              <form onSubmit={handleSubmit}>
                <h3 className="text-4xl font-bold gradient-text">NEXTAUTH</h3>
                <hr className="mt-2 mb-5" />
                <label className="flex text-left">
                  <TbUser className="h-6 w-6" />
                  <span className="mx-1">Username</span>
                </label>
                <input
                  onChange={(e) => setUsername(e.target.value)}
                  className="main-input"
                  type="text"
                  placeholder="Enter your username"
                />
                <label className="flex text-left mt-4">
                  <TbCircleKey className="h-6 w-6" />
                  <span className="mx-1">Password</span>
                </label>
                <input
                  onChange={(e) => setPassword(e.target.value)}
                  className="main-input disabled:bg-gray-200"
                  type="password"
                  placeholder="Enter your password"
                />
                <button
                  type="submit"
                  className="main-button w-[100%] mt-6"
                  disabled={processing}
                  onClick={handleSubmit}
                >
                  Login
                </button>

                {/* {error && <div className="my-2 text-red">{error}</div>} */}
              </form>
            </div>
            <div className="absolute justify-center items-center top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-4 z-10 rounded-full">
              {/* <Image
                src={loginImage}
                className="object-contain"
                alt=""
                width={78}
                height={78}
              /> */}
              <FaUserLock className="sm:text-sm md:text-4xl lg:text-6xl xl:text-7xl" />
            </div>
          </div>
          {/* <div
            className="text-center py-5"
            style={{
              display: "flex",
              justifyContent: "center",
              backgroundColor: "#fff",
              align: "center",
              padding: "20px",
              borderRadius: "20px",
              boxShadow: "0 3px 6px rgba(0, 0, 0, 0.1)",
              marginTop: "30vh",
            }}
          >
            
          </div> */}
        </div>
      )}
    </div>
  );
}
