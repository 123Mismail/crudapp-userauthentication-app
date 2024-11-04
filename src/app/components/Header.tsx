"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Cookies from "js-cookie";

const Header = () => {
  // State to store the token
  const [token, setToken] = useState("");

  useEffect(() => {
    // Retrieve token from cookies
    const tokenFromCookie = Cookies.get("token") || "";
    setToken(tokenFromCookie);
    console.log(tokenFromCookie, "value of request at header");
  }, []);
console.log(Cookies.get("token") ,"token value at headers")
  return (
    <div className="p-2">
      <div className="flex justify-between py-3 px-4 bg-gray-800">
        <Link href="/">
          <h2 className="text-2xl font-bold text-white">CRUD OPERATIONS</h2>
        </Link>
        <div>
          <Link href="/signin">
            <button className="bg-white px-4 py-2 text-xl font-semibold">
              Sign In
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
