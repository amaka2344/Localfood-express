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
      'https://api.cloudinary.com/v1_1/duci5ynen/image/upload',
      {
        file: base64String,
        upload_preset: 'localfood',
      }
    );

    return response.data.secure_url;

  } catch (error) {
    alert(JSON.stringify(error));
    throw new Error(error);
  }
};

export { geocodeAddress, uploadImage };
