import React, { useState } from "react";
import "./newProduct.css";
import { Publish } from "@material-ui/icons";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from "../../firebase";
import {useDispatch} from 'react-redux'
import {addProducts} from '../../redux/apiCalls'
 
export default function NewProduct() {
  const [inputs, setInputs] = useState({});
  const [imgUploadPerc, setImgUploadPerc] = useState('');
  const [file, setFile] = useState(null);
  const [cat, setCat] = useState([]);
  const dispatch = useDispatch()

  const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleCat = (e) => {
    setCat(e.target.value.split(","));
  };

  const handleClick = (e) => {
    e.preventDefault();
    const fileName = new Date().getTime() + file.name;
    const storage = getStorage(app);
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    // Register three observers:
    // 1. 'state_changed' observer, called any time the state changes
    // 2. Error observer, called on failure
    // 3. Completion observer, called on successful completion
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        setImgUploadPerc("Upload is " + progress + "% done")
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
          default:
        }
      },
      (error) => {
        // Handle unsuccessful uploads
      },
      () => {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
         // console.log("File available at", downloadURL);
          const product = {...inputs, img: downloadURL, categories: cat }
          addProducts(product, dispatch)
        });
      }
    );
  };

  return (
    <div className="newProduct">
      <h1 className="newProductTitle">New Product</h1>

      <form action="" className="newProductForm">
        <div className="newProductItem">
          <div className="newProductUpload">
            <span className="newProductImg">click here to upload image</span>
            <label for="file">
              <Publish style={{ cursor: "pointer", color: "darkblue" }} />
            </label>
            <input
              type="file"
              id="file"
              style={{ display: "none" }}
              onChange={(e) => setFile(e.target.files[0])}
            />
          </div>

          { file && <span style={{fontSize:"11px", color:'darkblue'}}>{file.name}</span>}

         <span style={{fontSize:"12px", color:'red', marginTop:'5px'}}>{imgUploadPerc}</span> 
        </div>

        <div className="newProductItem">
          <label>Title</label>
          <input
            name="title"
            type="text"
            placeholder="title..."
            onChange={handleChange}
            required
          />
        </div>

        <div className="newProductItem">
          <label>Description</label>
          <input
            name="desc"
            type="text"
            placeholder="description..."
            onChange={handleChange}
            required
          />
        </div>

        <div className="newProductItem">
          <label>Price</label>
          <input
            name="price"
            type="number"
            placeholder="100"
            onChange={handleChange}
            required
          />
        </div>

        <div className="newProductItem">
          <label>Categories</label>
          <input
            type="text"
            placeholder="wears,men,women"
            onChange={handleCat}
            required
          />
        </div>

        <div className="newProductItem">
          <label>Stock</label>
          <select name="inStock" onChange={handleChange}>
            <option>Select</option>
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
        </div>

        <button className="newProductButton" onClick={handleClick}>
          Create
        </button>
      </form>
    </div>
  );
}