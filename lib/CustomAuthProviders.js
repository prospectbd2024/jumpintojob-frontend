export const Google =(options,name)=> {
    return {
    id: 'google',
    name: "Google",
    type: "oauth",
    wellKnown: "https://accounts.google.com/.well-known/openid-configuration",
    authorization: { params: { scope: "openid email profile" } },
    idToken: true,
    checks: ["pkce", "state"],
    profile(profile) {
      return {
        id: profile.sub,
        name: profile.name,
        email: profile.email,
        image: profile.picture,
        userType : options.userType
        
      }
    },
    style: { logo: "/google.svg", bg: "#fff", text: "#000" },
    options,
  }}

export const Facebook =(options,name)=>{
    return {
        id: name,
        name: "Facebook",
        type: "oauth",
        authorization: "https://www.facebook.com/v11.0/dialog/oauth?scope=email",
        token: "https://graph.facebook.com/oauth/access_token",
        userinfo: {
          url: "https://graph.facebook.com/me",
          // https://developers.facebook.com/docs/graph-api/reference/user/#fields
          params: { fields: "id,name,email,picture" },
          async request({ tokens, client, provider }) {
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            return await client.userinfo(tokens.access_token, {
              // @ts-expect-error
              params: provider.userinfo?.params,
            })
          },
        },
        profile(profile) {
          return {
            id: profile.id,
            name: profile.name,
            email: profile.email,
            image: profile.picture.data.url,
            userType : options.userType
          }
        },
        style: { logo: "/facebook.svg", bg: "#006aff", text: "#fff" },
        options,
      }
}