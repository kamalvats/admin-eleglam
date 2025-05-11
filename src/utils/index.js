import { getAPIHandler } from "src/ApiConfig/service";
import { Contract } from "@ethersproject/contracts";
import * as XLSX from "xlsx";

export function sortAddress(add) {
  const sortAdd = `${add?.slice(0, 6)}...${add?.slice(add?.length - 4)}`;
  return sortAdd;
}

export function getSigner(library, account) {
  return library.getSigner(account).connectUnchecked();
}

export function getProviderOrSigner(library, account) {
  return account ? getSigner(library, account) : library;
}

export function getContract(address, ABI, library, account) {
  return new Contract(address, ABI, getProviderOrSigner(library, account));
}

export const calculateTimeLeft = (endDate) => {
  if (endDate) {
    let difference = endDate * 1000 - +new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }
    return timeLeft;
  } else {
    return false;
  }
};

export const downloadExcel = (dataToPrint, sheetName) => {
  const workSheet = XLSX.utils.json_to_sheet(dataToPrint);
  const workBook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workBook, workSheet, sheetName);
  let buf = XLSX.write(workBook, { bookType: "xlsx", type: "buffer" });
  XLSX.write(workBook, { bookType: "xlsx", type: "binary" });
  XLSX.writeFile(workBook, `${sheetName + new Date().toISOString()}.xlsx`);
};

export const listUserHandlerExcel = async ({ paramsData, endPoint }) => {
  try {
    const res = await getAPIHandler({
      endPoint: endPoint,
      paramsData: {
        page: 1,
        ...paramsData,
      },
    });
    if (res.data.responseCode === 200) {
      return res.data.result.docs;
    } else {
      return false;
    }
  } catch (error) {
    console.log(error);
  }
};

export function sortLinks(add) {
  if (add) {
    const sortAdd = add;
    // const sortAdd = `...${add.slice(add.length - 8)}`; // https://www.instagram.com/
    return sortAdd;
  } else return add;
}
