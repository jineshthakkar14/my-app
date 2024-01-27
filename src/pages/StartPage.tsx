import { NavLink } from "react-router-dom";

import JsonFileUploader from "../componets/JsonFileUploader";




export const StartPage = () => {
  return (
    <div className="flex h-[100vh] justify-center items-center gap-3 flex-col">
      <NavLink to="/diagram">
        <button className="button-24">Create New Diagram</button>
      </NavLink>
      <JsonFileUploader></JsonFileUploader>
    </div>
  );
};
