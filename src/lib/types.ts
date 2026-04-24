import type { Timestamp } from "firebase/firestore";

export interface Product {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  paypalPriceUsd?: number | null;
  robuxPrice?: number | null;
  gamepassUrl?: string | null;
  createdAt?: Timestamp;
}

export interface StoreSettings {
  paypalEmail?: string;
}

export interface Order {
  id: string;
  productId: string;
  productName: string;
  productImage?: string;
  buyerUid: string;
  buyerName: string;
  method: "paypal" | "robux";
  amount: number;
  currency: "USD" | "ROBUX";
  paymentLink?: string;
  status: "awaiting_payment" | "paid" | "cancelled";
  createdAt?: Timestamp;
}

export interface ChatMessage {
  id: string;
  text: string;
  fromUid: string;
  fromName: string;
  fromAdmin: boolean;
  createdAt?: Timestamp;
}
