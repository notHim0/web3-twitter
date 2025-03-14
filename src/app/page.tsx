"use client";
import { TwitterContext } from "../../context/TwitterContext";
import Sidebar from "@/components/Sidebar";
import Widgets from "@/components/Widgets";
import Feed from "@/components/home/Feed";
import { useContext } from "react";
import metamaskLogo from "../../assets/metamask.png";
import errorImg from "../../assets/error.png";
import Image from "next/image";
import { Tweets, Users } from "@/sanity/sanity.types";

const style = {
  wrapper: `flex justify-center h-screen w-screen select-none bg-[#15202b] text-white`,
  content: `max-w-[1400px] w-2/3 flex justify-between`,
  loginContainer: `w-full h-full flex flex-col justify-center items-center pb-48`,
  walletConnectButton: `text-2xl text-black bg-white font-bold mb-[-3rem] mt-[3rem] px-6 py-4 rounded-full cursor-pointer hover:bg-[#d7dbdc]`,
  loginContent: `text-3xl font-bold text-center mt-24`,
};
export interface TwitterContextTypes {
  appStatus?: string;
  connectWallet: () => Promise<void>;
  tweets: Tweets[];
  currentAccount: string;
  fetchTweets: () => Promise<void>;
  currentUser: Users;
  setAppStatus: (status: string) => void;
}

export default function Home() {
  const { appStatus, connectWallet } = useContext(
    TwitterContext
  ) as TwitterContextTypes;

  const app = (status = appStatus) => {
    switch (status) {
      case "connected":
        return userLoggedIn;

      case "notConnected":
        return noUserFound;

      case "noMetaMask":
        return noMetaMaskFound;

      case "error":
        return error;

      default:
        return loading;
    }
  };

  const userLoggedIn = (
    <div className={style.content}>
      <Sidebar initialSelectedIcon={"Home"} />
      <Feed />
      <Widgets />
    </div>
  );

  const noUserFound = (
    <div className={style.loginContainer}>
      <Image src={metamaskLogo} width={200} height={200} alt="Meta-Mask-Logo" />
      <div
        className={style.walletConnectButton}
        onClick={() => connectWallet()}
      >
        Connect Wallet
      </div>
      <div className={style.loginContent}>Connect to Metamask.</div>
    </div>
  );

  const noMetaMaskFound = (
    <div className={style.loginContainer}>
      <Image src={metamaskLogo} width={200} height={200} alt="Meta-Mask-Logo" />
      <div className={style.loginContent}>
        <a
          target="_blank"
          rel="noreferrer"
          href={`https://metamask.io/download.html`}
        >
          You must install Metamask, a <br /> virtual Ethereum wallet, in your
          browser.
        </a>
      </div>
    </div>
  );

  const error = (
    <div className={style.loginContainer}>
      <Image src={errorImg} width={250} height={200} alt="Error!" />
      <div className={style.loginContent}>
        An error occurred. Please try again later or from another browser.
      </div>
    </div>
  );

  const loading = (
    <div className={style.loginContainer}>
      <div className={style.loginContent}>Loading...</div>
    </div>
  );

  return <div className={style.wrapper}>{app(appStatus)}</div>;
}
