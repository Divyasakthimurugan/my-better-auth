import { betterAuth } from "better-auth";
import { magicLink } from "better-auth/plugins";
import { nextCookies } from "better-auth/next-js";
import { sendMagicLinkEmail } from "./email";

export const auth = betterAuth({
  secret: process.env.BETTER_AUTH_SECRET!,
  baseURL: process.env.BETTER_AUTH_URL!,

  plugins: [
    magicLink({
      async sendMagicLink({ email, url, token }) {
        console.log("📧 Sending magic link to:", email);

        await sendMagicLinkEmail({
          email,
          url,
          token,
        });
      },
    }),
    nextCookies(),
  ],
});
