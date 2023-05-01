FROM node:14

# Add a work directory
WORKDIR /graphQL-service

# Cache and Install dependencies
# COPY package.json /graphQL-service/package.json
# COPY . /graphQL-service
COPY .. /graphQL-service
RUN npm install 

# Init the app
EXPOSE 5000

# "Build" the app
CMD ["npm", "start"]