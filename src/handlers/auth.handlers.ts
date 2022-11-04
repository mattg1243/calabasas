import { Request, Response, NextFunction, CookieOptions } from 'express';
import { CreateUserInput, LoginUserInput } from '../database/schemas/User.schema';
import { createUser, findUserByEmail } from '../database/services/User.services';
import User from '../database/models/User.entity';
import AppError from '../utils/AppError';
import { signTokens } from '../database/services/User.services';
import { verifyJwt, signJwt } from '../utils/jwt';
import { findUserById } from '../database/services/User.services';
// cookie stuff
const cookieOptions: CookieOptions = {
  httpOnly: true,
  sameSite: 'lax',
};

if (process.env.NODE_ENV === 'production') cookieOptions.secure = true;

const accessTokenCookieOptions: CookieOptions = {
  ...cookieOptions,
  expires: new Date(Date.now() + 50 * 60 * 1000),
  maxAge: 50 * 60 * 1000,
};

const refreshTokenCookieOptions: CookieOptions = {
  ...cookieOptions,
  expires: new Date(Date.now() + 500 * 60 * 1000),
  maxAge: 500 * 60 * 1000,
};

// handler class
export default class AuthHandlers {
  // save a user to the db
  public static registerUser = async (req: Request<{}, {}, CreateUserInput>, res: Response, next: NextFunction) => {
    try {
      // unpack req body
      const { username, password, email, acctType } = req.body;
      // create user entity
      const user = await createUser({
        email: email.toLowerCase(),
        username,
        password,
        acctType,
      });
      // send the created user
      console.log(` ---  user registered: ${username}  ---`);
      res.status(201).json({
        status: 'success',
        user,
      });
      //catch err
    } catch (err: any) {
      if (err.code === '23505') {
        return res.status(409).json({
          status: 'fail',
          message: 'User with that email already exists',
        });
      }
      next(err);
    }
  };

  public static loginUser = async (req: Request<{}, {}, LoginUserInput>, res: Response, next: NextFunction) => {
    console.log(req.body);
    try {
      // unpack request body
      const { email, password } = req.body;
      // query for the user
      const user = await findUserByEmail(email);
      // invalid credentials
      if (!user) {
        return next(new AppError(401, 'No user found'));
      }
      if (!(await User.comparePasswords(password, user.password))) {
        return next(new AppError(401, 'Invalid password'));
      }
      // return signed tokens
      const { accessToken, refreshToken } = await signTokens(user);
      // add cookies
      res.cookie('accessToken', accessToken, accessTokenCookieOptions);
      res.cookie('refreshToken', refreshToken, refreshTokenCookieOptions);
      res.cookie('loggedIn', true, {
        ...accessTokenCookieOptions,
        httpOnly: false,
      });
      // send response
      res.status(200).json({ status: 'success', user: `${user._id}` });
      console.log(`  ---  user logged in: ${user.username}  ---`);
    } catch (err: any) {
      return res.status(401).json({
        status: 'InvalidLogin',
        message: err.message,
      });
    }
  };

  public static refreshToken = async (req: Request<{}, {}, { _id: string }>, res: Response, next: NextFunction) => {
    try {
      const { _id } = req.body;

      const token = req.cookies.refreshToken;
      const message = 'Could not refresh access token';

      if (!token) {
        return next(new AppError(403, message));
      }

      const decoded = verifyJwt<{ sub: string }>(token, 'refreshTokenPublicKey');
      if (!decoded) {
        return next(new AppError(403, message));
      }
      // check for a valid session
      // redis stuff
      // Sign new access token
      const user = await findUserById(_id);
      const accessToken = signJwt({ sub: _id }, 'ACCESS_PRIVATE_KEY', {
        expiresIn: `120m`,
      });
      // set cookies
      res.cookie('accessToken', accessToken, accessTokenCookieOptions);
      res.cookie('loggedIn', true, {
        ...accessTokenCookieOptions,
        httpOnly: false,
      });
      // send response
      console.log(`  ---  token refreshed: ${_id}  ---`);
      res.status(200).json({
        status: 'success',
        accessToken,
      });
    } catch (err) {
      next(err);
    }
  };

  public static logoutUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = res.locals.user;

      res.cookie('accessToken', '', accessTokenCookieOptions);
      res.cookie('loggedIn', false, {
        ...accessTokenCookieOptions,
        httpOnly: false,
      });
      console.log(`  ---  user logged out: ${user.username}  ---`);
      res.status(200).json({
        status: 'success',
      });
    } catch (err: any) {
      next(err);
    }
  };

  public static getMe = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = res.locals.user;

      res.status(200).status(200).json({
        status: 'success',
        data: {
          user,
        },
      });
    } catch (err: any) {
      next(err);
    }
  };
}
