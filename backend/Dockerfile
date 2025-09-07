# --- Stage 1: Build the application ---
# Use a Node.js image with the version specified in your project
FROM node:20-alpine AS builder

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to leverage Docker cache
COPY package*.json ./
RUN npm install

# Copy the rest of your application's source code
COPY . .

# Compile TypeScript to JavaScript
RUN npm run build

# --- Stage 2: Create the production image ---
# Use a lightweight Node.js image for the production environment
FROM node:20-alpine

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

# Copy package.json and package-lock.json again for production dependencies
COPY package*.json ./
RUN npm install --omit=dev

# Copy the compiled code and node_modules from the builder stage
COPY --from=builder /usr/src/app/dist ./dist

# Expose the port the app runs on. Render expects port 10000.
EXPOSE 10000

# The command to run your application
CMD [ "node", "dist/index.js" ]
