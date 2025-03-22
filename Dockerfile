# Building stage
FROM node:18-alpine AS builder
WORKDIR /app

COPY package*.json ./
COPY tsconfig.json ./
COPY next.config.* ./
COPY prisma ./prisma/
COPY tailwind.config.ts ./
COPY postcss.config.mjs ./

RUN npm ci

COPY . .

RUN npx tsc --noEmit

RUN npm run build

# Production stage

FROM node:18-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production

RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/package-lock.json ./package-lock.json
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/next.config.ts ./next.config.ts
COPY --from=builder /app/prisma ./prisma

RUN chown -R nextjs:nodejs /app

USER nextjs

EXPOSE 3000

ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

CMD ["npm", "start"]
