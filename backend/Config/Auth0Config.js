import { auth } from "express-oauth2-jwt-bearer";

const jwtCheck = auth({
  audience: "http://localhost:4000",
  issuerBaseURL: "https://dev-6lyosx3ek7jwoo4s.us.auth0.com",
  tokenSigningAlg: "RS256",
  onVerificationError: (err, req, res, next) => {
    console.error("Token verification error:", err.message);
    next(err);
  },
});

export default jwtCheck;
