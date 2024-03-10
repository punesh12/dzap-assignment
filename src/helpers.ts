import { ethers } from "ethers";

export const formatAddress = (address: any) => {
  if (address) {
    const add1 = address.substring(0, 4);
    const add2 = address.substring(address.length - 4);
    const finalAddress = `${add1}...${add2}`;
    return finalAddress;
  }
};

export const formatEther = (amount) => {
  if (!amount) return ""
  return parseFloat(ethers.utils.formatEther(amount)).toFixed(5);
};