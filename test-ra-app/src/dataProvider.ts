import { DataProvider, fetchUtils } from "react-admin";
import springDataProvider from "./springDataProvider";

const dataProviderUrl =
  process.env.MOCK_DATA === "true"
    ? import.meta.env.VITE_SIMPLE_MOCK_URL
    : import.meta.env.VITE_SIMPLE_REST_URL;

const httpClientWithMock = (
  url: string,
  options?: fetchUtils.Options | undefined
) => {
  let newUrl = url;

  if (process.env.MOCK_DATA === "true") {
    const method = options?.method ? options.method.toLocaleLowerCase() : "get";
    const urlObj = new URL(`http://localhost:3000${url}`);
    const pathname = urlObj.pathname.match(/\d$/) ? urlObj.pathname.replace(/\d+$/, 'id') : urlObj.pathname;

    newUrl = `${pathname}/${method}/index.json${urlObj.search}`;
  }

  return fetchUtils.fetchJson(newUrl, options);
};

const baseDataProvider = springDataProvider(dataProviderUrl, httpClientWithMock);

export interface CustomDataProvider extends DataProvider {}

export const dataProvider: CustomDataProvider = {
  ...baseDataProvider,
};
