import React, { useEffect, useState } from "react";
import { useRef } from "react";
import { Slide, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { v4 as uuidv4 } from "uuid";

const Manager = () => {
  const ref = useRef();
  const passwordRef = useRef();

  const [form, setform] = useState({ site: "", username: "", password: "" });
  const [passwordArray, setPasswordArray] = useState([]);

  const getPasswords = async (params) => {
    let req = await fetch("http://localhost:3000/");
    let passwords = await req.json();
    console.log(passwords)
    setPasswordArray(passwords);
  };

  useEffect(() => {
    getPasswords();
  }, []);

  const copyText = (text) => {
    navigator.clipboard.writeText(text);
    toast("Copied to clipboard", {
      position: "bottom-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: false,
      progress: undefined,
      theme: "dark",
      transition: Slide,
    });
  };

  const showPassword = () => {
    // alert("Show the password");
    passwordRef.current.type = "text";
    console.log(ref.current.src);
    if (ref.current.src.includes("icons/hidden.png")) {
      ref.current.src = "icons/eye.png";
      passwordRef.current.type = "password";
    } else {
      ref.current.src = "icons/hidden.png";
      passwordRef.current.type = "text";
    }
  };

  const savePassword = async () => {
    if (
      form.site.length > 0 &&
      form.username.length > 0 &&
      form.password.length > 0
    ) {
      // If any such id exists delete it
      // await fetch("http://localhost:3000/", {method: "DELETE", headers: {"Content-Type": "application/json"}, body: JSON.stringify({id: form.id})})

      setPasswordArray([...passwordArray, { ...form, id: uuidv4() }]);
      await fetch("http://localhost:3000/", {method: "POST", headers: {"Content-Type": "application/json"}, body: JSON.stringify({...form, id:uuidv4()})})

      // localStorage.setItem(
      //   "passwords",
      //   JSON.stringify([...passwordArray, { ...form, id: uuidv4() }])
      // );
      // console.log([...passwordArray, form]);
      setform({ site: "", username: "", password: "" });
      alert("Password saved");
    } else {
      toast("Enter valid details", {
        position: "bottom-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: "dark",
        transition: Slide,
      });
    }
  };

  const editPassword = (id) => {
    console.log("Editing password with id", id);
    setform({...passwordArray.filter(i => i.id === id)[0], id: id});
    setPasswordArray(passwordArray.filter(item => item.id !== id));
  };

  const deletePassword = async (id) => {
    console.log("Deleteting password with id", id);
    let c = confirm("Do you really want to delete this password?");
    if (c) {
      setPasswordArray(passwordArray.filter(item => item.id !== id));
      // localStorage.setItem(
      //   "passwords",
      //   JSON.stringify(passwordArray.filter((item) => item.id != id))
      // );
      let res = await fetch("http://localhost:3000/", {method: "DELETE", headers: {"Content-Type": "application/json"}, body: JSON.stringify({id})})
    }
  };

  const handleChange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable={false}
        pauseOnHover={false}
        theme="dark"
        transition={Slide}
      />
      {/* Same as */}
      <ToastContainer />

      
      <div className="p-2 md:p-0 md:mycontainer">
        <h1 className="text-slate-800 text-4xl font-bold text-center mt-10">
          <span className="text-purple-400">&lt;</span> pass
          <span className="text-purple-400 text-5xl font-semibold">
            D
          </span>code <span className="text-purple-400">&gt;</span>
        </h1>
        <p className="text-slate-800 text-xl text-center p-1">
          Your personal Password Manager
        </p>

        <div className="text-black flex flex-col p-4 gap-8 items-center">
          <input
            value={form.site}
            onChange={handleChange}
            className="rounded-full border-2 border-purple-500 w-full p-4 py-1"
            type="text"
            name="site"
            id="site"
            placeholder="Website name"
          />
          <div className="flex flex-col md:flex-row w-full gap-8">
            <input
              value={form.username}
              onChange={handleChange}
              className="rounded-full border-2 border-purple-500 w-full p-4 py-1"
              type="text"
              name="username"
              id="username"
              placeholder="Username"
            />
            <div className="relative">
              <input
                ref={passwordRef}
                value={form.password}
                onChange={handleChange}
                className="rounded-full border-2 border-purple-500 w-full p-4 py-1"
                type="password"
                name="password"
                id="password"
                placeholder="Password"
              />
              <span
                className="absolute right-2 top-1.5 cursor-pointer"
                onClick={showPassword}
              >
                <img
                  ref={ref}
                  className="w-6 p-0.5"
                  src="icons/eye.png"
                  alt="eye"
                />
              </span>
            </div>
          </div>
          <button
            onClick={savePassword}
            className="bg-purple-400 flex rounded-full py-3 px-7 justify-center items-center w-fit hover:bg-purple-600 gap-2 border-2 border-purple-600"
          >
            <lord-icon
              src="https://cdn.lordicon.com/jgnvfzqg.json"
              trigger="hover"
            ></lord-icon>
            Save Password
          </button>
        </div>
        <div className="passwordsTable">
          <h2 className="font-bold text-2xl py-4">Your Passwords</h2>
          {passwordArray.length === 0 && <div>Passwords list is empty</div>}
          {passwordArray.length != 0 && (
            <table className="table-auto w-full overflow-hidden rounded-md mb-10">
              <thead className="bg-purple-400">
                <tr>
                  <th className="py-2">Website</th>
                  <th className="py-2">Username</th>
                  <th className="py-2">Password</th>
                  <th className="py-2">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-purple-100">
                {passwordArray.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td className="py-2 border border-white">
                        <div className="flex px-10 justify-center gap-4 cursor-default ">
                          <a href={item.site} target="_blank">
                            {item.site}
                          </a>
                          <img
                            className="iconCopy w-5 h-5 cursor-pointer"
                            onClick={() => {
                              copyText(item.site);
                            }}
                            src="/icons/copy1.png"
                            alt="copy"
                          />
                        </div>
                      </td>
                      <td className="py-2 border border-white">
                        <div className="flex justify-center gap-4 cursor-default ">
                          {item.username}
                          <img
                            className="iconCopy w-5 h-5 cursor-pointer"
                            onClick={() => {
                              copyText(item.username);
                            }}
                            src="/icons/copy1.png"
                            alt="copy"
                          />
                        </div>
                      </td>
                      <td className="py-2 border border-white">
                        <div className="flex justify-center gap-4 cursor-default ">
                          {"●".repeat(item.password.length)}
                          <img
                            className="iconCopy w-5 h-5 cursor-pointer"
                            onClick={() => {
                              copyText(item.password);
                            }}
                            src="/icons/copy1.png"
                            alt="copy"
                          />
                        </div>
                      </td>
                      <td className="justify-center py-2 border border-white">
                        <div className="flex justify-center gap-3 cursor-default">
                          <span
                            className="cursor-pointer"
                            onClick={() => editPassword(item.id)}
                          >
                            <lord-icon
                              src="https://cdn.lordicon.com/zfzufhzk.json"
                              trigger="hover"
                              colors="primary:#121131,secondary:#000000,tertiary:#ffffff,quaternary:#ffffff,quinary:#000000"
                              style={{ width: "25px", height: "25px" }}
                            ></lord-icon>
                          </span>
                          <span
                            className="cursor-pointer"
                            onClick={() => deletePassword(item.id)}
                          >
                            <lord-icon
                              src="https://cdn.lordicon.com/skkahier.json"
                              trigger="hover"
                              style={{ width: "25px", height: "25px" }}
                            ></lord-icon>
                          </span>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
};

export default Manager;
