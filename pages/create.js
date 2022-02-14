import Link from "next/link";
import { useState } from "react";
import baseUrl from "../Helpers/baseUrl";
import Router from "next/router";

const Create = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [media, setMedia] = useState("");
  const [description, setDescription] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const mediaUrl = await imageUpload();
      const res = await fetch(`${baseUrl}/api/products`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          price,
          mediaUrl,
          description,
        }),
      });
      const res2 = await res.json();
      if (res2.error) {
        M.toast({ html: res2.error, classes: "red" });
      } else {
        M.toast({ html: "Product saved", classes: "green" });
        Router.push("/");
      }
    } catch (err) {
      console.log(err);
    }
  };
  const imageUpload = async () => {
    const data = new FormData();
    data.append("file", media);
    data.append("upload_preset", "mystore");
    data.append("cloud_name", "kodeeo");
    const res = await fetch(
      "	https://api.cloudinary.com/v1_1/kodeeo/image/upload",
      {
        method: "POST",
        body: data,
      }
    );
    const res2 = await res.json();
    return res2.url;
  };
  return (
    <form className="container" onSubmit={(e) => handleSubmit(e)}>
      <input
        type="text"
        name="name"
        placeholder="Name"
        value={name}
        onChange={(e) => {
          setName(e.target.value);
        }}
      />
      <input
        type="text"
        name="price"
        placeholder="Price"
        value={price}
        onChange={(e) => {
          setPrice(e.target.value);
        }}
      />
      <div className="file-field input-field">
        <div className="btn #1565c0 blue darken-3">
          <span>File</span>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setMedia(e.target.files[0])}
          />
        </div>
        <div className="file-path-wrapper">
          <input className="file-path validate" type="text" />
        </div>
      </div>
      <img
        className="responsive-img"
        src={media ? URL.createObjectURL(media) : ""}
      />
      <textarea
        name="description"
        placeholder="Description"
        value={description}
        onChange={(e) => {
          setDescription(e.target.value);
        }}
        className="materialize-textarea"
      ></textarea>
      <button
        className="btn waves-effect waves-light #1565c0 blue darken-3"
        type="submit"
      >
        Submit
        <i className="material-icons right">send</i>
      </button>
    </form>
  );
};

export default Create;
