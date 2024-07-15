import { DataProvider } from "react-admin";
import springDataProvider from "./springDataProvider";

const baseDataProvider = springDataProvider(
  import.meta.env.VITE_SIMPLE_REST_URL
);

export interface CustomDataProvider extends DataProvider {

}

export const dataProvider: CustomDataProvider = {
  ...baseDataProvider,
};
