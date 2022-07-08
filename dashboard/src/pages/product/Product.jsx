import React, { useEffect, useMemo, useState } from "react";
import "./product.css";
import { Link, useLocation } from "react-router-dom";
import Chart from "../../components/chart/Chart";
import { Publish } from "@material-ui/icons";
import { useDispatch, useSelector } from "react-redux";
import { userRequest } from "../../requestMethod";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from "../../firebase";
import { updateProducts } from "../../redux/apiCalls";

export default function Product() {
  const location = useLocation();
  const productId = location.pathname.split("/")[2];
  const [pStats, setPStats] = useState([])

  const [inputs, setInputs] = useState({});
  const [imgUploadPerc, setImgUploadPerc] = useState("");
  const [file, setFile] = useState(null);
  const [cat, setCat] = useState([]);
  const dispatch = useDispatch();

  const product = useSelector((state) =>
    state.product.products.find((product) => product._id === productId)
  );

  const MONTHS = useMemo(()=>[
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Agu",
    "Sep",
    "Oct",
    "Nov",
    "Dec"
  ],[]);


  useEffect(()=>{
    const getStats = async () =>{
      try{
          const res = await userRequest.get("orders/income?pid=" + productId)
          const list = res.data.sort((a,b)=>{
            return a._id - b._id
          })
          list.map((item) =>
            setPStats((prev) =>[
              ...prev, { name: MONTHS[item._id - 1], Sales: item.total}
            ])
          );
         
      }catch(err){
        console.log(err)
      }
    }
    getStats();
  },[MONTHS, productId]);

  const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleCat = (e) => {
    setCat(e.target.value.split(","));
  };

  const handleClick = id =>(e) => {
    e.preventDefault();
    const fileName = new Date().getTime() + file?.name;
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
        setImgUploadPerc("Upload is " + progress + "% done");
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
          const product = { ...inputs, img: downloadURL, categories: cat };
          updateProducts(id, product, dispatch);
        });
      }
    );
  };


  return (
    <div className="product">
      <div className="productTitleContainer">
        <h1 className="productTitle">Product</h1>
        <Link to="/newProduct">
          <button className="productAddButton">Create</button>
        </Link>
      </div>

      <div className="productTop">
        <div className="productTopLeft">
          <Chart data={pStats} dataKey="Sales" title="Sales Performance" />
        </div>

        <div className="productTopRight">
          <div className="productInfoTop">
            <img
              src={product?.img}
              alt=""
              className="productInfoImg"
            />
            <span className="productName">{product?.title}</span>
          </div>

          <div className="productInfoBottom">
            <div className="productInfoItem">
              <span className="productInfoKey">id:&nbsp;</span>
              <span className="productInfoValue"> {product?._id}</span>
            </div>
          </div>

          <div className="productInfoItem">
            <span className="productInfoKey">sales:</span>
            <span className="productInfoValue">5123</span>
          </div>

          <div className="productInfoItem">
            <span className="productInfoKey">inStock:</span>
            <span className="productInfoValue">{product?.inStock}</span>
          </div>
        </div>
      </div>

      <div className="productBottom">
        <form className="productForm">
          <div className="productFormLeft">

          <label>Product Id</label>
            <input
              name="_id"
              type="text"
              placeholder={product?._id}
              onChange={handleChange}
              required
              
            />

            <label>Product Title</label>
            <input
              name="title"
              type="text"
              placeholder={product?.title}
              onChange={handleChange}
              required
              
            />

            <label>Product Description</label>
            <input
              name="desc"
              type="text"
              placeholder={product?.desc}
              onChange={handleChange}
              required
              
            />

            <label>Product Price</label>
            <input
              name="price"
              type="number"
              placeholder={product?.price}
              onChange={handleChange}
              required
              
            />

            <label>Product Categories</label>
            <input
              type="text"
              placeholder="wears,men,women"
              onChange={handleCat}
              required
            />

            <label>inStock</label>
            <select name="inStock" id="inStock" onChange={handleChange}>
              <option>Select</option>
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>

          </div>

          <div className="productFormRight">
            <div className="productUpload">
              <img
                src={product?.img}
                alt=""
                className="productUploadImg"
              />
              <label for="file">
                <Publish />
              </label>
              <input type="file" id="file" style={{ display: "none" }} onChange={(e) => setFile(e.target.files[0])} />
            </div>

            {file && (
              <span style={{ fontSize: "11px", color: "darkblue" }}>
                {file.name}
              </span>
            )}

            <span style={{ fontSize: "12px", color: "red", marginTop: "5px" }}>
              {imgUploadPerc}
            </span>
            <button className="productButton" onClick={handleClick(productId)}>Update</button>
          </div>
        </form>
      </div>
    </div>
  );
}
