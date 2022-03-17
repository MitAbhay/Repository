import NextAuth from "next-auth";
import SpotifyProvider from "next-auth/providers/spotify";
import spotifyApi, { LOGIN_URL } from "../../../lib/repo";

async function refreshAccessToken(token) {
  try {
    spotifyApi.setAccessToken(token.acessToken);
    spotifyApi.setRefreshToken(token.refreshToken);

    const { data: refreshedToken } = await spotifyApi.refreshAccessToken();
    console.log("REFRESHED TOKEN IS", refreshedToken);

    return {
      ...token,
      accessToken: refreshedToken.access_token,
      acessTokenExpires: Date.now() + (refreshedToken.expires_in = 1000), // 1 hour as spotifyApI returns 3600 seconds
      refreshToken: refreshedToken.refresh_token ?? token.refreshToken,
    };
  } catch (error) {
    console.error(error);
    return {
      ...token,
      error: "RefreshAcessTokenError",
    };
  }
}

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    SpotifyProvider({
      clientId: process.env.NEXT_PUBLIC_CLIENT_ID,
      clientSecret: process.env.NEXT_PUBLIC_CLIENT_SECRET,
      authentication: LOGIN_URL,
    }),
    // ...add more providers here
  ],
  secret: process.env.JWT_SECRET,
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async jwt({ token, account, user }) {
      // Initial signIn
      if (account && user) {
        return {
          ...token,
          acessToken: account.access_token,
          refreshToken: account.refresh_token,
          username: account.providerAccountId,
          acessTokenExpires: (account.expires_at = 1000), // expiry time in miliseconds
        };
      }
      // return prvious token if token has not expired yet
      if (Date.now() < token.acessTokenExpires) {
        console.log("EXISTING ACESS TOKEN IS STILL VALID");
        return token;
      }

      // if my acess token expires , then we need to refresh it
      console.log("EXISTING ACESS TOKEN IS EXPIRED , REFRESHING IT");
      return await refreshAccessToken(token);
    },

    async session({ session, token }) {
      session.user.accessToken = token.accessToken;
      session.user.refreshToken = token.refreshToken;
      session.user.username = token.username;

      return session;
    },
  },
});
