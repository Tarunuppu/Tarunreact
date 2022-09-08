FROM node:16-alpine AS development
ENV NODE_ENV development
# Add a work directory
WORKDIR /app
# Cache and Install dependencies
COPY package.json .
COPY package-lock.json .
COPY cert.crt .
RUN npm config set cafile ./cert.crt
RUN npm install
#RUN npm install @reduxjs/toolkit react-redux
# Copy app files
COPY . .
# Expose port
EXPOSE 3000
# Start the app
CMD [ "npm", "start" ]