import { Order } from "../types";

const now = new Date();

export const mockOrders: Order[] = [
  {
    id: "A10293",
    sender: "City Mart",
    recipient: "Riya Sharma",
    contact: "riya.sharma@email.com",
    address: "55 Lakeview Road, Kathmandu",
    status: "In Transit",
    isLocal: false,
    createdAt: new Date(now.getTime() - 1000 * 60 * 60 * 5).toISOString(),
    lastKnownLocation: { latitude: 27.7172, longitude: 85.324 },
  },
  {
    id: "A10294",
    sender: "Westside Warehouse",
    recipient: "Sameer Khatri",
    contact: "+9779800001122",
    address: "18 Durbar Marg, Kathmandu",
    status: "Delivered",
    isLocal: false,
    createdAt: new Date(now.getTime() - 1000 * 60 * 60 * 24).toISOString(),
  },
  {
    id: "A10295",
    sender: "Metro Supplies",
    recipient: "Anita Rai",
    contact: "+9779800003344",
    address: "12 Boudha Street, Kathmandu",
    status: "Pending",
    isLocal: false,
    createdAt: new Date(now.getTime() - 1000 * 60 * 60 * 12).toISOString(),
  },
  {
    id: "A10296",
    sender: "Prime Traders",
    recipient: "Rohit Lama",
    contact: "rohit.lama@email.com",
    address: "71 Lazimpat, Kathmandu",
    status: "In Transit",
    isLocal: false,
    createdAt: new Date(now.getTime() - 1000 * 60 * 60 * 2).toISOString(),
    lastKnownLocation: { latitude: 27.7218, longitude: 85.332 },
  },
];
