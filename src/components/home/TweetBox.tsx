"use client";
import { BsCardImage, BsEmojiSmile } from "react-icons/bs";
import { RiFileGifLine, RiBarChartHorizontalFill } from "react-icons/ri";
import { IoMdCalendar } from "react-icons/io";
import { MdOutlineLocationOn } from "react-icons/md";
import { useContext, useState } from "react";
import { TwitterContext } from "../../../context/TwitterContext";
import { client } from "@/sanity/lib/client";
import dynamic from "next/dynamic";
import Image from "next/image";
import { TwitterContextTypes } from "@/app/page";

const style = {
  wrapper: `px-4 flex flex-row border-b border-[#38444d] pb-4`,
  tweetBoxLeft: `mr-4`,
  tweetBoxRight: `flex-1`,
  profileImage: `height-12 w-12 rounded-full`,
  inputField: `w-full h-full outline-none bg-transparent text-lg`,
  formLowerContainer: `flex`,
  iconsContainer: `text-[#1d9bf0] flex flex-1 items-center`,
  icon: `mr-2`,
  submitGeneral: `px-6 py-2 rounded-3xl font-bold`,
  inactiveSubmit: `bg-[#196195] text-[#95999e]`,
  activeSubmit: `bg-[#1d9bf0] text-white`,
};

function TweetBox() {
  const [tweetMessage, setTweetMessage] = useState("");
  const { currentAccount, currentUser, fetchTweets } = useContext(
    TwitterContext
  ) as TwitterContextTypes;

  const submitTweet = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    if (!tweetMessage) return;

    const tweetId = `${currentAccount}_${Date.now()}`;

    const tweetDoc = {
      _type: "tweets",
      _id: tweetId,
      tweet: tweetMessage,
      timestamp: new Date(Date.now()).toISOString(),
      author: {
        _key: tweetId,
        _type: "reference",
        _ref: currentAccount,
      },
    };

    await client.createIfNotExists(tweetDoc);

    await client
      .patch(currentAccount)
      .setIfMissing({ tweets: [] })
      .insert("after", "tweets[-1]", [
        {
          _key: tweetId,
          _ref: currentAccount,
          _type: "reference",
        },
      ])
      .commit();
    await fetchTweets();
    setTweetMessage("");
  };

  return (
    <div className={style.wrapper}>
      <div className={style.tweetBoxLeft}>
        <Image
          src={currentUser.profileImage || "/assets/check.png"}
          alt="beautiful-women"
          width={48}
          height={48}
          className={
            currentUser.isProfileImageNft
              ? `${style.profileImage} smallHex`
              : style.profileImage
          }
        />
      </div>
      <div className={style.tweetBoxRight}>
        <form onSubmit={(e) => e.preventDefault()}>
          <textarea
            onChange={(e) => setTweetMessage(e.target.value)}
            value={tweetMessage}
            placeholder="What's happening?"
            className={style.inputField}
          />
        </form>
        <div className={style.formLowerContainer}>
          <div className={style.iconsContainer}>
            <BsCardImage className={style.icon} />
            <RiFileGifLine className={style.icon} />
            <RiBarChartHorizontalFill className={style.icon} />
            <BsEmojiSmile className={style.icon} />
            <IoMdCalendar className={style.icon} />
            <MdOutlineLocationOn className={style.icon} />
          </div>
          <button
            type="submit"
            onClick={submitTweet}
            disabled={!tweetMessage}
            className={`${style.submitGeneral} ${
              tweetMessage ? style.activeSubmit : style.inactiveSubmit
            }`}
          >
            Tweet
          </button>
        </div>
      </div>
    </div>
  );
}

export default dynamic(() => Promise.resolve(TweetBox), {
  ssr: false,
});
