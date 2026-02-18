import { Order } from "./types";

export type RootStackParamList = {
  OrderListScreen: undefined;
  CreateRequestScreen: undefined;
  OrderDetailsScreen: { order: Order };
  TrackingScreen: { order: Order };
};
