import React from "react";
import "antd/dist/antd.dark.css";
import "./App.css";

//components
import { PageLayout } from "./pages/Layout";

//appData
import metadata from "./data/metadata.json";

function App() {
  return <PageLayout data={metadata} />;
}

export default App;
