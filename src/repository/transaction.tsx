import axios from "axios";

export type transaction = {
  amount: number;
  name: string;
  timestamp: string;
  type: string;
};

interface CustomError {
  response: {
    data: string;
    status: number;
  };
}

export async function getTransaction(param: string) {
  try {
    const response = await axios.get(
      `http://localhost:3001/transaction?${param}_sort=-timestamp`
    );
    return response.data;
  } catch (error) {
    if (error) {
      const errorObj = error as CustomError;
      throw new Error(errorObj.response.data);
    }
  }
}
