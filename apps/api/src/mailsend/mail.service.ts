import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class MailService {
  private apiKey = process.env.SENDINBLUE_API_KEY;

  async sendEmail(to: string, subject: string, text: string) {
    const url = 'https://api.sendinblue.com/v3/smtp/email';
    const data = {
      sender: { name: 'Coopera UFBA', email: 'ufba-projects@outlook.com' },
      to: [{ email: to }],
      subject,
      textContent: text,
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
}
