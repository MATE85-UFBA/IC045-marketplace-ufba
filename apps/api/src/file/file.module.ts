import { Module } from '@nestjs/common';
import { FileController } from '@/file/file.controller';
import { ServeStaticModule } from '@nestjs/serve-static';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: `./uploads`, // Path to your static files
      serveRoot: '/uploads', // URL prefix to access static files
    }),
  ],
  controllers: [FileController],
  providers: [],
  exports: [],
})
export class FileModule {}
