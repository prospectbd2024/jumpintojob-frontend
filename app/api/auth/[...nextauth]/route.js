import NextAuth from 'next-auth';
import { Google,Facebook } from 'lib/CustomAuthProviders'; 
import axios from 'axios';
const googleSettings={
  clientId: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
}
const facebookSettings ={
  clientId: process.env.FACEBOOK_CLIENT_ID,
  clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
}
export const authOptions = {
 providers: [
  Google('google_job_seeker',{
    ...googleSettings,
    userType: 'job_seeker'
  }),
  Google('google_employer',{
    ...googleSettings,
    userType: 'employer'
  }), 
  Facebook("facebook_job_seeker",{
    ...facebookSettings,
    userType: 'job_seeker'
  }),
  Facebook("facebook_employer",{
    ...facebookSettings,
    userType: 'employer'
  }),
 ],
 session: {
  strategy: 'jwt',
 },
 callbacks: {
  async signIn({ user, account, profile,email, credentials}) {
    try {


      // Customize validation logic based on your requirements
      if (!profile.name || !profile.email) {
        throw new Error('Missing required profile information.');
      }

      // Add 'provider': 'google' only if necessary
      // Consider alternative methods for storing sensitive information
      const userInfo = { user: user, profile:profile,account : account ,user_type : 'job_seeker'};
      // console.log(userInfo);
      if (userInfo) {
        const {data} = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth/social-signin`, {
          userInfo: userInfo,
          nextSecret : process.env.NEXTAUTH_SECRET
        }, {
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          }
        });

        // console.log(response.data); // Log response for debugging
        // console.log(data)
        if(data.data.result==true){
          // setUserData(data)
          return '/?'+createQueryString('userData',JSON.stringify(data))
        }


        return '/sign?'+createQueryString('error',data.data.message)

        // Handle successful sign-in based on your application logic (e.g., redirect, display message)
      }

      return true; // Assuming successful sign-in by default
    } catch (error) {
      console.error('Sign-in error:', error);
    }
  },
},

};
const createQueryString =(name, value) => {
  const params = new URLSearchParams();
  params.set(name, value);

  return params.toString();
};
const handler =  NextAuth(authOptions)
export {handler as GET,handler as POST};