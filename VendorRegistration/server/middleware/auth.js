import jwt from "jsonwebtoken";

export default function auth(req, res, next) {
  try {
    const token = req.header("x-auth-token");
    if (!token)
      return res
        .status(401)
        .json({ msg: "No authentication token, authorization denied." });
    try {
      const verified = jwt.verify(token, process.env.JWT_SECRET);
      if (!verified)
        return res
          .status(401)
          .json({ msg: "Token verification failed, authorization denied." });
      req.id = verified.id;
      next();
    } catch (error) {
      return res
        .status(401)
        .json({ msg: "Token verification failed, authorization denied." });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
