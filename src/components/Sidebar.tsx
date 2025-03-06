"use client";
import { FiBell, FiMoreHorizontal } from "react-icons/fi";
import { VscTwitter } from "react-icons/vsc";
import SidebarOption from "./SidebarOption";
import { useContext, useState } from "react";
import { RiFileList2Fill, RiHome7Fill, RiHome7Line } from "react-icons/ri";
import { BiHash } from "react-icons/bi";
import { FaBell, FaHashtag, FaRegListAlt } from "react-icons/fa";
import { HiMail, HiOutlineMail } from "react-icons/hi";
import {
  BsBookmark,
  BsBookmarkFill,
  BsPerson,
  BsPersonFill,
} from "react-icons/bs";
import { CgMoreO } from "react-icons/cg";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { TwitterContext } from "../../context/TwitterContext";
import Modal from "react-modal";
import ProfileImageMinter from "./mintingModal/ProfileImageMinter";
import { customStyles } from "../../lib/constants";
import Image from "next/image";

interface SidebarProps {
  initialSelectedIcon: string;
}

const style = {
  wrapper: `flex-[0.7] px-8 flex flex-col`,
  twitterIconContainer: `text-3xl m-4`,
  tweetButton: `bg-[#1d9bf0] hover:bg-[#1b8cd8] flex items-center justify-center font-bold rounded-3xl h-[50px] mt-[20px] cursor-pointer`,
  navContainer: `flex-1`,
  profileButton: `flex items-center mb-6 cursor-pointer hover:bg-[#333c45] rounded-[100px] p-2`,
  profileLeft: `flex item-center justify-center mr-4`,
  profileImage: `height-12 w-12 rounded-full`,
  profileRight: `flex-1 flex`,
  details: `flex-1`,
  name: `text-lg`,
  handle: `text-[#8899a6]`,
  moreContainer: `flex items-center mr-2`,
};

function Sidebar({ initialSelectedIcon }: SidebarProps) {
  const [selected, setSelected] = useState<string>(initialSelectedIcon);
  const { currentAccount, currentUser } = useContext(TwitterContext);

  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const mint = params.get("mint");

  return (
    <div className={style.wrapper}>
      <div className={style.twitterIconContainer}>
        <VscTwitter />
      </div>
      <div className={style.navContainer}>
        <SidebarOption
          Icon={selected === "Home" ? RiHome7Fill : RiHome7Line}
          text="Home"
          isActive={selected === "Home"}
          setSelected={setSelected}
          redirect={"/"}
        />
        <SidebarOption
          Icon={selected === "Explore" ? FaHashtag : BiHash}
          text="Explore"
          isActive={selected === "Explore"}
          setSelected={setSelected}
        />
        <SidebarOption
          Icon={selected === "Notifications" ? FaBell : FiBell}
          text="Notifications"
          isActive={selected === "Notifications"}
          setSelected={setSelected}
        />
        <SidebarOption
          Icon={selected === "Messages" ? HiMail : HiOutlineMail}
          text="Messages"
          isActive={selected === "Messages"}
          setSelected={setSelected}
        />
        <SidebarOption
          Icon={selected === "Bookmarks" ? BsBookmarkFill : BsBookmark}
          text="Bookmarks"
          isActive={selected === "Bookmarks"}
          setSelected={setSelected}
        />
        <SidebarOption
          Icon={selected === "Lists" ? RiFileList2Fill : FaRegListAlt}
          text="Lists"
          isActive={selected === "Lists"}
          setSelected={setSelected}
        />
        <SidebarOption
          Icon={selected === "Profile" ? BsPersonFill : BsPerson}
          text="Profile"
          isActive={selected === "Profile"}
          setSelected={setSelected}
          redirect={"/profile"}
        />
        <SidebarOption Icon={CgMoreO} text="More" />
        <div
          onClick={() => router.push(`${pathname}/?mint=${currentAccount}`)}
          className={style.tweetButton}
        >
          Mint
        </div>
      </div>
      <div className={style.profileButton}>
        <div className={style.profileLeft}>
          <Image
            src={currentUser.profileImage}
            alt="profile"
            className={
              currentUser.isProfileImageNft
                ? `${style.profileImage} smallHex`
                : style.profileImage
            }
          />
        </div>
        <div className={style.profileRight}>
          <div className={style.details}>
            <div className={style.name}>{currentUser.name}</div>
            <div className={style.handle}>
              @{currentAccount.slice(0, 6)}...{currentAccount.slice(39)}
            </div>
          </div>
          <div className={style.moreContainer}>
            <FiMoreHorizontal />
          </div>
        </div>
      </div>
      <Modal
        isOpen={Boolean(mint)}
        ariaHideApp={false}
        onRequestClose={() => router.back()}
        style={customStyles}
      >
        <ProfileImageMinter />
      </Modal>
    </div>
  );
}

export default Sidebar;
