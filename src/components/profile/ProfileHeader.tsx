import { useContext, useEffect, useState } from "react";
import { BsArrowLeftShort } from "react-icons/bs";
import { useRouter } from "next/navigation";
import { customStyles } from "../../../lib/constants";
import { TwitterContextTypes } from "@/app/page";
import { Tweets } from "@/sanity/sanity.types";
import { TwitterContext } from "../../../context/TwitterContext";

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
  tweets?: Array<any>;
  isProfileImageNft?: Boolean | undefined;
}
const img =
  "https://imgs.search.brave.com/HLtCepN8a9oojaj9ztEUClYxc1fZPFsFCyQtpz9TygE/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jbGVh/bi5lbWFpbC91c2Vy/L3BhZ2VzL3BhcnRz/L3RhYmxlLW9mLWNv/bnRlbnRzL2ltYWdl/cy90dy5zdmc";
const profileImg =
  "https://images.pexels.com/photos/678783/pexels-photo-678783.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1";
const ProfileHeader = () => {
  const { currentAccount, currentUser } =
    useContext<TwitterContextTypes>(TwitterContext);
  const router = useRouter();
  const [userData, setUserData] = useState<UserData>({
    name: "",
    profileImage: "",
    coverImage: "",
    walletAddress: "",
    tweets: [],
    isProfileImageNft: undefined,
  });

  useEffect(() => {
    if (!currentUser) {
      console.log("no use rfound ");
      return;
    }
    console.log(currentUser);
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
          <img
            src={userData.coverImage}
            alt="cover"
            className={style.coverPhoto}
          />
        ) : (
          "cover img"
        )}
      </div>
      <div className={style.profileImageContainer}>
        <div
          className={
            currentUser.isProfileImageNft ? "hex" : style.profileImageContainer
          }
        >
          <img
            src={userData.profileImage ? userData.profileImage : undefined}
            alt={userData.walletAddress}
            className={
              currentUser.isProfileImageNft
                ? style.profileImageNft
                : style.profileImage
            }
          />
        </div>
      </div>
      <div className={style.details}>
        <div>
          <div className={style.primary}>{currentUser.name}</div>
        </div>
        <div className={style.secondary}>
          {currentAccount && (
            <>
              @{currentAccount.slice(0, 8)}...{currentAccount.slice(37)}
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
