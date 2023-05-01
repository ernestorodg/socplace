
export function fetchImage(imageName) {
    const src = 'http://products-service:4000/products/image' + imageName;

    fetch(
        src,
        { method: 'GET'}
    )
    .then((response) => response.json())
    .then((result) => {
        values.image = result.filename
        console.log(values)
        console.log('Success:', result);
        createProduct();
    })
    .catch((error) => {
        console.error('Error:', error);
    });
    
    return result;
}

