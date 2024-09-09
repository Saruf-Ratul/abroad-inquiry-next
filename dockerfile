# Use the official Node.js LTS (Long Term Support) image as the base image
FROM node:20-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install --legacy-peer-deps

# Copy the rest of the application code
COPY . .

# Build the Next.js application for production
RUN npm run build

# Expose the port that the Next.js app will run on
EXPOSE 3000

# Run the Next.js app in production mode
CMD ["npm", "start"]