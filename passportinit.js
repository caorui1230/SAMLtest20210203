const passport = require("passport");
const KeycloakStrategy = require("@exlinc/keycloak-passport");
const SamlStrategy = require("passport-saml").Strategy;
const fs = require("fs");

const decryptionPvk = fs.readFileSync('./descyptionPvk.pem' , "utf-8");
console.log(decryptionPvk);

passport.use(
    "Keycloak",
    new KeycloakStrategy(
      {
        host: "http://localhost:8080/",
        realm: "ieice",
        clientID: "samltest",
        clientSecret: "32ac049b-bc73-4288-b129-be6a502bd0d6",
        callbackURL: "/auth/samltest/callback",
        authorizationURL: "http://localhost:8080/auth/realms/ieice/protocol/openid-connect/auth",
        tokenURL: "http://localhost:8080/auth/realms/ieice/protocol/openid-connect/token",
        userInfoURL: "http://localhost:8080/auth/realms/ieice/protocol/openid-connect/userinfo"
      },
      (accessToken, refreshToken, profile, done) => {
        // This is called after a successful authentication has been completed
        // Here's a sample of what you can then do, i.e., write the user to your DB
        console.log(profile);
      }
    )
  );

passport.use(
  new SamlStrategy({
    callbackUrl: "https://dev-eventin-api.vcube.net/users/auth/saml/ieice/callback",
    entryPoint: "http://54.249.206.19:8080/auth/realms/dev-eventin/protocol/saml/",
    issuer: "https://dev-eventin-api.vcube.net",
    identifierFormat: "urn:oasis:names:tc:SAML:2.0:nameid-format:persistent",
    signatureAlgorithm: "sha256",
    privateCert: fs.readFileSync('./descyptionPvk.pem' , "utf-8"),
    //decryptionCert: "MIIEpAIBAAKCAQEAitej26uSXpN8pGcgSctBNYyU9XmRCzgVq1xKnCXivlzCbEGIlIvgmKKNXFpKCVPg3D7h4Zj6z3WyXKfHc3xSevzk97r+rTTUQUapCVx4w7XblE1v8lDH7ZXugU3voXFP96Rl96BF6QZGWZZT7qKuRoWep3wLbt3ED98Y2oTBszImUs3iSzvSIdxYDgBxn09gMHjNTipWkL1qmWqZUCzDZr5gWWTYOGAXdyXFQWIszGStTmZEhc98SV3mdFKAu1cshnvXOXJoOKkzGdLWg2sm9SYqAcxatXWajplAmeujlJNQREQJbCmJx75EMYhvXFlPtAJWif9j0mj2AjDrLyI0RQIDAQABAoIBAEMi5r7wBcTpuFme7EQCnrOQGO9iKzqrkf7cj89VmoDGRdUnEy4RPTdRUt2XYzmDb7XQSlVWLeFnXinjj1ROh2ulIeqQZ1nFs+Ukj9RQ/KxWIalikIExgptl5oBr+TWtnyd2PUAyJdv6BsaHJGq+C1tafU8rcjPX1FiAXno7u5Y0MTpMTocLBLHFqNneTupMF9kP/kktW0ibKRDOW2I60TvOMLyjy6+GKB4dG2veKvBci0HpQ+1jamDshlZEBKU+TsaTP6STKVZzfAhNukXTuWvRfTpLBRXmA3fwbHipRyNvawOVNh4ib0w7Tc+kQLRft2q5BYK3iOpc4wttfyEIjcECgYEAxiFJiCf4GDB92BttMLXYjE2LjYUxgvzfD5wFM1rzpX0EMO42cO3ElVLjCkbRemeW7vlO43cfUwDoLCE42eD+3StgYShp0/wbaIf1VSeGtM48OF1TsxIyO/1GdiwpmG5iDX5+B/KI/QauSwdBxU6z6xyfURI6//peZoKvJf91er0CgYEAs2VBAUxe0qwOCQoW+Ke3FLq252ZCMIKcHcoKCBmW/ZQqwmuMboj5DrehaUy5dAZ8cmzm3MdYpK8L5Hh3pJz1anF3urNqiWYNpmnIapkX4M/KYbz2bBPRFVSfzjd9glzDv5LUhEiWcL/gy8H4E4B3jv+oTHIOMinX4eCq9wI2fCkCgYEAskuCQGS3fg0lMjR8Ljl2hcvCqbgSti2ZDhL5Gx3d5C58dwvnMfjFzxqn9beFCwHtcWAo/clVBvzp8cxzvJ4cvCsssEIN+hYFFCxFOjw3nL16s75Ic/0L97AUmINlaybqVfpesAgx/oDkl+AP797DSfCX7fzZ20ETcmxn8WnR7oECgYAiAA3K9jN+kDd0xSHHbNoJJr4lqz7ePNLj3nf6QwdX9i4IfSO3i2RQwsLn1y/K6rPJaBR1QZ7uT3LckWxzmX/19Z1wmDKX6eyqXqAqe+uHozpDPfIiV7sn5MsI5YF3JKfA9k4q6CsDIYq0c4XWBGIkixXVr0Q7g6yz1cXxXM0AyQKBgQC+94LzAvXx+2t8f8aWcLSLCsEtrxaiIleHZ7lNpP3etGT/HtWPDQVjY7oPm87tHBCVSbQK+/aG9w8gQuG0FY6t72wwHThZiZ8l4jYMfmlleiEAbnzrodN9XYM3WUYt3WwA9VzSOLF7u7MAOuKXT84E2bbsHieOXuB1BSiLMM8tMA==",
    cert: "MIICpTCCAY0CBgF3OQLM9TANBgkqhkiG9w0BAQsFADAWMRQwEgYDVQQDDAtkZXYtZXZlbnRpbjAeFw0yMTAxMjUxMDA1MjBaFw0zMTAxMjUxMDA3MDBaMBYxFDASBgNVBAMMC2Rldi1ldmVudGluMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAhJqkOWZLz03hm3wlFakWBqvGWso4r5oQlKG2R6Aa1IH7qP1q6rgNaedhfCe/kOI4YJTCZzJPFMAP4XL0ivVPuUX25z71UnWq4wQ9cgcmRSvmqHaqaN1SABOdZUNBOsdHps7b5R4zjgxYxbYWIRJ4S/ayv7biMkzi/PwPyGKShy1djw6jeduti+eRs3x8mo6+VTOM69BKozaro0yfF0WxO5To8kr/2aH+DQEMZfe8F0dDuHlA1PXqqN8rIvAVXFrRFDEtAVT4Y6ar0F8znMNGOgceflFbKODwjnpLvT89bv2whw7m4JYcPSPDWtdL6ws+I+zAcvBhJjb9q5TwtjR+HwIDAQABMA0GCSqGSIb3DQEBCwUAA4IBAQBdZzk1c4ogvUSzNPAhaoPZro0OjLSuXP2qLVH4nJXih4v8kieKIEUDNr01Ymonr3T+mqtx23NeBmbbj5JR8s2Sh7WoFnigB5yu+XtT0B0ki5wUxcHBfReRR9GBXcKvVeaZ51TMTEvSRtKOXjR+8g5BzQT9rwHYeetL5IrTY+wZCI4o+r1HeFv6g8zypqxLdoQL8LP1e+1uD98I0JgWSuQnp+bj5RDqiXYUkPD46CAy3mbBQcCAAsZChqPqiSp3oIDBzUo0V1zVxfyAFt1jiu9jMDWBZkPdEbkHInHu79WeY1TVsISQHYu3owLRPn3QZzkTNTJ4H1Zo9wbcCnKhdmI7"
  },function(profile, done){
    var user = profile;
    console.log(user);
    console.log(user.username);
    console.log(user.keycloakId);
    return done(null, user);
  })
);

exports.passportKeycloak = passport.authenticate("Keycloak", { session: false });
exports.passportSaml = passport.authenticate("saml", { failureRedirect: "/failure"});

