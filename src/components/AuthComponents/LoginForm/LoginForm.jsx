import { useState, useEffect } from "react";
import useAuth from "../../../hooks/useAuth";
import useInput from "../../../hooks/useInput";
import { useLocation, useNavigate } from "react-router-dom";
import useToggle from "../../../hooks/useToggle";
import { toast } from "react-toastify";
import axiosCustom from "../../../services/api";
import { MdMail, MdKey } from "react-icons/md";
import AuthInput from "../AuthInput";
import Button from "../Button";

const LOGIN_URL = "/api/v1/auth/authenticate";
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const LoginForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/dashboard";
  const [user, resetUser, userAttribs] = useInput("user", "");
  const [pwd, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [loading, setLoading] = useState();
  const [check, toggleCheck] = useToggle("persist", false);

  const { auth, setAuth } = useAuth();

  useEffect(() => {
    setErrMsg("");
  }, [user, pwd]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (!emailRegex.test(user)) {
      toast.error("Please enter a valid email!");
      setLoading(false);
      return;
    }
    if (pwd.trim() === "") {
      toast.error("Please enter a password!");
      setLoading(false);
      return;
    }
    try {
      const response = await axiosCustom.post(
        LOGIN_URL,
        {
          email: user,
          password: pwd,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      const accessToken = response?.data?.access_token;
      setAuth({ user, accessToken });
      setLoading(false);
      navigate(from, { replace: true });
    } catch (err) {
      toast.error("Username or password is wrong");
      resetUser();
      setPwd("");
      setLoading(false);
    }
  };

  return (
    <>
      <div className="flex flex-col gap-4  w-[250px] sm:w-[320px]">
        <AuthInput
          inputAttribs={{
            id: "email",
            type: "email",
            placeholder: "Email",
            ...userAttribs,
          }}
          isLoginInput={true}
          Icon={MdMail}
        />
        <AuthInput
          inputAttribs={{
            id: "password",
            type: "password",
            placeholder: "Password",
            value: pwd,
            onChange: (e) => setPwd(e.target.value),
          }}
          isLoginInput={true}
          Icon={MdKey}
        />
      </div>

      <label
        htmlFor="persist"
        className="flex items-center gap-3 cursor-pointer text-text"
      >
        <div className="w-[14px] h-[14px] border-2 border-[#B6B6B6] rounded focus-within:border-none focus-within:outline-none transition">
          {check && <div className="w-full h-full bg-[#B6B6B6]"></div>}
        </div>
        <span className="text-[#8894AA] text-xs sm:text-sm">Remember me</span>
        <input
          type="checkbox"
          className="hidden"
          onChange={toggleCheck}
          id="persist"
          checked={check}
        />
      </label>

      <Button onClick={handleLogin} loading={loading} text="Login" />
    </>
  );
};

export default LoginForm;
