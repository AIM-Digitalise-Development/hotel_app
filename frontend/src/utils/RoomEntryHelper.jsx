import axios from "axios";
export const handleImageUpload = (setImages) => async (e) => {
  const files = e.target.files;
  
  if (files.length > 0) {
    const uploadedImages = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const formData = new FormData();
      formData.append('file', file);

      try {
        const res = await axios.post('http://localhost:5000/api/upload-image', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        // Assuming the response returns the image URL (the server should send it back)
        uploadedImages.push(res.data.imageUrl); // Correctly storing image URL
      } catch (error) {
        console.error('Error uploading image:', error);
      }
    }

    // Update the images state with the URLs of the uploaded images
    setImages(uploadedImages);
  }
};
