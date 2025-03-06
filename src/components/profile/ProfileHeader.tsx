import { useContext, useEffect, useState } from "react";
import { BsArrowLeftShort } from "react-icons/bs";
import { useRouter } from "next/navigation";
import { TwitterContextTypes } from "@/app/page";
import { TwitterContext } from "../../../context/TwitterContext";
import Image from "next/image";
import { Reference } from "sanity";

const style = {
  wrapper: `border-[#38444d] border-b`,
  header: `py-1 px-3 mt-2 flex items-center`,
  primary: `bg-transparent outline-none font-bold`,
  secondary: `text-[#8899a6] text-xs`,
  backButton: `text-3xl cursor-pointer mr-2 rounded-full hover:bg-[#313b44] p-1`,
  coverPhotoContainer: `flex items-center justify-center h-[15vh] overflow-hidden`,
  coverPhoto: `object-fill h-full w-full`,
  profileImageContainer: `w-full h-[6rem] rounded-full mt-[-3rem] mb-2 flex justify-start items-center px-3 flex justify-between`,
  profileImage: `object-cover rounded-full h-full`,
  profileImageNft: `object-cover h-full`,
  profileImageMint: `bg-white text-black px-3 py-1 rounded-full hover:bg-[#8899a6] cursor-pointer`,
  details: `px-3`,
  nav: `flex justify-around mt-4 mb-2 text-xs font-semibold text-[#8899a6]`,
  activeNav: `text-white`,
};

interface UserData {
  name?: string;
  profileImage?: string;
  coverImage?: string;
  walletAddress?: string;
  tweets?: Reference[];
  isProfileImageNft?: boolean;
}

const ProfileHeader = () => {
  const { currentAccount, currentUser } =
    useContext<TwitterContextTypes>(TwitterContext);
  const router = useRouter();
  const [userData, setUserData] = useState<UserData>({
    name: "",
    profileImage: "",
    coverImage: "",
    walletAddress: "",
    isProfileImageNft: false,
  });

  useEffect(() => {
    if (!currentUser) {
      console.log("No user found");
      return;
    }
    setUserData({
      name: currentUser.name,
      profileImage: currentUser.profileImage,
      walletAddress: currentUser.walletAddress,
      coverImage: currentUser.coverImage,
      tweets: currentUser.tweets,
      isProfileImageNft: currentUser.isProfileImageNft,
    });
  }, [currentUser]);

  return (
    <div className={style.wrapper}>
      <div className={style.header}>
        <div onClick={() => router.push("/")} className={style.backButton}>
          <BsArrowLeftShort />
        </div>
        <div className={style.details}>
          <div className={style.primary}>{userData.name}</div>
          <div className={style.secondary}>
            {userData.tweets?.length} Tweets
          </div>
        </div>
      </div>
      <div className={style.coverPhotoContainer}>
        {userData.coverImage ? (
          <Image
            src={userData.coverImage}
            alt="cover"
            width={860}
            height={200}
            className={style.coverPhoto}
          />
        ) : (
          "Cover Image"
        )}
      </div>
      <div className={style.profileImageContainer}>
        <div
          className={
            currentUser?.isProfileImageNft ? "hex" : style.profileImageContainer
          }
        >
          {userData.profileImage && (
            <Image
              src={userData.profileImage}
              alt={userData.walletAddress || "Profile Image"}
              width={100}
              height={100}
              className={
                currentUser?.isProfileImageNft
                  ? style.profileImageNft
                  : style.profileImage
              }
            />
          )}
        </div>
      </div>
      <div className={style.details}>
        <div>
          <div className={style.primary}>{currentUser?.name}</div>
        </div>
        <div className={style.secondary}>
          {currentAccount && (
            <>
              @{currentAccount.slice(0, 8)}...{currentAccount.slice(-4)}
            </>
          )}
        </div>
      </div>
      <div className={style.nav}>
        <div className={style.activeNav}>Tweets</div>
        <div>Tweets & Replies</div>
        <div>Media</div>
        <div>Likes</div>
      </div>
    </div>
  );
};

export default ProfileHeader;
