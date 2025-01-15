import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class MailService {
  private readonly apiKey = process.env.SENDINBLUE_API_KEY;

  async sendEmail(to: string, subject: string, name: string, resetUrl: string) {
    const url = 'https://api.sendinblue.com/v3/smtp/email';
    const data = {
      sender: { name: 'Coopera UFBA', email: 'ufba-projects@outlook.com' },
      to: [{ email: to }],
      subject,
      templateId: 1,
      params: {
        url: resetUrl,
        name: name,
      },
    };

    try {
      const response = await axios.post(url, data, {
        headers: {
          'api-key': this.apiKey,
          'Content-Type': 'application/json',
        },
      });
      console.log('Email sent:', response.data);
    } catch (error) {
      console.error('Error sending email:', error);
    }
  }

  async sendTextEmail(to: string, subject: string, text: string) {
    const url = 'https://api.sendinblue.com/v3/smtp/email';
    const data = {
      sender: { name: 'Coopera UFBA', email: 'ufba-projects@outlook.com' },
      to: [{ email: to }],
      subject,
      htmlContent: text,
    };

    try {
      await axios.post(url, data, {
        headers: {
          'api-key': this.apiKey,
          'Content-Type': 'application/json',
        },
      });
    } catch (error) {
      console.error('Error sending email:', error);
    }
  }
}
