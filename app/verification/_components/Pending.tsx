import VerificationPendingBg from "@/public/images/verification-pending-bg.jpg";

import PendingSvg from "@/public/icon/pending.svg";

import Image from "next/image";
import Button from "@/components/common/Button";

export default function Pending() {
  return (
    <>
      <div className="verification__bg-img">
        <Image src={VerificationPendingBg} alt="verification_Background" />
      </div>

      <div className="pending_container">
        <div className="pending_header">
          <PendingSvg />

          <h4>Verification Pending</h4>

          <p>
            A verification email has been sent to you. Your verification should
            be completed in less than 48 hours.
          </p>
        </div>

        <Button className="btn btn-primary btn-medium">
          Proceed to Dashboard
        </Button>
      </div>
    </>
  );
}
