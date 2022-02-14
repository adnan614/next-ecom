import React, { useEffect } from "react";
import baseUrl from "../../Helpers/baseUrl";
import { useRef } from "react";
import Router from "next/router";

const Product = ({ product }) => {
  const modalRef = useRef(null);

  useEffect(() => {
    M.Modal.init(modalRef.current);
  }, []);

  const getModal = () => {
    return (
      <div id="modal1" className="modal" ref={modalRef}>
        <div className="modal-content">
          <h4>{product.name}</h4>
          <p>Are you sure you want to delete this?</p>
        </div>
        <div className="modal-footer">
          <button
            class="btn waves-effect #9c27b0 purple"
            type="submit"
            name="action"
          >
            cancel
          </button>
          <button
            class="btn waves-effect #f44336 red"
            type="submit"
            name="action"
            onClick={() => deleteProduct()}
          >
            Yes
          </button>
        </div>
      </div>
    );
  };

  const deleteProduct = async () => {
    const res = await fetch(`${baseUrl}/api/product/${product._id}`, {
      method: "DELETE",
    });

    await res.json();
    Router.push('/')
  };

  return (
    <div className="container center-align">
      <h3>{product.name}</h3>
      <img src={product.mediaUrl} />
      <h5>BDT {product.price}</h5>
      <input
        type="number"
        style={{ width: "400px", margin: "10px" }}
        min="1"
        placeholder="quantity"
      />
      <button class="btn waves-effect waves-light" type="submit" name="action">
        Add
      </button>
      <p className="left-align">{product.description}</p>
      <button
        data-target="modal1"
        class="modal-trigger btn waves-effect #f44336 red"
        type="submit"
        name="action"
      >
        Delete
      </button>
      {getModal()}
    </div>
  );
};

export async function getServerSideProps({ params: { id } }) {
  const res = await fetch(`${baseUrl}/api/product/${id}`);
  const data = await res.json();
  return {
    props: {
      product: data,
    },
  };
}

export default Product;
