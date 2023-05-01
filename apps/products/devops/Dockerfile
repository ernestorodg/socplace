FROM node:11

# Add a work directory
WORKDIR /products

# Cache and Install dependencies
# COPY ../package.json /products-service/package.json
COPY .. /products
RUN npm install 

# Init the app
EXPOSE 4000

# "Build" the app
CMD ["npm", "start"]