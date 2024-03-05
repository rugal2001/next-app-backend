import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

// Define a custom interface that extends the default Request interface
interface AuthenticatedRequest extends Request {
  user?: { userId: string }; // Define the structure of the user object
}

// Middleware function to authenticate requests
export const authenticateUser = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  // Extract the JWT token from the Authorization header
  const token = req.headers["authorization"]?.split(' ')[1];
  
  console.log("this is backend token ==> " ,token)
  console.log("Request headers: ", req.headers);

  if (!token) {
    return res
      .status(401)
      .json({ message: "Unauthorized: No token provided" } as Record<
        string,
        any
      >);
  }

  // Verify the token
  jwt.verify(token, "123456", (err: any, decoded: any) => {
    if (err) {
      return res
        .status(401)
        .json({ message: "Unauthorized: Invalid token" } as Record<
          string,
          any
        >);
    }
    // If token is valid, attach the decoded user information to the request object
    req.user = decoded;
    next();
  });
};
