import React from "react";
import BlocklyApp from "./BlocklyApp.jsx";
import Programming from "./Programming.jsx";
import BlocklyProvider from "./BlocklyContext.jsx";

const App = () => {
  return (
    <div>
      <BlocklyProvider>
        {/* < BlocklyWorkspace /> */}
        < Programming />
        {/* <BlocklyApp />   */}
      </BlocklyProvider>
    </div>
  );
};

export default App;
