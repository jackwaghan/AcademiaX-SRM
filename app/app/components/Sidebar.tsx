"use client";
import React from "react";
import {
  GraduationCap,
  X,
  CalendarClock,
  AlarmClock,
  BookOpen,
  CircleHelp,
} from "lucide-react";
import { useSidebar, useUser } from "@/lib/zustand";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useWindow } from "@/lib/hook";

const SidebarMenu = [
  {
    title: "Time Table",
    icon: <AlarmClock className="stroke-blue-500" />,
    link: "/app/timetable",
  },
  {
    title: "Attendance",
    icon: <CalendarClock className="stroke-blue-500" />,
    link: "/app/attendance",
  },
  {
    title: "Marks",
    icon: <BookOpen className="stroke-blue-500" />,
    link: "/app/marks",
  },
];

const Sidebar = () => {
  const isMobile = useWindow();
  const path = usePathname();
  const { user, dayorder } = useUser();
  const { toggle, isOpen } = useSidebar();
  const ref = React.useRef<HTMLDivElement>(null);
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        ref.current &&
        !ref.current.contains(event.target as Node) &&
        isMobile &&
        isOpen
      ) {
        toggle();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [toggle, isMobile, isOpen]);
  if (isMobile === undefined) return null;
  return (
    <div
      ref={ref}
      className={`z-50 fixed w-[250px] h-full flex flex-col bg-sidebar-foreground/5 backdrop-blur-3xl border-r border-sidebar-foreground/15 ${isOpen ? "translate-x-0" : "-translate-x-full"} transition-transform duration-300`}
    >
      <div className="min-h-[50px] flex gap-2 items-center justify-between border-b border-sidebar-foreground/15 px-4">
        <div className="flex gap-2 items-center p-1">
          <GraduationCap className="stroke-orange-500" size={25} />
          AcademiaX SRM
        </div>
        <X
          className="border border-sidebar-foreground/10 p-1 bg-sidebar-foreground/10 rounded cursor-pointer"
          size={25}
          onClick={() => toggle()}
        />
      </div>
      <div className="px-4 pt-5 text-sm ">
        <div
          className={`flex flex-col gap-2  border border-foreground/15 rounded-lg bg-foreground/10 px-5 py-3 duration-300 `}
        >
          <p className="text-blue-500  text-md ">Welcome Back 👋 </p>
          <p className="pt-2">{user?.name}</p>
          <p className="text-foreground/60">{user?.department}</p>
          <p className="flex items-center gap-2 text-green-500">
            <p className="flex items-center gap-2 text-green-500">
              <p>Day Order</p>
              <span>-</span>
              <p>{dayorder?.do === "N" ? "Holiday" : dayorder?.do}</p>
            </p>
          </p>
        </div>
      </div>
      <div className="flex-1  gap-3 py-5  flex flex-col justify-between">
        <div className="flex flex-col gap-2">
          {SidebarMenu.map((menu, i) => {
            return (
              <Link
                key={i}
                href={menu.link}
                className={`mx-4 py-1.5 px-4 flex items-center gap-4  rounded hover:bg-sidebar-foreground/10 cursor-pointer  hover:scale-95 hover:shadow-2xl duration-300 transition-transform ${path === menu.link ? "bg-orange-500 text-black  stroke-white" : ""}`}
                onClick={() => isMobile && toggle()}
              >
                {menu.icon}
                {menu.title}
              </Link>
            );
          })}
        </div>
        <a
          href="https://jackwaghan.com"
          className="px-4 text-sm hover:scale-95 hover:shadow-2xl duration-300 transition-all"
          target="_blank"
        >
          <div
            className={`flex flex-col gap-2  border-2 border-dotted border-orange-300/60 rounded-lg bg-foreground/10 px-5 py-3 duration-300 `}
          >
            <p className="">🛠️ Designed & Built by </p>
            <p className="text-orange-300 pl-5 font-semibold">JACK WAGHAN</p>
          </div>
        </a>
      </div>
      <div className="pt-5  border-t border-sidebar-foreground/20 px-4 gap-4 flex flex-col">
        <div className="flex gap-3 items-center  px-4 py-1.5 rounded-lg hover:bg-sidebar-foreground/10 cursor-pointer hover:scale-95 hover:shadow-2xl duration-300 transition-transform">
          <CircleHelp size={20} className="stroke-orange-500" /> Need Help?
        </div>
        <div className="mb-3 px-4 py-1 flex justify-between items-center bg-sidebar-foreground/10 rounded-lg border border-sidebar-foreground/5 text-sm  ">
          <p>v1.0.0</p>
          <p>@2025</p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
