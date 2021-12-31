import { useState, useEffect } from "react";
import Navbar from "../../component/Navbar";
import IdentifyCodePage from "../../component/IdentifyCodePage";
import { CSSTransition } from "react-transition-group";
import Require from "../../utils/request";
import { LOGIN, REGISTER } from "../../utils/pathMap";

function App() {
  const [userChoice, setUserChoice] = useState("Login");
  const [showIdentify, setShowIdentify] = useState(false);
  useEffect(() => {
    console.log(showIdentify);
  }, [showIdentify]);

  const [loginUsername, setLoginUsername] = useState(undefined);
  const [loginPassword, setLoginPassword] = useState(undefined);
  const [registEmail, setRegistEmail] = useState(undefined);
  const [registPassword, setRegistPassword] = useState(undefined);
  const [registRePassword, setRegistRePassword] = useState(undefined);
  const [registUsername, setRegistUsername] = useState(undefined);

  const sentLogin = async () => {
    const res = await Require.post(LOGIN, {
      email: loginUsername,
      password: loginPassword,
    });
    console.log(res);
  };

  const sentRegist = async () => {
    const res = await Require.post(REGISTER, {
      username: registUsername,
      email: registEmail,
      password: registPassword,
    });
    console.log(res);
  };

  return (
    <>
      <CSSTransition
        in={showIdentify}
        timeout={200}
        classNames="Fade"
        unmountOnExit
      >
        <>
          <IdentifyCodePage
            close={() => {
              setShowIdentify(false);
            }}
          />
        </>
      </CSSTransition>
      <Navbar fullscreen>
        <div
          className={`absolute z-10 top-64 left-36 text-5xl text-center leading-snug ${
            userChoice === "Login" && "blur-xl"
          } filter transition-all duration-500`}
          style={{
            width: "26.875rem",
            height: "15rem",
          }}
        >
          IF YOU HAVE AN ACCOUNT, PLEASE CLICK{" "}
          <span
            className="cursor-pointer text-pink-600 hover:text-blue-500 transition-all"
            onClick={() => {
              setUserChoice("Login");
            }}
          >
            HERE
          </span>{" "}
          TO LOGIN IN
        </div>
        <div
          className={`absolute z-10 right-36 top-64 text-5xl text-center leading-snug ${
            userChoice !== "Login" && "blur-xl"
          } filter transition-all duration-500`}
          style={{
            width: "26.875rem",
            height: "15rem",
          }}
        >
          IF YOU HAVE NO ACCOUNT, PLEASE CLICK{" "}
          <span
            className="cursor-pointer text-pink-600 hover:text-blue-500 transition-all "
            onClick={() => {
              setUserChoice("Regist");
            }}
          >
            HERE
          </span>{" "}
          TO REGIST
        </div>
        {/* big circle */}
        <div
          className="relative bg-gray-800 bg-opacity-50 rounded-full z-20 transition-all duration-700"
          style={{
            left: `${userChoice === "Login" ? "-48rem" : "43rem"}`,
            top: `${userChoice === "Login" ? "-34.3125rem" : "-19rem"}`,
            width: "100rem",
            height: "100rem",
            boxShadow: `${
              userChoice === "Login"
                ? "10px 10px 20px rgba(20, 1, 1, 0.25)"
                : "-10px -10px 20px rgba(20, 1, 1, 0.25)"
            }`,
            // background: `url(${circleBG})`,
            backgroundColor: "#edebff",
          }}
        >
          {/* Login frame */}
          <div
            className="absolute rounded-3xl z-30 flex flex-col justify-around items-center bg-white"
            style={{
              backgroundColor: "#edebff",
              width: "26rem",
              height: "33rem",
              left: "60rem",
              top: "39rem",
              // boxShadow:
              //   "drop-shadow(-10px -10px 10px #FFFFFF) drop-shadow(10px 10px 10px #000000);",
              boxShadow:
                "-8px -8px 8px rgb(255, 255, 255), 15px 15px 15px rgb(210,210,240)",
            }}
          >
            {/* 用于撑开flex布局 */}
            <div className=""></div>
            {/* 登录标题 */}
            <div className="text-2xl font-bold">LOGIN</div>
            {/* 登录的两个输入框 */}
            <div className="">
              <div className="w-80 h-10 rounded-3xl my-4">
                <input
                  type="text"
                  placeholder="你的账户"
                  value={loginUsername}
                  onChange={(e) => {
                    setLoginUsername(e.target.value);
                  }}
                  className="w-80 h-10 rounded-3xl bg-white outline-none pl-4 hover:ring-1 focus:ring-2 duration-500"
                />
              </div>
              <div className="w-80 h-10 rounded-3xl bg-gray-300 my-4">
                <input
                  type="password"
                  placeholder="密码"
                  value={loginPassword}
                  onChange={(e) => {
                    setLoginPassword(e.target.value);
                  }}
                  className="w-80 h-10 rounded-3xl bg-white outline-none pl-4 hover:ring-1 focus:ring-2 duration-500"
                />
              </div>
            </div>
            {/* 登录按钮 */}
            <div
              className="w-24 h-11 rounded-2xl bg-white flex justify-center items-center
              hover:shadow-md transition-all cursor-pointer"
              onClick={sentLogin}
            >
              <span>login</span>
            </div>
            {/* 用于撑开flex布局 */}
            <div className=""></div>
          </div>
          {/* Regist frame */}
          <div
            className="absolute rounded-3xl z-30 flex flex-col justify-around items-center"
            style={{
              width: "26rem",
              height: "33rem",
              left: "16rem",
              top: "25rem",
              boxShadow:
                "-8px -8px 8px rgb(255, 255, 255), 15px 15px 15px rgb(210,210,240)",
            }}
          >
            {/* 用于撑开flex布局 */}
            <div className=""></div>
            {/* 注册标题 */}
            <div className="text-2xl font-bold">Regist</div>
            {/* 注册的四个输入框 */}
            <div className="">
              <div className="w-80 h-10 rounded-3xl my-5">
                <input
                  type="text"
                  placeholder="你的用户名"
                  value={registUsername}
                  onChange={(e) => setRegistUsername(e.target.value)}
                  className="w-80 h-10 rounded-3xl bg-white outline-none pl-4 hover:ring-1 focus:ring-2 duration-500"
                />
              </div>
              <div className="w-80 h-10 rounded-3xl my-5">
                <input
                  type="email"
                  placeholder="你的邮件"
                  value={registEmail}
                  onChange={(e) => setRegistEmail(e.target.value)}
                  className="w-80 h-10 rounded-3xl bg-white outline-none pl-4 hover:ring-1 focus:ring-2 duration-500"
                />
              </div>
              <div className="w-80 h-10 rounded-3xl bg-gray-300 my-5">
                <input
                  type="password"
                  placeholder="密码"
                  value={registPassword}
                  onChange={(e) => setRegistPassword(e.target.value)}
                  className="w-80 h-10 rounded-3xl bg-white outline-none pl-4 hover:ring-1 focus:ring-2 duration-500"
                />
              </div>
              <div className="w-80 h-10 rounded-3xl bg-gray-300 my-5">
                <input
                  type="password"
                  placeholder="确认密码"
                  value={registRePassword}
                  onChange={(e) => setRegistRePassword(e.target.value)}
                  className="w-80 h-10 rounded-3xl bg-white outline-none pl-4 hover:ring-1 focus:ring-2 duration-500"
                />
              </div>
            </div>
            {/* 注册按钮 */}
            <div
              className="w-24 h-11 rounded-2xl bg-white flex justify-center 
              items-center cursor-pointer hover:shadow-md transition-all "
              onClick={() => {
                // setShowIdentify(true)
                sentRegist();
              }}
            >
              <span>regist</span>
            </div>
            {/* 用于撑开flex布局 */}
            <div className=""></div>
          </div>
        </div>
      </Navbar>
    </>
  );
}

export default App;
