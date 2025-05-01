/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Lookup from "@/data/Lookup";
import { Button } from "../ui/button";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useContext } from "react";
import { UserDetailContext } from "@/context/UserDetailContext";

const SignInDialog = ({ openDialog, closeDialog }: any) => {
  const { userDetail, setUserDetail } = useContext(UserDetailContext);

  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      console.log(tokenResponse);
      const userInfo = await axios.get(
        "https://www.googleapis.com/oauth2/v3/userinfo",
        { headers: { Authorization: "Bearer " + tokenResponse.access_token } }
      );

      console.log(userInfo);
      setUserDetail(userInfo?.data);
      closeDialog(false);
    },
    onError: (errorResponse) => console.log(errorResponse),
  });

  const handleGoogleLogin = () => {
    googleLogin();
  };

  return (
    <Dialog open={openDialog} onOpenChange={closeDialog}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-center font-bold text-2xl text-white">
            {Lookup.SIGNIN_HEADING}
          </DialogTitle>
          <DialogDescription className="flex flex-col items-center justify-center mt-2 text-center">
            <span className="text-base">{Lookup.SIGNIN_SUBHEADING}</span>
            <Button
              onClick={handleGoogleLogin}
              className="bg-blue-600 text-white hover:bg-blue-400 mt-3 mb-3"
            >
              Sign In with Google
            </Button>
            {Lookup.SIGNIn_AGREEMENT_TEXT}
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default SignInDialog;
