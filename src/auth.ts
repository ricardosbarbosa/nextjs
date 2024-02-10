import NextAuth from "next-auth"
import Google from "next-auth/providers/google"

import type { NextAuthConfig } from "next-auth"

export const config = {
  theme: {
    logo: "https://next-auth.js.org/img/logo/logo-sm.png",
  },
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      profile(profile, tokens) {
        console.log("profile", profile, "tokens", tokens)
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
    async session({ session, token }) {
      console.log("token", token)
      
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