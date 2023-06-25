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
        password: "$2a$12$fkMZLs2SvglzYmE3wDKJr.6XPeK5qcRrCxNdDLERMkYstxlMceEz2",
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



