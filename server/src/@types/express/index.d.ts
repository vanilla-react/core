// @types/express/index.d.ts
import express = require('express'); // Import namespace
<<<<<<< HEAD
import { IGithubDoneResponse, IJwtUser } from 'src/types';
=======
>>>>>>> 4b62e2d91b8fa75adbf2295482d8d667ee514f98

declare module 'express' {
  interface Request {
<<<<<<< HEAD
    user?: IGithubDoneResponse | IJwtUser;
=======
    user?: {
      id: string;
    };
>>>>>>> 4b62e2d91b8fa75adbf2295482d8d667ee514f98
  }
}
