# Use an official Node runtime as a parent image
FROM node:18

# Copy package.json and package-lock.json to the working directory
COPY package.json package-lock.json ./

# Install dependencies, including 'devDependencies' which are needed for the build
RUN npm install

# Copy the rest of your app's source code from your host to your image filesystem.
COPY . .

# Build the application
RUN npm run build
# Set the working directory in this new stage
WORKDIR /app

# Install 'serve' to serve the application
RUN npm install -g serve

# Copy the built static files from the 'builder' stage to the new stage
COPY --from=builder /app/dist /app/dist

# Expose port 8080 for the container
EXPOSE 8080

# Command to run when the container starts
CMD ["serve", "-s", "dist", "-l", "8080"]
