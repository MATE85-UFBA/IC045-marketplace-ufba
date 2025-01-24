import { Injectable } from '@nestjs/common';

@Injectable()
export class FileService {
  constructor() {}

  async getByFileName(text: string) {
    // const keywordList = await this.prismaService.keyword.findMany();
    // return keywordList.filter((keyword) =>
    //   keyword.name.toLowerCase().includes(text.toLowerCase()),
    // );
  }
}
