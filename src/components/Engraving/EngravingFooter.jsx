import React from "react";

const EngravingFooter = () => {
  return (
    <footer
      id="footercontent"
      className="cyo-global-footer"
      data-jac="cyoGlobalfooter"
    >
      <p className="engraving-language-disclaimer">
        <span className="warning">
          Please note that this is a preview only. Your actual engraving may
          vary slightly in color or placement.
        </span>
        <span className="guidelines">
          {" "}
          Engraving Guidelines{" "}
        </span>
        James Avery reserves the right to decline engraving orders that contain
        subject matter that may be considered profane, vulgar, irreverent,
        offensive or inappropriate including words, acronyms, slang or other
        content, or that is subject to a third party’s intellectual property
        rights.
      </p>

      <section>
        <div className="container-fluid footer-bottom">
          <ul>
            <li>
              <a href="https://www.jamesavery.com/privacy-notice.html">
                Privacy Notice
              </a>
            </li>
            <li>
              <a href="https://www.jamesavery.com/terms-and-conditions.html">
                Terms &amp; Conditions
              </a>
            </li>
            <li>
              <a href="https://www.jamesavery.com/accessibility.html">
                Accessibility
              </a>
            </li>
            <li>
              <a href="https://www.jamesavery.com/privacy-notice.html#dns">
                Do Not Sell or Share My Info
              </a>
            </li>
          </ul>
        </div>
        <span
          className="copyright text-center"
          
        >
          © 2025 James Avery Craftsman Inc
        </span>
      </section>
    </footer>
  );
};

export default EngravingFooter;
