import React from "react";

const Loader = ({ isLoading }) => {
  // const [addStyle, setAddStyle] = useState(true);

  return (
    <>
      {isLoading && (
        <div id="custom-loader">
          {/* <div className="loader"></div> */}
          {/* <div className="loader">
            <div className="loader__bar"></div>
            <div className="loader__bar"></div>
            <div className="loader__bar"></div>
            <div className="loader__bar"></div>
            <div className="loader__bar"></div>
            <div className="loader__ball"></div>
          </div> */}

          <div className="spinner">
            <svg viewBox="25 25 50 50" className="circular">
              <circle
                strokemiterlimititerlimit="10"
                strokeWidth="3"
                fill="none"
                r="20"
                cy="50"
                cx="50"
                className="path"
              ></circle>
            </svg>
          </div>
        </div>
      )}
    </>
  );
};

export default Loader;
