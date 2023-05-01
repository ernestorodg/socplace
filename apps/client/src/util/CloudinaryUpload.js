export default async function CloudinaryUpload(image) {
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "it8z1lbf");
    data.append("cloud_name","drhckdsxw");
    return fetch("https://api.cloudinary.com/v1_1/drhckdsxw/image/upload",{
        method:"post",
        body: data
    })
    
}


// formData.append('file', file);
// formData.append("upload_preset", "it8z1lbf");
// formData.append("cloud_name","drhckdsxw");
// return fetch("https://api.cloudinary.com/v1_1/drhckdsxw/image/upload",{
//     method:"post",
//     body: formData
// })
// .then(resp => resp.json())
// .then(data => {
//   values.image = data.url
//   console.log(values)
//   console.log('Success:', data);
//   createProduct();
// })
// .catch(err => console.log(err))