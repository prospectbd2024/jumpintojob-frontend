import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import FacebookProvider from "next-auth/providers/facebook";
import axios from 'axios';
export const authOptions = {
 providers: [
  GoogleProvider({
   clientId: process.env.GOOGLE_CLIENT_ID,
   clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  }),
  FacebookProvider({
    clientId: process.env.FACEBOOK_CLIENT_ID,
    clientSecret: process.env.FACEBOOK_CLIENT_SECRET
  })
 ],
 session: {
  strategy: 'jwt',
 },
 callbacks: {
  async signInCustom({ user, account, profile, email, credentials }) {
    try {
      // console.log(profile); // Log for debugging
      console.log(
        {profile}
      );

      // Customize validation logic based on your requirements
      if (!profile.name || !profile.email) {
        throw new Error('Missing required profile information.');
      }

      // Add 'provider': 'google' only if necessary
      // Consider alternative methods for storing sensitive information
      const modifiedProfile = { ...profile,provider : account.provider };

      if (user) {
        const {data} = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth/social-signup`, {
          profile: modifiedProfile
        }, {
          headers: {
            'Content-Type': 'application/json'
          }
        });

        // console.log(response.data); // Log response for debugging
        console.log(data)
        if(data.data.result==true){
          return '/signin?'+ createQueryString('msg','Please login with your social account!');
        }


        return '/register?'+createQueryString('error',data.data.message)

        // Handle successful sign-in based on your application logic (e.g., redirect, display message)
      }

      return true; // Assuming successful sign-in by default
    } catch (error) {
      console.error('Sign-in error:', error);
      // Display an error message to the user or handle gracefully based on the error type
      return '/register?'+createQueryString('error','Server is not responding Please try again later')
    }
  }
}

};
const createQueryString =(name, value) => {
  const params = new URLSearchParams();
  params.set(name, value);

  return params.toString();
};
const handler =  NextAuth(authOptions)
export {handler as GET,handler as POST};