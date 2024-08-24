import { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { ApiResponse, asyncHandler } from '../../common/utils';
import { MessageType } from '../../data';
import { StatusCodes } from 'http-status-codes';

export class AuthController {
  private authService: AuthService;
  constructor() {
    this.authService = new AuthService();
  }

  register = asyncHandler(async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const newUser = await this.authService.register(email, password );
    const response = new ApiResponse({
      messages: [
        { message_en: 'registered successfully', type: MessageType.SUCCESS },
      ],
      statusCode: StatusCodes.CREATED,
      data: { newUser },
    });

    res.status(response.statusCode).json(response);
  });

  login = asyncHandler(async (req: Request, res: Response) => {
    const { password, email } = req.body;
    const { user, token } = await this.authService.login(
      email,
      password,
    );

    const response = new ApiResponse({
      messages: [
        { message_en: 'logged in successfully', type: MessageType.SUCCESS },
      ],
      statusCode: StatusCodes.OK,
      data: { user, token },
    });

    res.status(response.statusCode).json(response);
  });

}
