import VerificationBg from "@/public/images/verification-bg.jpg";

import VerifiedBadge from "@/public/icon/verified-badge.svg";
import ArrowRight from "@/public/icon/arrow-right.svg";

import Image from "next/image";
import Button from "@/components/common/Button";
import FileUploadInput from "@/components/common/FileUploadInput";

export default function Verification() {
  return (
    <>
      <div className="verification__bg-img">
        <Image src={VerificationBg} alt="verification_Background" />
      </div>

      <div className="verification_container">
        <div className="verification_header">
          <h4>
            <VerifiedBadge />
            Get Verified
          </h4>
          <span>Complete the form below to get verified</span>
        </div>

        <form className="verification_form">
          <div className="verification_form-field">
            <div className="verification_form-field-item">
              <label>Email Address</label>
              <input
                type="email"
                placeholder="Enter your email address to receive a verification email"
              />
            </div>

            <div className="verification_form-field-item">
              <label>Phone Number</label>
              <input type="email" placeholder="Enter phone number" />
            </div>
          </div>

          <div className="verification_form-field">
            <div className="verification_form-field-item">
              <label>Government ID</label>

              <FileUploadInput />
            </div>
          </div>
        </form>

        <div className="verification_buttons">
          <Button className="btn btn-secondary btn-medium">Skip</Button>

          <Button className="btn btn-primary btn-medium">
            Next <ArrowRight />
          </Button>
        </div>
      </div>
    </>
  );
}
