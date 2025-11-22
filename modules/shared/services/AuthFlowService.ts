export type Role = 'patient' | 'doctor' | 'lab';

export interface OtpRequestResponse {
  success: boolean;
  requestId?: string;
  expiresIn?: number;
  message?: string;
}

export interface OtpVerifyResponse {
  success: boolean;
  userExists?: boolean;
  token?: string;
  user?: {
    id: string;
    phone: string;
    role: Role;
  };
  message?: string;
}

export interface RegisterResponse {
  success: boolean;
  token?: string;
  user?: {
    id: string;
    phone: string;
    role: Role;
  };
  message?: string;
}

class AuthFlowService {
  private mockUsers = [
    { phone: '9876543210', role: 'patient' as Role, id: 'user_patient_1' },
    { phone: '9876543211', role: 'doctor' as Role, id: 'user_doctor_1' },
    { phone: '9876543212', role: 'lab' as Role, id: 'user_lab_1' },
  ];

  async requestOtp(phone: string, role: Role): Promise<OtpRequestResponse> {
    await new Promise(resolve => setTimeout(resolve, 1200));

    if (phone.length !== 10 || !/^\d+$/.test(phone)) {
      return {
        success: false,
        message: 'Please enter a valid 10-digit mobile number.',
      };
    }

    return {
      success: true,
      requestId: `req_${role}_${phone}_${Date.now()}`,
      expiresIn: 60,
    };
  }

  async verifyOtp(requestId: string, otp: string, phone: string, role: Role): Promise<OtpVerifyResponse> {
    await new Promise(resolve => setTimeout(resolve, 1000));

    if (otp !== '123456') {
      return {
        success: false,
        message: 'Invalid OTP. Please try again.',
      };
    }

    const existingUser = this.mockUsers.find(u => u.phone === phone && u.role === role);

    if (existingUser) {
      return {
        success: true,
        userExists: true,
        token: `auth_token_${Date.now()}`,
        user: {
          id: existingUser.id,
          phone: existingUser.phone,
          role: existingUser.role,
        },
      };
    }

    return {
      success: true,
      userExists: false,
    };
  }

  async resendOtp(requestId: string): Promise<OtpRequestResponse> {
    await new Promise(resolve => setTimeout(resolve, 800));

    return {
      success: true,
      requestId: `req_resend_${Date.now()}`,
      expiresIn: 60,
    };
  }

  async registerPatient(phone: string, data: { name: string; dob: string; gender: string }): Promise<RegisterResponse> {
    await new Promise(resolve => setTimeout(resolve, 1500));

    const newUser = {
      id: `user_patient_${Date.now()}`,
      phone,
      role: 'patient' as Role,
    };

    return {
      success: true,
      token: `auth_token_${Date.now()}`,
      user: newUser,
    };
  }

  async registerDoctor(phone: string, data: { name: string; specialization: string; registrationNumber: string }): Promise<RegisterResponse> {
    await new Promise(resolve => setTimeout(resolve, 1500));

    const newUser = {
      id: `user_doctor_${Date.now()}`,
      phone,
      role: 'doctor' as Role,
    };

    return {
      success: true,
      token: `auth_token_${Date.now()}`,
      user: newUser,
    };
  }

  async registerLab(phone: string, data: { labName: string; ownerName: string; address: string }): Promise<RegisterResponse> {
    await new Promise(resolve => setTimeout(resolve, 1500));

    const newUser = {
      id: `user_lab_${Date.now()}`,
      phone,
      role: 'lab' as Role,
    };

    return {
      success: true,
      token: `auth_token_${Date.now()}`,
      user: newUser,
    };
  }
}

export const authFlowService = new AuthFlowService();
