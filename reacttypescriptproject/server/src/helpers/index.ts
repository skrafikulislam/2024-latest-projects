import crypto from "crypto";

const SECRET = "RAFIKUL";

// ? Creating Random Numbers
export const random = () => crypto.randomBytes(128).toString("base64");

// ? Logic to Use in Password
export const authenticationUser = (salt: string, password: string) => {
  return crypto
    .createHmac("sha256", [salt, password].join("/"))
    .update(SECRET)
    .digest("hex");
};
