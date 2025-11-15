import "@/styles/components/forms/RegisterForm.scss";
import Button from "@/components/common/Button";
import GoogleSvg from "@/public/icon/google.svg";
import AppleSvg from "@/public/icon/apple.svg";

export default function RegisterForm() {
  return (
    <section className="section register_section">
      <div className="register_container">
        <h4>Create Your Free Account</h4>

        <div className="register_buttons">
          <Button className="btn btn-secondary btn-medium">
            <GoogleSvg /> Sign up with Google
          </Button>

          <Button className="btn btn-secondary btn-medium">
            <AppleSvg /> Sign up with Apple
          </Button>
        </div>

        <div className="register_separator">
          <span />
          or
          <span />
        </div>

        <form className="register_form">
          <div className="register_form-inputs">
            <div className="register_form-item">
              <div>
                <label>First Name</label>
                <input type="text" placeholder="First Name" />
              </div>

              <div>
                <label>Last Name</label>
                <input type="text" placeholder="Last Name" />
              </div>
            </div>

            <div className="register_form-item">
              <div>
                <label>Email Address</label>
                <input type="text" placeholder="Email Address" />
              </div>

              <div>
                <label>Phone Number</label>
                <input type="text" placeholder="Phone Number" />
              </div>
            </div>

            <div className="register_form-item">
              <div>
                <label>Password</label>
                <input type="password" placeholder="Password" />
              </div>
            </div>
          </div>

          <aside className="agree_terms">
            <div>
              <input type="checkbox" /> I agree to Ventarca’s{" "}
              <span>term and policies.</span>
            </div>

            <div>
              <input type="checkbox" /> I agree to receive mail and updates via
              mail from Ventarca.
            </div>
          </aside>

          <Button className="btn btn-primary btn-medium">
            Create My Account
          </Button>
        </form>

        <p className="register_link">
          Already have an account? <span>Sign in here.</span>
        </p>
      </div>
    </section>
  );
}
