FROM node:12-alpine AS builder
WORKDIR /app
COPY . .
RUN apk update && apk add python make g++ \
	&& npm install \
	&& npm run build

FROM node:12-alpine
RUN npm install -g serve
WORKDIR /app
COPY --from=builder /app/build .
EXPOSE 3000

CMD ["serve", "-l", "tcp://0.0.0.0:3000", "-s", "."]
