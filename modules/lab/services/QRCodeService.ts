export interface QRCodeData {
  qrId: string;
  patientId: string;
  token: string;
  createdAt: number;
  expiresAt: number;
}

class QRCodeService {
  private generateRandomToken(length: number = 32): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    const randomValues = new Uint8Array(length);

    if (typeof crypto !== 'undefined' && crypto.getRandomValues) {
      crypto.getRandomValues(randomValues);
      for (let i = 0; i < length; i++) {
        result += chars[randomValues[i] % chars.length];
      }
    } else {
      for (let i = 0; i < length; i++) {
        result += chars[Math.floor(Math.random() * chars.length)];
      }
    }

    return result;
  }

  generateUniqueQRData(patientId: string, patientName: string): QRCodeData {
    const timestamp = Date.now();
    const randomToken = this.generateRandomToken();
    const qrId = `qr_${this.generateRandomToken(16)}`;

    const qrData: QRCodeData = {
      qrId,
      patientId,
      token: randomToken,
      createdAt: timestamp,
      expiresAt: timestamp + (7 * 24 * 60 * 60 * 1000),
    };

    return qrData;
  }

  generateShareableLink(qrData: QRCodeData): string {
    return `https://medicalrecords.app/profile/${qrData.patientId}?qr=${qrData.qrId}&token=${qrData.token}`;
  }

  generateQRCodeImageUrl(qrData: QRCodeData): string {
    const link = this.generateShareableLink(qrData);
    const encodedData = encodeURIComponent(link);

    return `https://api.qrserver.com/v1/create-qr-code/?size=400x400&data=${encodedData}&margin=10&format=png`;
  }

  regenerateQRCode(patientId: string, patientName: string): { qrData: QRCodeData; qrUrl: string; shareLink: string } {
    const qrData = this.generateUniqueQRData(patientId, patientName);
    const qrUrl = this.generateQRCodeImageUrl(qrData);
    const shareLink = this.generateShareableLink(qrData);

    return { qrData, qrUrl, shareLink };
  }
}

export const qrCodeService = new QRCodeService();
