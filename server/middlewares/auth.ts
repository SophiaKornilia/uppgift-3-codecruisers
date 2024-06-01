import { Request, Response, NextFunction } from 'express';

const authenticateUser = (req: Request, res: Response, next: NextFunction) => {
  // Kontrollera om användaren är inloggad
  next();
};

const authenticateAdmin = (req: Request, res: Response, next: NextFunction) => {
  // Kontrollera om användaren är administratör
  next();
};
