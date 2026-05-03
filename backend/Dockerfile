FROM node:20

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# Prisma client
RUN npx prisma generate

EXPOSE 3000

CMD ["sh", "-c", "npx prisma migrate deploy && npx prisma db seed && npm run dev"]