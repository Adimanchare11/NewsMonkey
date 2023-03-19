import "./App.css";
import Navbar from "./components/Navbar";

import News from "./components/News";
import React, { Component } from "react";
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";

function App() {
  const pageSize= 8
  const apiKey = process.env.REACT_APP_NEWS_API
    return (
      <div>
        <Router>
          <Navbar />
          <Routes>
          {/* if we didnt write the keyword exact then only the endpoints(in the url /generl, /Business etc will appear) will change and not the components itself . it will change after we reload the browser .understand the problwm here- for example if i get into the route general , then we will get into the genral route with category general but if i then navigate to any other route for example health then the whole component will not reload, react will think that the news component is already mounted why there is need to mount the component again(re-mount). But here we have to remount the component with the updated props and i have to apply the categaory='health' wala mujhe lagana hain . TO SOLVE THIS PROBLEM I NEED TO GIVE THE  UNIQUE KEY PROP. HERE BELOW THAT UNIQUE PROP IS "key" */}
            <Route exact path="/" element={<News key="General" pageSize={pageSize} country={"us"} category={"General"} apiKey={apiKey}/> }/>
            <Route exact path="/Business" element={<News  key="Business" pageSize={pageSize} country={"us"} category={"Business"} apiKey={apiKey} /> }/>
            <Route exact path="/Entertainment" element={<News key="Entertainment" pageSize={pageSize} country={"us"} category={"Entertainment"} apiKey={apiKey} /> }/>
            <Route exact path="/General" element={<News key="General" pageSize={pageSize} country={"us"} category={"General"} apiKey={apiKey} /> }/>
            <Route exact path="/Health" element={<News  key="Health" pageSize={pageSize} country={"us"} category={"Health"} apiKey={apiKey} /> }/>
            <Route exact path="/Science" element={<News key="Science" pageSize={pageSize} country={"us"} category={"Science"} apiKey={apiKey} /> }/>
            <Route exact path="/Sports" element={<News  key="Sports" pageSize={pageSize} country={"us"} category={"Sports"} apiKey={apiKey} /> }/>
            <Route exact path="/Technology" element={<News  key="Technology" pageSize={pageSize} country={"us"} category={"Technology"} apiKey={apiKey} /> }/>
          </Routes>
        </Router>
      </div>
    );
  }

  export default App
