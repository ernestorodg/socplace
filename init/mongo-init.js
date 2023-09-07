db.createUser( 
    {
        user: "root",
        pwd: "example",
        roles: [ "readWrite", "dbAdmin" ]        
    }
)
db.users.insert( 
    { 
        email: "ernesto@mail.com",
        username: "ernesto",
        password: "$2a$12$qywJRHtD3bfxWzZdYz8Wde.kGg3bXv3VxRt2XjgRVFqdDeMtTzPvy",
        createdAt: "2022-01-23T22:36:05.745Z",
        latitude: -22.9144193,
        longitude: -43.2193136,
        image: "ak64c4850f-09ac-4bc4-8020-4ef4fde7b386.png"

    }
)
db = db.getSiblingDB("yovend-products")
db.createUser( 
    {
        user: "root",
        pwd: "example",
        roles: [ "readWrite", "dbAdmin" ]        
    }
)
db.users.insert( 
    {
        _id: ObjectId('64f9fd6bd4044d4418914297'),
        savedProducts: [],
        email: 'lucia@mail.com',
        username: 'lucia',
        password: '$2a$12$qywJRHtD3bfxWzZdYz8Wde.kGg3bXv3VxRt2XjgRVFqdDeMtTzPvy',
        createdAt: '2023-09-07T16:42:19.456Z',
        latitude: -22.9628636,
        longitude: -43.1756065,
        image: '',
        __v: 0
    }
)
db.products.insert( 
    {
        "comments": [
            {
                "body": "Tá muito caro ",
                "username": "Guilherme",
                "id": 0
            }
        ],
        "title": "Brigadeiro",
        "seller": "ernesto",
        "category": "Brigadeiro",
        "image": "http://res.cloudinary.com/drhckdsxw/image/upload/v1644965843/derdknnygj6vbjwdipj5.jpg",
        "price": 10,
        "description": "Brigadeiro",
        "latitude": -22.9144193,
        "longitude": -43.2193136
    }
)



