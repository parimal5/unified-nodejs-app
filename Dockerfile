FROM node:22-alpine

WORKDIR /app

# Copy dependency manifests first
COPY package*.json ./

# Install production dependencies only
RUN npm ci --omit=dev

# Copy application source
COPY src/ ./src/

# Application configuration
ENV PORT=3000

EXPOSE 3000

CMD ["npm", "start"]
