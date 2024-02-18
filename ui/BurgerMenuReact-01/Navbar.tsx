"use client";
import React, { useState } from "react";
import Link from "next/link";
import Hamburger from "./Hamburger";
import { ModeToggle } from "../ModeToggle";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const routes = [
  {
    key: "Home",
    route: "/",
  },
  {
    key: "Projects",
    route: "/projects",
  },
  {
    key: "Blog",
    route: "/blog",
  },
  {
    key: "About",
    route: "/about",
  },
  {
    key: "Resume",
    route: "/CV_website.pdf",
  },
  {
    key: "Contact",
    route: "/contact",
  },
];

const Header = (): JSX.Element => {
  const [navOpen, setNavOpen] = useState(false);

  function clickHamburger() {
    setNavOpen(!navOpen);
  }

  function closeMenu() {
    setNavOpen(false);
  }

  return (
    <>
      <header>
        <div className="container px-8 mx-auto justify-center items-center">
          <div
            id="header-container"
            className={`flex items-start justify-between py-6`}
          >
            <div className="flex flex-col flex-grow my-auto">
              <Hamburger navOpen={navOpen} clickHamburger={clickHamburger} />
              <nav
                id="navigation"
                className={`${
                  navOpen ? "flex flex-col pl-16 md:pl-3 text-center" : "hidden"
                } md:text-left md:block`}
              >
                {routes.map(({ key, route }) => (
                  <Link
                    href={route}
                    key={key}
                    target={key === "Resume" ? "_blank" : "_self"}
                  >
                    <Button variant="ghost" onClick={closeMenu}>
                      {key}
                    </Button>
                  </Link>
                ))}
              </nav>
            </div>
            <div className="justify-center items-center flex">
              <ModeToggle />
              <Link href="/">
                <h2
                  className={`${
                    navOpen ? "hidden" : "text-2xl font-bold pl-4"
                  }`}
                >
                  Marc Mansour
                </h2>
              </Link>
            </div>
          </div>
          <Separator />
        </div>
      </header>
    </>
  );
};

export default Header;
