import axios from "axios";

//converts raw txt address to address object with longitude and latitude
const geocodeAddress = async (address) => {
  try {
    const response = await axios.get(
      "https://api.geoapify.com/v1/geocode/search?text=" +
        address +
        "&apiKey=dc173d08567e47d28ff273f428e3225c",
      {
        headers: {},
      }
    );
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
};

const uploadImage = async (base64String) => {
  try {
    const response = await axios.post(
      "https://api.cloudinary.com/v1_1/duci5ynen/image/upload",
      {
        file: base64String,
        upload_preset: "localfood",
      }
    );

    return response.data.secure_url;
  } catch (error) {
    throw new Error(error);
  }
};

const sendEmail = async (mail) => {
  const url = "https://api.zeptomail.com/v1.1/email";
  const data = {
    bounce_address: "no-reply@bounce.swaptrex.com",
    from: { address: "no-reply@swaptrex.com" },
    to: [{ email_address: { address: mail.to, name: mail.vendorName } }],
    subject: "Order Notification",
    htmlbody:
      "<div><b> Hi  " +
      mail.vendorName +
      ",</b> <br/>You have a new order with the following details <br/><br/>",
    ///+JSON.stringify(mail.cartItems)+"<br/><br/><b>Total:</b>"+mail.total+"<br/>"+comment+"</div>"
  };
  const headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization:
      "Zoho-enczapikey ",
  };

  try {
    await axios.post(url, data, { headers });
    return true;
    // Handle the response data as needed
  } catch (error) {
    throw new Error(error);
  }
};

const getStorageParam = async (param) => {
  try {
    const value = localStorage.getItem(param);
    if (value !== null || value !== undefined) {
      return value;
    }
    return false;
  } catch (error) {
    throw new Error(error);
  }
};

export { geocodeAddress, uploadImage, sendEmail, getStorageParam };
