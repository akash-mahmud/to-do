import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import { options } from "./options";
const prisma = new PrismaClient();

const handler = NextAuth(options)

export { handler as GET, handler as POST }