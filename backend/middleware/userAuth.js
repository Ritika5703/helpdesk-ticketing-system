import jwt from "jsonwebtoken";

const userAuth = async (req, res, next) => {
  let token = req.cookies.token;

  // ✅ Fallback to Authorization header if token not in cookies
  if (!token && req.headers.authorization?.startsWith("Bearer ")) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return res
      .status(401)
      .json({ success: false, message: "Not Authorized. Login Again" });
  }

  try {
    const tokenDecode = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = tokenDecode.id;
    next();
  } catch (error) {
    return res.status(401).json({ success: false, message: error.message });
  }
};

export default userAuth;
