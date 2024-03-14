import { toast, useToast } from "@/components/ui/use-toast";
import { setUserId } from "@/lib/features/commonSlice";
import { User } from "@prisma/client";
import axios, { AxiosError } from "axios";
import { Session } from "next-auth";
import { BASE_API_URL } from "../constants";

export default async function userInitializeFromDb(
  session: Session,
  dispatch: any
) {
  const email = session.user?.email;
  const name = session.user?.name;
  try {
    const { data }: { data: User | null } = await axios(
      `${BASE_API_URL}/user?email=${email}`
    );
    if (data) {
      dispatch(setUserId(data.id));
    } else {
      const { data }: { data: User | null } = await axios(
        `${BASE_API_URL}/api/user`,
        {
          method: "POST",
          data: {
            name,
            email,
          },
        }
      );
      if (data) {
        dispatch(setUserId(data.id));
      }
    }
  } catch (err: unknown) {
    if (err instanceof AxiosError) {
      toast({ title: err.response?.data, variant: "destructive" });
    }
  }
}
