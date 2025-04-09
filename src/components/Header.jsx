import React from "react";

const Header = () => {
  return (
    <>
      <header className="cyo-global-header">
        <nav role="navigation" className="navigation">
          <div className="row header m-0">
            <div className="col-12 d-flex align-items-center justify-content-between">
              <div
                className="navbar-header brand mt-2 mb-2"
                data-jac="brandlogo"
              >
                <a
                  tabIndex="0"
                  className="logo-home pl-2 from-engraving gtm-cyo-header-logo"
                  href="/"
                >
                  <img
                    src="https://www.jamesavery.com/on/demandware.static/-/Sites/default/dw90740acd/images/logoImage/JAC-logo.svg"
                    alt="James Avery Artisan Jewelry"
                  />
                </a>
              </div>
              <div className="engravingRestrictionInfo">
                <input
                  type="hidden"
                  id="engblackListGrp"
                  value="Pedo,Pedo+Minor,Fuck,Shit,Damn,Ass,Bitch,Putita,Titties,MUFUKA,Chingona,Bish,Puta,Cunt,Azz,Cuca,F*ck,Pendejos,HEB,SHIITAKE,Fuckin,Fucking,bitch,Sico,Butt,Negra,BICHOTA,TXST,Bruja,Perra,Lucifer,Cabrona,WTAMU,UMASS,Coochie,Retard,Boeing,Nigga,Stupid,Shank,Crackhead,Tits,IDGAF,F**K,Nalgona,FKN,Unfuckwitable,ATM,UT,SMU,LSU,OU,OKC,Baylor,Slut,Gay,UTSA,TCU,SHSU,UCLA,OSU,Suck,Beaner,Beaners,Shitt,Sancho,Gayyyyy,Gay,Hoebag,Hoodrat,Nazi,Anal,Smut,Pinchesca,Tits,STFU,Guey,Coochie,C**chie,Fuk,Ballbuster,Hoes,Shaddup,Bish"
                />
                <div className="d-none engraving-guideline-error">
                  <span>
                    To continue, please remove any profane, inappropriate, or
                    trademarked content.
                  </span>
                </div>
              </div>
              <div className="btn-container cyo-btn-wrapper">
                <a
                  tabIndex="0"
                  href="javascript:void(0)"
                  className="btn btn-primary font-proxima-bold cyo-btn-done  from-engraving  gtm-done-btn"
                  data-bs-toggle="modal"
                  data-href="/on/demandware.store/Sites-JamesAvery-Site/en_US/Product-CyoSaveEngravedDetails"
                >
                  Done -
                  <span
                    className="cyo-product-price from-engraving"
                    data-base-price="$49"
                  >
                    $69
                  </span>
                </a>
              </div>
            </div>
          </div>
        </nav>
      </header>
    </>
  );
};

export default Header;
