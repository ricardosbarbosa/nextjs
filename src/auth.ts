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
  // @ts-ignore
  // adapter: Neo4jAdapter(neo4jSession),
  // secret: process.env.AUTH_SECRET,
  providers: [
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
    // {
    //   id: 'sendgrid',
    //   type: 'email',
    //   async sendVerificationRequest({identifier: email, url}) {
    //     // Call the cloud Email provider API for sending emails
    //     // See https://docs.sendgrid.com/api-reference/mail-send/mail-send
    //     const response = await fetch("https://api.sendgrid.com/v3/mail/send", {
    //       // The body format will vary depending on provider, please see their documentation
    //       // for further details.
    //       body: JSON.stringify({
    //         personalizations: [{ to: [{ email }] }],
    //         from: { email: "rbrico@gmail.com" },
    //         subject: "Sign in to Your page",
    //         content: [
    //           {
    //             type: "text/plain",
    //             value: `Please click here to authenticate - ${url}`,
    //           },
    //         ],
    //       }),
    //       headers: {
    //         // Authentication will also vary from provider to provider, please see their docs.
    //         Authorization: `Bearer ${process.env.SENDGRID_API}`,
    //         "Content-Type": "application/json",
    //       },
    //       method: "POST",
    //     })

    //     if (!response.ok) {
    //       const { errors } = await response.json()
    //       throw new Error(JSON.stringify(errors))
    //     }
    //   },
    // }
  ],
  callbacks: {
    authorized({ request, auth }) {
      const { pathname } = request.nextUrl
      // if (pathname === "/") return !!auth
      // return true

      return !!auth
    },
    signIn({ user, account, profile, email, credentials }) {
      console.log("user", user, "account", account, "profile", profile, "email", email, "credentials", credentials)
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

// @ts-ignore
export const { handlers, auth, signIn, signOut } = NextAuth(config)