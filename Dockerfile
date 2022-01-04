FROM denoland/deno:debian

COPY . .

WORKDIR src/

CMD ["deno", "run", "main/server.ts"]