FROM node:14

# Add a work directory
WORKDIR /products-service

# Cache and Install dependencies
# COPY ../package.json /products-service/package.json
COPY .. /products-service
RUN npm install 

# Init the app
EXPOSE 9000

# "Build" the app
CMD ["npm", "start"]