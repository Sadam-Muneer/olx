import { auth } from "express-oauth2-jwt-bearer";

const jwtCheck = auth({
  audience: "https://olx-frontend-opal.vercel.app",
  issuerBaseURL: "https://dev-pcwp2gensj50g46z.us.auth0.com/",
  tokenSigningAlg: "RS256",
  onVerificationError: (err, req, res, next) => {
    console.error("Token verification error:", err.message);
    next(err);
  },
});

export default jwtCheck;
