import Image from "next/image";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import TopNav from "../../components/adminTopNav";
import Link from "next/link";
import { Chip } from "@material-tailwind/react";
import { getLoggedInUser, logOutUser } from "../../services/user";
import { addUnit, getAllUnits } from "../../services/units";
import {
  getProductsByVendor,
  updateProduct,
  createProduct,
  deleteProduct,
} from "../../services/product";
import toast, { Toaster } from "react-hot-toast";

const Products = () => {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [productList, setProductList] = useState([]);
  const [units, setUnits] = useState([]);
  const [photo, setPhoto] = useState("");
  const [title, setTitle] = useState("Add Product");
  const [edit, setEdit] = useState(false);
  const [product, setProduct] = useState({
    productName: "",
    description: "",
    price: "",
    unitId: "",
    stockQuantity: "",
    packagingTime: "30",
    published: "on",
  });
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result;
      // Update the state with the base64 string
      setPhoto(base64String);
    };
    reader.readAsDataURL(file);
  };

  const handleAddProduct = () => {
    setIsModalOpen(true);
  };

  const handleDeleteProduct = () => {
    setIsDeleteModalOpen(true);
  };

  const handleViewProduct = () => {
    setIsViewModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleCloseViewModal = () => {
    setIsViewModalOpen(false);
  };

  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      product["deleted"] = true;
      const response = await deleteProduct(product.id, product);
      setLoading(false);
      if (response.hasOwnProperty("success") && response.success) {
        toast.success(response.message);
        handlegetProductsByVendor();
        handleCloseDeleteModal();
      } else {
        toast.error("Oops!!, failed to delete product");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleSaveProduct = async (e) => {
    e.preventDefault();
    // Retrieve the form data
    try {
      const formData = new FormData(e.target);

      const newProduct = {
        productName: formData.get("productName"),
        description: formData.get("description"),
        price: formData.get("price"),
        unitId: formData.get("unitId"),
        stockQuantity: formData.get("stockQuantity"),
        packagingTime: formData.get("packagingTime"),
        published: formData.get("published") === "on",
        photo,
        userId: user.uid,
        deleted: false,
      };
      setLoading(true);
      const response = edit
        ? await updateProduct(product.id, newProduct)
        : await createProduct(newProduct);
      setLoading(false);
      if (response.hasOwnProperty("success") && response.success) {
        edit
          ? toast.success(response.message)
          : toast.success(response.message);
      } else {
        toast.error("Oops!!, product creation failed");
      }
      handlegetProductsByVendor();
      setEdit(false);
      //close the modal
      handleCloseModal();
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleGetUnits = async () => {
    // Perform form submission logic here
    try {
      /*const unitData = {
        name: "Wrap",
        abbreviation: "Wrap",
      };
      const response = await addUnit(unitData);*/
      const response = await getAllUnits();
      setUnits(response.units);
    } catch (error) {
      toast.error("error");
    }
  };

  const handlegetProductsByVendor = async () => {
    try {
      const response = await getProductsByVendor(user.uid);
      setProductList(response.products);
    } catch (error) {
      toast.error("error");
    }
  };

  const handleCheckLogin = async () => {
    const user = await getLoggedInUser();
    if (!user) {
      toast.error("Please login");
      router.push("/login");
    }
    setUser(user);
  };

  const logOut = async () => {
    await logOutUser();
    router.push("/login");
  };

  useEffect(() => {
    handleCheckLogin();
    handleGetUnits();
  }, []);

  useEffect(() => {
    handlegetProductsByVendor();
  }, [user]);

  return (
    <>
      <div className="flex h-screen">
        {/* Left-hand side navigation */}
        <div className="flex flex-col bg-black w-[20%] md:w-[12%] text-white pt-[50px]">
          <h1 className="text-center pt-8 font-bold text-2xl">
            Local food-express
          </h1>
          <ul className="flex flex-col mt-8">
            <li className="py-2 px-4 hover:bg-gray-300">
              <Link href="/admin/dashboard">
                <a className="flex items-center">
                  <span className="w-6 h-6 mr-2">
                    {/* Add your navigation icon here */}
                  </span>
                  Dashboard
                </a>
              </Link>
            </li>
            <li className="py-2 px-4 hover:bg-gray-300">
              <Link href="/admin/products">
                <a className="flex items-center">
                  <span className="w-6 h-6 mr-2">
                    {/* Add your navigation icon here */}
                  </span>
                  Products
                </a>
              </Link>
            </li>
            <li className="py-2 px-4 hover:bg-gray-300">
              <Link href="/admin/orders">
                <a className="flex items-center">
                  <span className="w-6 h-6 mr-2">
                    {/* Add your navigation icon here */}
                  </span>
                  Orders
                </a>
              </Link>
            </li>
            <li className="py-2 px-4 hover:bg-gray-300" onClick={logOut}>
              <a className="flex items-center">
                <span className="w-6 h-6 mr-2">
                  {/* Add your navigation icon here */}
                </span>
                Logout
              </a>
            </li>
            {/* Add more navigation links here */}
          </ul>
        </div>

        {/* Right-hand side content */}
        <div className="flex flex-col flex-1">
          <TopNav />

          {/** add the product button */}
          <div className="flex justify-between items-center p-4">
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded"
              onClick={handleAddProduct}
            >
              Add Product
            </button>
          </div>

          {/** modal */}
          {isModalOpen && (
            <div className="fixed inset-0 flex items-center justify-center z-10 text-black">
              <div className="bg-white rounded-lg p-6 w-96 z-50">
                <h2 className="text-lg font-bold mb-4">{title}</h2>
                <form onSubmit={handleSaveProduct}>
                  <div className="mb-4">
                    <input
                      type="file"
                      name="photo"
                      className="border border-gray-300 p-2 w-full"
                      placeholder="Product Image"
                      onChange={handlePhotoChange}
                    />
                  </div>
                  {/* Product Name */}
                  <div className="mb-4">
                    <input
                      type="text"
                      name="productName"
                      defaultValue={product.productName}
                      className="border border-gray-300 p-2 w-full"
                      placeholder="Product Name"
                    />
                  </div>

                  {/* Description */}
                  <div className="mb-4">
                    <textarea
                      defaultValue={product.description}
                      name="description"
                      className="border border-gray-300 p-2 w-full"
                      placeholder="Product Description"
                    ></textarea>
                  </div>
                  <div className="mb-4">
                    <input
                      defaultValue={product.price}
                      name="price"
                      type="number"
                      className="border border-gray-300 p-2 w-full"
                      placeholder="Price"
                    />
                  </div>
                  <div className="mb-4">
                    <select
                      className="border border-gray-300 p-2 w-full"
                      defaultValue={product.unitId}
                      name="unitId"
                    >
                      {units.length > 0 &&
                        units.map((unit, index) => (
                          <option key={index} value={unit.name}>
                            {unit.abbreviation}
                          </option>
                        ))}
                    </select>
                  </div>
                  <div className="mb-4">
                    <input
                      defaultValue={product.stockQuantity}
                      name="stockQuantity"
                      type="number"
                      className="border border-gray-300 p-2 w-full"
                      placeholder="Stock Quantity"
                    />
                  </div>
                  <div className="mb-4">
                    <input
                      name="packagingTime"
                      defaultValue={product.packagingTime}
                      type="number"
                      className="border border-gray-300 p-2 w-full"
                      placeholder="Packaging Time (Mins)"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="flex items-center">
                      <input
                        name="published"
                        defaultChecked={product.published}
                        type="checkbox"
                        className="mr-2"
                      />
                      Published
                    </label>
                  </div>
                  {/* Save Button */}
                  <div className="flex justify-end">
                    <button
                      type="submit"
                      disabled={loading}
                      className="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer"
                    >
                      Save
                    </button>
                  </div>
                </form>
              </div>
              <div
                className="fixed inset-0 bg-black opacity-50"
                onClick={handleCloseModal}
              >
              </div>
            </div>
          )}

          {isViewModalOpen && (
            <div className="fixed inset-0 flex items-center justify-center z-10 text-black">
              <div className="bg-white rounded-lg p-6 w-96 z-50">
                <h2 className="text-lg font-bold mb-4">Product Details</h2>
                <div className="mb-4">Product Name: {product.productName}</div>
                <div className="mb-4">Description: {product.description}</div>
                <div className="mb-4">Price: {product.price}</div>
                <div className="mb-4">Product Unit: {product.unitId}</div>
                <div className="mb-4">
                  Stock Quantity: {product.stockQuantity}
                </div>
                <div className="mb-4">
                  Packaging Time: {product.packagingTime}
                </div>
                <div className="mb-4">Published: {product.published}</div>
              </div>
              <div
                className="fixed inset-0 bg-black opacity-50"
                onClick={handleCloseViewModal}
              ></div>
            </div>
          )}

          {isDeleteModalOpen && (
            <div className="fixed inset-0 flex items-center justify-center z-10 text-black">
              <div className="bg-white rounded-lg p-6 w-96 z-50">
                <h2 className="text-lg font-bold mb-4">Delete Menu</h2>
                <p>Are you sure you want to delete this product?</p>
              </div>
              <div className="mb-4 flex">
                <button
                  type="submit"
                  disabled={loading}
                  onClick={handleDelete}
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                  Yes, Proceed
                </button>
              </div>
              <div className="mb-4" onClick={handleCloseDeleteModal}></div>
            </div>
          )}

          <div className=" gap-4 text-black p-4">
            <div className="flex flex-col">
              <h1 className="text-2xl font-bold mb-4">Products</h1>
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="py-2 px-4">Image</th>
                    <th className="py-2 px-4">Id</th>
                    <th className="py-2 px-4">Product Name</th>
                    <th className="py-2 px-4">Price</th>
                    <th className="py-2 px-4">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {productList.length > 0 ? (
                    productList.map((product, index) => (
                      <tr key={index} className="border-b">
                        <td className="py-2 px-4">
                          <div className="w-16 h-16">
                            <Image
                              width={50}
                              height={50}
                              src={product.photo}
                              objectFit="cover"
                              alt=""
                            />
                          </div>
                        </td>
                        <td className="py-2 px-4">{index + 1}</td>
                        <td className="py-2 px-4">{product.productName}</td>
                        <td className="py-2 px-4">
                          {product.price}/{product.unitId}
                        </td>
                        <td className="py-2 px-4">
                          <button
                            className="bg-green-500 text-white px-3 py-1 rounded mr-2"
                            onClick={() => {
                              setProduct(product);
                              handleViewProduct();
                            }}
                          >
                            more
                          </button>
                          <button
                            className="bg-blue-500 text-white px-3 py-1 rounded mr-2"
                            onClick={() => {
                              setTitle("Edit Product");
                              setEdit(true);
                              setProduct(product);
                              handleAddProduct();
                            }}
                          >
                            Edit
                          </button>
                          <button
                            className="bg-red-500 text-white px-3 py-1 rounded cursor-pointer"
                            onClick={() => {
                              setProduct(product);
                              handleDeleteProduct();
                            }}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="py-2 px-4 text-center">
                        No products found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Products;
