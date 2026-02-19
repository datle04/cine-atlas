// src/lib/db.ts
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '@prisma/client';

const connectionString = `${process.env.DATABASE_URL}`;

// 1. Tạo connection pool từ driver 'pg'
const pool = new Pool({ connectionString });

// 2. Tạo adapter Prisma
const adapter = new PrismaPg(pool);

// 3. Khởi tạo PrismaClient với adapter
const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

export const prisma = globalForPrisma.prisma || new PrismaClient({ adapter });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;