export interface OtpRequestResponse {
  success: boolean;
  requestId?: string;
  expiresIn?: number;
  message?: string;
}

export interface OtpVerifyResponse {
  success: boolean;
  token?: string;
  user?: {
    id: string;
    phone: string;
    role: 'patient' | 'doctor' | 'lab';
  };
  message?: string;
}

class MockAuthService {
  async requestOtp(phone: string, countryCode: string, role: 'patient' | 'doctor' | 'lab'): Promise<OtpRequestResponse> {
    await new Promise(resolve => setTimeout(resolve, 1500));

    if (phone.length !== 10 || !/^\d+$/.test(phone)) {
      return {
        success: false,
        message: 'Please enter a valid 10-digit mobile number.',
      };
    }

    return {
      success: true,
      requestId: `req_otp_${Date.now()}`,
      expiresIn: 60,
    };
  }

  async verifyOtp(requestId: string, otp: string): Promise<OtpVerifyResponse> {
    await new Promise(resolve => setTimeout(resolve, 1200));

    if (otp === '123456') {
      return {
        success: true,
        token: `auth_token_${Date.now()}`,
        user: {
          id: `user_${Date.now()}`,
          phone: '9876543210',
          role: 'patient',
        },
      };
    }

    return {
      success: false,
      message: 'Invalid OTP. Please try again.',
    };
  }

  async resendOtp(requestId: string): Promise<OtpRequestResponse> {
    await new Promise(resolve => setTimeout(resolve, 1000));

    return {
      success: true,
      requestId: `req_otp_${Date.now()}`,
      expiresIn: 60,
    };
  }
}

export const authService = new MockAuthService();
