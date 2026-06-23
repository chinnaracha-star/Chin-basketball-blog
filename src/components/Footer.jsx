import facebookIcon from "../assets/icons/facebook.svg";
import githubIcon from "../assets/icons/github.svg";
import googleIcon from "../assets/icons/google.svg";
import lineIcon from "../assets/icons/line.svg";
import linkedinIcon from "../assets/icons/linkedin.svg";

export function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-social">
          <p>Get in touch</p>

          <ul>
            <li>
              <a href="https://linkedin.com" aria-label="LinkedIn">
                <img src={linkedinIcon} alt="LinkedIn" />
              </a>
            </li>
            <li>
              <a href="https://github.com" aria-label="GitHub">
                <img src={githubIcon} alt="GitHub" />
              </a>
            </li>
            <li>
              <a href="https://google.com" aria-label="Google">
                <img src={googleIcon} alt="Google" />
              </a>
            </li>
            <li>
              <a href="https://facebook.com" aria-label="Facebook">
                <img src={facebookIcon} alt="Facebook" />
              </a>
            </li>
            <li>
              <a href="https://line.me" aria-label="Line">
                <img src={lineIcon} alt="Line" />
              </a>
            </li>
          </ul>
        </div>

        <a className="footer-home" href="#">
          Home page
        </a>
      </div>
    </footer>
  );
}
