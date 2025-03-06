import React from "react";
import { Button, Flexbox, Image, Text } from "shadlc";
import { FaExternalLinkAlt } from "react-icons/fa";
import Navbar from "../../components/Navbar";
const HomePage = () => {
  return (
    <>
      <Flexbox
        direction={{ sm: "column-reverse", md: "column", lg: "row" }}
        align={{ sm: "center", md: "center", lg: "center" }}
        justify={{ sm: "center", md: "center", lg: "space-between" }}
        gap={{ sm: "40px", md: "20px", lg: "30px" }}
        padding={{ sm: "20px", md: "20px", lg: "0px 80px" }}
        backgroundColor="#fff"
        width={{ sm: "100%", md: "100%", lg: "100%" }}
        height={{ sm: "auto", md: "auto", lg: "auto" }}
        className="p-4 min-h-screen"
      >
        <Flexbox
          width={{ sm: "100%", md: "90%", lg: "50%" }}
          height={{ sm: "auto", md: "auto", lg: "auto" }}
          padding={{ sm: "0", md: "0", lg: "0" }}
          direction={{ sm: "column", md: "column", lg: "column" }}
          align={{ sm: "center", md: "center", lg: "flex-start" }}
          justify={{ sm: "center", md: "center", lg: "space-between" }}
          gap={{ sm: "10px", md: "20px", lg: "5px" }}
          backgroundColor="#fff"
          className="rounded-lg text-black"
        >
          <Text
            as="h1"
            fontWeight={600}
            color="#000"
            fontSize="50px"
            lineHeight="50px"
            margin="0 0 10px 0"
            className="max-md:!text-3xl"
          >
            Welcome to <span className="text-primary font-bold">EMS</span> 313!
          </Text>
          <Text
            fontSize="17px"
            lineHeight="24px"
            margin="0 0 10px 0"
            className="max-md:!text-center max-md:!text-sm"
          >
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Mollitia
            ipsam illo reprehenderit dolore quod, labore a deleniti fugit quos
            repudiandae temporibus, laudantium dolor id quam laboriosam
            deserunt, maxime in quia.
          </Text>
          <Button
            backgroundColor="var(--primary)"
            borderRadius="50px"
            textColor="#fff"
            padding="6px 60px"
            fontSize="14px"
            iconAfter={<FaExternalLinkAlt />}
            fontWeight={500}
          >
            Get Started
          </Button>
        </Flexbox>
        <Flexbox
          width={{ sm: "100%", md: "100%", lg: "50%" }}
          align={{ sm: "center", md: "center", lg: "center" }}
          justify={{ sm: "center", md: "center", lg: "center" }}
          backgroundColor="transparent"
        >
          <Image
            src="/hero.png"
            alt="Placeholder"
            lazyLoad
            objectFit="contain"
            boxShadow="0px 0px 10px white"
            width="100%"
            height="auto"
          />
        </Flexbox>
      </Flexbox>
    </>
  );
};

export default HomePage;
