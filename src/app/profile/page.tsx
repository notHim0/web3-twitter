"use client";
import { Suspense } from "react";
import ProfileHeader from "@/components/profile/ProfileHeader";
import ProfileTweets from "@/components/profile/ProfileTweets";
import Sidebar from "@/components/Sidebar";
import Widgets from "@/components/Widgets";

const style = {
  wrapper: `flex justify-center h-screen w-screen select-none bg-[#15202b] text-white`,
  content: `max-w-[1400px] w-2/3 flex justify-between`,
  mainContent: `flex-[2] border-r border-l border-[#38444d] overflow-y-scroll`,
};

export default function Profile() {
  return (
    <div className={style.wrapper}>
      <div className={style.content}>
        <Suspense fallback={<div>Loading...</div>}>
          <Sidebar initialSelectedIcon={"Profile"} />
        </Suspense>
        <div className={style.mainContent}>
          <ProfileHeader />
          <ProfileTweets />
        </div>
        <Widgets />
      </div>
    </div>
  );
}
