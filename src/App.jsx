import {useState, useEffect} from "react";
import "./App.css";
import Body from "./components/Body";
import Footer from "./components/Footer";
import Header from "./components/Header";

function App() {
  const [count, setCount] = useState("");

  return (
    <>
      <Header />
      <Body />
      <Footer />
    </>
  );
}

export default App;
