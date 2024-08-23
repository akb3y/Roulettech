/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react";
import axios from "axios";
import { RiSubtractFill } from "react-icons/ri";
import { RiAddFill } from "react-icons/ri";
import { TiDelete } from "react-icons/ti";
import Modal from "./Modal";

const Body = ({ toggleModal, isModalOpen }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getData = async () => {
    try {
      const response = await axios.get("http://localhost:8001/inventory/all/");
      setData(response.data);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const increaseItem = async (id) => {
    try {
      await axios.patch(`http://localhost:8001/inventory/${id}/increase/`);

      await getData();
    } catch (error) {
      console.error("Error updating item quantity:", error);
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const decreaseItem = async (id) => {
    try {
      await axios.patch(`http://localhost:8001/inventory/${id}/decrease/`);

      await getData();
    } catch (error) {
      console.error("Error updating item quantity:", error);
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const deleteItem = async (id) => {
    try {
      await axios.delete(`http://localhost:8001/inventory/${id}/remove/`);
      await getData();
    } catch (error) {
      console.error("Error deleting item:", error);
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log("data", data);
    getData();
  }, []);

  const addItem = (item) => {
    setData((prevData) => [...prevData, item]);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error fetching data: {error.message}</p>;

  return (
    <>
      <div>
        {data.map((item) => (
          <>
            <div className="item-container">
              <p key={item.id} className="item-name">
                {item.name.toLowerCase()}
              </p>
              <div className="icon-container">
                <RiSubtractFill className="item-icon" onClick={() => decreaseItem(item.id)} />
                <p className="item-quantity">{item.quantity}</p>
                <RiAddFill className="item-icon" onClick={() => increaseItem(item.id)} />
                <TiDelete className="delete" onClick={() => deleteItem(item.id)} />
              </div>
            </div>
          </>
        ))}
      </div>
      <Modal isOpen={isModalOpen} toggleModal={toggleModal} addItem={addItem} />
    </>
  );
};

export default Body;
