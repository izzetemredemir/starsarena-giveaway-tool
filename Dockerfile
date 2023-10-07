FROM node:18-alpine

# Set the working directory.
WORKDIR /usr/src/app

# Copy package.json and package-lock.json files.
COPY package*.json ./

# Install application dependencies.
RUN npm install

# Copy all application source files.
COPY . .

# Port on which the application will run.
EXPOSE 3000

# Start the application.
CMD [ "node", "index.js" ]
