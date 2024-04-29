# Use an official Node runtime as a parent image
FROM node:18

# Set the working directory in this new stage
WORKDIR /app

COPY package*.json ./

# Install 'serve' to serve the application
RUN npm install -g serve

# Copy the built static files from your host to your image filesystem.
RUN ls
COPY . .

# Expose port 8080 for the container
EXPOSE 8080

# Command to run when the container starts
CMD ["serve", "-s", ".", "-l", "8080"]
