import React, { useState } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Body from "./components/body/Body";
import "../public/style.css";

const App = () => {
  const [isModalOpen, setModalOpen] = useState(false);

  const toggleModal = () => {
    setModalOpen(!isModalOpen);
  };

  return (
    <div className="App">
      <Header toggleModal={toggleModal} />
      <Body toggleModal={toggleModal} isModalOpen={isModalOpen} />
      <Footer />
    </div>
  );
};

export default App;
