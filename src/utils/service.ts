import Jsonwebtoken from "jsonwebtoken";
import slugify from "slugify";

// Json web token
export const generateToken = (email: string, userId: string) => {
  return Jsonwebtoken.sign({ email, id: userId }, process.env.SECRET_KEY, {
    expiresIn: "30d",
  });
};
export const verifyToken = (token: string) => {
  return Jsonwebtoken.verify(token, process.env.SECRET_KEY);
};

// Generate username
export const generateUsername = (text: string) => {
  return (
    slugify(text, {
      replacement: ".",
      trim: true,
      lower: true,
    }) +
    "." +
    (Math.random() * 1000).toFixed(0)
  );
};

// cookie expiry times
export const expireDate = new Date(Date.now() + 1000 * 60 * 60 * 24 * 30); // 30 days
