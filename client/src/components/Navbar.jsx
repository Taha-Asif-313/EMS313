"use client";
import React, { useEffect, useState } from "react";
import { FaExternalLinkAlt } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { RiMenu4Line } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import { Button, Flexbox, Image, Text } from "shadlc";

const Navbar = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setisMenuOpen] = useState(false);

  useEffect(() => {
    if (window.innerWidth > 1024) {
      setisMenuOpen(true);
    }
  }, []);

  return (
    <Flexbox
      direction={{ sm: "column", md: "row", lg: "row" }}
      padding={{ sm: "20px 20px", md: "20px", lg: "20px 80px" }}
      align={{ sm: "flex-start", md: "center", lg: "center" }}
      gap={{ lg: "20px", md: "10px", sm: "18px" }}
      justify={{ lg: "flex-end", md: "center", sm: "flex-start" }}
      backgroundColor="transparent"
      className="absolute z-20 max-lg:h-screen"
    >
      {isMenuOpen ? (
        <IoClose
          onClick={() => setisMenuOpen(false)}
          className="absolute top-0 right-0 text-2xl m-5 md:hidden"
        />
      ) : (
        <RiMenu4Line
          onClick={() => setisMenuOpen(true)}
          className="absolute top-0 right-0 text-2xl m-5 md:hidden"
        />
      )}

      {/* Logo icon  */}
      <Link to={"/"} className="flex items-center gap-3">
        <Image alt="logo" height="30px" width="30px" src="/logo.svg" />
        <Text
          as="span"
          color="text-white"
          fontSize="18px"
          fontWeight={800}
        >
          EMS
          <Text
            as="span"
            color="var(--primary)"
            fontSize="18px"
            fontWeight={800}
          >
            313
          </Text>
        </Text>
      </Link>

      {/*Navlist Items  */}

      {isMenuOpen && (
        <Flexbox
          backgroundColor="#fff"
          padding={{ sm: "0px 10px", md: "0px", lg: "0px" }}
          direction={{ sm: "column", md: "row", lg: "row" }}
          align={{ sm: "flex-start", md: "center", lg: "center" }}
          gap={{ lg: "20px", md: "10px", sm: "18px" }}
          justify={{ lg: "flex-end", md: "center", sm: "center" }}
          className={`z-20 max-lg:!${!isMenuOpen ? "hidden" : ""}`}
        >
          <Link to={"/"} className="text-sm ">
            Home
          </Link>
          <Link to={"/docs"} className="text-sm ">
            Docs
          </Link>
          <Link to={"/about"} className="text-sm ">
            About
          </Link>
          <Link to={"/templates"} className="text-sm ">
            Templates
          </Link>
          <Button
            className="z-20 text-white hover:!bg-black"
            borderColor="white"
            backgroundColor="var(--primary)"
            size="sm"
            iconAfter={<FaExternalLinkAlt />}
            onClick={() => navigate("/signup")}
          >
            Get started
          </Button>
        </Flexbox>
      )}
    </Flexbox>
  );
};

export default Navbar;
