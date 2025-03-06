import { useState, useContext, useEffect } from "react";
import { TwitterContext } from "../../../context/TwitterContext";
import { useRouter } from "next/navigation";
import { client } from "@/sanity/lib/client";
import { contractABI, contractAddress } from "../../../lib/constants";
import { ethers, BrowserProvider } from "ethers";
import InitialState from "./InitialState";
import LoadingState from "./LoadingState";
import FinishedState from "./FinishedState";
import { pinJSONToIPFS, pinFileToIPFS } from "../../../lib/pinata";
import { MetaMaskInpageProvider } from "@metamask/providers";

declare let window: Window & { ethereum?: MetaMaskInpageProvider };

const metamask = typeof window !== "undefined" ? window.ethereum : undefined;

interface Metadata {
  name: string;
  description: string;
  image: string;
}

const getEthereumContract = async () => {
  if (!metamask) throw new Error("MetaMask not found");
  const provider = new BrowserProvider(metamask);
  const signer = await provider.getSigner();
  return new ethers.Contract(contractAddress, contractABI, signer);
};

const ProfileImageMinter = () => {
  const { currentAccount, setAppStatus } = useContext(TwitterContext);
  const router = useRouter();

  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [status, setStatus] = useState<"initial" | "loading" | "finished">(
    "initial"
  );
  const [profileImage, setProfileImage] = useState<File | null>(null);

  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on("disconnect", () => {
        setStatus("finished");
        setTimeout(() => {
          window.location.reload();
        }, 3000);
      });
    }
  }, []);

  const mint = async () => {
    if (!name || !description || !profileImage) return;
    setStatus("loading");

    try {
      if (!metamask) {
        return;
      }
      const pinataMetaData = { name: `${name} - ${description}` };
      const ipfsImageHash = await pinFileToIPFS(profileImage, pinataMetaData);

      await client
        .patch(currentAccount)
        .set({ profileImage: ipfsImageHash, isProfileImageNft: true })
        .commit();

      const imageMetaData: Metadata = {
        name,
        description,
        image: `ipfs://${ipfsImageHash}`,
      };

      const ipfsJsonHash = await pinJSONToIPFS(imageMetaData);
      const contract = await getEthereumContract();

      const transactionParameters = {
        to: contractAddress,
        from: currentAccount,
        data: await contract.mint(currentAccount, `ipfs://${ipfsJsonHash}`),
      };

      await metamask.request({
        method: "eth_sendTransaction",
        params: [transactionParameters],
      });

      setStatus("finished");
    } catch (error) {
      console.error(error);
      setStatus("finished");
    }
  };

  const renderLogic = () => {
    switch (status) {
      case "initial":
        return (
          <InitialState
            profileImage={profileImage}
            setProfileImage={setProfileImage}
            name={name}
            setName={setName}
            description={description}
            setDescription={setDescription}
            mint={mint}
          />
        );
      case "loading":
        return <LoadingState />;
      case "finished":
        return <FinishedState />;
      default:
        router.push("/");
        setAppStatus("error");
        return null;
    }
  };

  return <>{renderLogic()}</>;
};

export default ProfileImageMinter;
