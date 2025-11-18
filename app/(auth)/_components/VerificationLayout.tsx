import "@/styles/pages/auth/verification-layout.scss";
import SuccessSvg from "@/public/icon/success.svg";

export default function VerificationLayout({
  header,
  content,
}: {
  header: string;
  content: string;
}) {
  return (
    <section className="section verification_section">
      <div className="verification_container">
        <SuccessSvg />

        <h4>{header}</h4>

        <p>{content}</p>
      </div>
    </section>
  );
}
