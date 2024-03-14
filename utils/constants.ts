export const BASE_API_URL =
  process.env.NEXT_PUBLIC_URL_ENV === "development"
    ? "http://localhost:3000/api"
    : "https://moneyflo-dev.vercel.app/api";
