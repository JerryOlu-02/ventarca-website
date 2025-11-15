import Button from "@/components/common/Button";
import "@/styles/components/forms/LoginForm.scss";
import GoogleSvg from "@/public/icon/google.svg";
import AppleSvg from "@/public/icon/apple.svg";

export default function LoginForm() {
  return (
    <section className="section login_section">
      <div className="login_container">
        <h4>Welcome Back!</h4>

        <div className="login_buttons">
          <Button className="btn btn-secondary btn-medium">
            <GoogleSvg /> Sign in with Google
          </Button>

          <Button className="btn btn-secondary btn-medium">
            <AppleSvg /> Sign in with Apple
          </Button>
        </div>

        <div className="login_separator">
          <span />
          or
          <span />
        </div>

        <form className="login_form">
          <div className="login_form-inputs">
            <div className="login_form-item">
              <label>Email Address</label>
              <input type="text" placeholder="Email Address" />
            </div>

            <div className="login_form-item">
              <label>Password</label>
              <input type="password" placeholder="Password" />

              <span className="forgot_pass">Forgot your password?</span>
            </div>
          </div>

          <Button className="btn btn-primary btn-medium">Sign In</Button>
        </form>

        <p className="register_link">
          Don’t have an account? <span>Create your account.</span>
        </p>
      </div>
    </section>
  );
}
