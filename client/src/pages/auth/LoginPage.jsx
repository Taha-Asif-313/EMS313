import React, { useState } from "react";
import { FaUser } from "react-icons/fa";
import { RiAdminFill } from "react-icons/ri";
import { IoMdMail } from "react-icons/io";
import { Link } from "react-router-dom";
import { Button, Flexbox, Image, Input, Tabs, Text, Toggle } from "shadlc";

const LoginPage = () => {
  const [role, setrole] = useState("Admin");
  return (
    <Flexbox
      direction={{ sm: "column", md: "column", lg: "column" }}
      align={{ sm: "center", md: "center", lg: "center" }}
      justify={{ sm: "center", md: "center", lg: "center" }}
      gap={{ sm: "40px", md: "20px", lg: "30px" }}
      padding={{ sm: "20px", md: "20px", lg: "0px 80px" }}
      backgroundColor="#fff"
      width={{ sm: "100%", md: "100%", lg: "100%" }}
      height={{ sm: "auto", md: "auto", lg: "auto" }}
      className="p-4 min-h-screen"
    >
      <Link to={"/"} className="flex items-center gap-3">
        <Image alt="logo" height="30px" width="30px" src="/logo.svg" />
        <Text as="span" color="text-white" fontSize="18px" fontWeight={800}>
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

      <form>
        <Flexbox
          className="mb-2 rounded-md"
          direction={{ sm: "row" }}
          padding={"10px"}
          gap={"0px"}
        >
          <Button
            onClick={() => setrole("Admin")}
            className="flex-1"
            fullWidth
            textColor={role == "Admin" && "#fff"}
            fontSize="12px"
            fontWeight={400}
            backgroundColor={role == "Admin" && "var(--primary)"}
            iconBefore={<RiAdminFill />}
          >
            Admin
          </Button>
          <Button
            onClick={() => setrole("Employee")}
            className="flex-1"
            fullWidth
            textColor={role == "Employee" && "#fff"}
            fontSize="12px"
            fontWeight={400}
            backgroundColor={role == "Employee" && "var(--primary)"}
            iconBefore={<FaUser />}
          >
            Employee
          </Button>
        </Flexbox>
        <div className="flex text-black flex-col">
          <Input
            className="text-sm mb-3"
            placeholder="Enter Email"
            borderColor="#000"
            iconRight={<IoMdMail className="text-lg" />}
            focusBorderColor="var(--primary)"
          />
          <Input
            className="text-sm mb-3"
            placeholder="Enter Password"
            borderColor="#000"
            type="password"
            focusBorderColor="var(--primary)"
          />
          <Text margin="0 0 10px 0" fontSize="12px" textAlign="left">
            Already have account?{" "}
            <Link to={"/signup"} className="text-primary">
              Go to signup
            </Link>{" "}
          </Text>

          <Button
            fullWidth
            backgroundColor="var(--primary)"
            fontSize="14px"
            textColor="#fff"
            fontWeight={400}
          >
            Login
          </Button>
        </div>
      </form>
    </Flexbox>
  );
};

export default LoginPage;
