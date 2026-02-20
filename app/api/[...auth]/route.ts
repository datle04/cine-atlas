import { auth } from "@/lib/auth";
import { toNextJsHandler } from "better-auth/next-js";

// toNextJsHandler đã tự động destructure ra GET và POST functions chuẩn cho Next.js
export const { GET, POST } = toNextJsHandler(auth);