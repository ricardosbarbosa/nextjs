import NextAuth from "next-auth"
import Google from "next-auth/providers/google"

import type { NextAuthConfig } from "next-auth"
import Email from "next-auth/providers/email"


import neo4j from "neo4j-driver"
import { Neo4jAdapter } from "@auth/neo4j-adapter"

const driver = neo4j.driver(
  process.env.NEO4J_URI || "bolt://localhost:7687",
  neo4j.auth.basic(
    process.env.NEO4J_USERNAME || "neo4j",
    process.env.NEO4J_PASSWORD || "neo4j"
  )
)

const neo4jSession = driver.session()

export const config = {
  theme: {
    logo: "https://next-auth.js.org/img/logo/logo-sm.png",
  },
  // adapter: Neo4jAdapter(neo4jSession),
  providers: [
    // Email({
    //   server: {
    //     host: "smtp.gmail.com",//process.env.SMTP_HOST,
    //     port: 587, //Number(process.env.SMTP_PORT),
    //     auth: {
    //       user: "rbrico@gmail.com",//process.env.SMTP_USER,
    //       pass: "penseemserfeliz"//process.env.SMTP_PASSWORD,
    //     },
    //   },
    //   from: process.env.EMAIL_FROM,
    // }),
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      profile(profile, tokens) {
        // console.log(au"profile", profile, "tokens", tokens)
        return {
          email: profile.email,
          id: profile.sub,
          image: profile.picture,
          name: profile.name,
          ...profile,
          ...tokens
        }
      }
    }),
  ],
  callbacks: {
    authorized({ request, auth }) {
      const { pathname } = request.nextUrl
      if (pathname === "/middleware-example") return !!auth
      return true
    },
    jwt({ token, user }) {
      if (user) {
        return {
          ...token,
          ...user
        }
      }
      return token
    },
    // @ts-ignore
    async session({ session, token }) {
      // console.log("token", token)
      
      return {
        ...session,
        user: {
          ...session.user,
          ...token
        }
      }
    },
  },
} satisfies NextAuthConfig


export const { handlers, auth, signIn, signOut } = NextAuth(config)