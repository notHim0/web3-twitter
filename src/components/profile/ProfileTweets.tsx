import { useContext, useState } from "react";
import Post from "../Post";
import { TwitterContext } from "../../../context/TwitterContext";

const style = {
  wrapper: `no-scrollbar`,
  header: `sticky top-0 bg-[#15202b] z-10 p-4 flex justify-between items-center`,
  headerTitle: `text-xl font-bold`,
};

interface Tweet {
  timestamp: string;
  tweet: string;
}
interface Tweets extends Array<Tweet> {}
export default function ProfileTweets() {
  const { currentUser, currentAccount, tweets } = useContext(TwitterContext);
  const newTweets: Tweets = [...tweets];
  return (
    <div className={style.wrapper}>
      {newTweets?.map((tweet: Tweet, index: number) => (
        <Post
          key={index}
          displayName={
            currentUser.name === "Unnamed"
              ? `${currentUser.walletAddress.slice(
                  0,
                  4
                )}...${currentUser.walletAddress.slice(41)}`
              : currentUser.name
          }
          userName={`${currentUser.walletAddress.slice(
            0,
            4
          )}...${currentUser.walletAddress.slice(41)}`}
          text={tweet.tweet}
          avatar={currentUser.profileImage}
          timestamp={tweet.timestamp}
          isProfileImageNft={currentUser.isProfileImageNft}
        />
      ))}
    </div>
  );
}
