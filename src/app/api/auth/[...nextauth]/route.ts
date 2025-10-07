import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import GoogleProvider from "next-auth/providers/google"

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const res = await fetch("http://localhost:5050/users/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: credentials?.email,
            password: credentials?.password,
          }),
        })

        const data = await res.json()

        if (!res.ok || !data?.token) {
          throw new Error(data?.error || "Falha ao autenticar")
        }

        return {
          id: data.user.id,
          name: data.user.name,
          email: data.user.email,
          userName: data.user.userName,
          image: data.user.image,
          token: data.token,
        }
      },
    }),

    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.user = {
          ...user,
          image: user.image,
        }
      }
      return token
    },
    async session({ session, token }) {
      session.user = token.user
      return session
    },
  },

  pages: {
    signIn: "/login",
  },

  secret: process.env.NEXT_AUTH_SECRET,
})

export { handler as GET, handler as POST }
