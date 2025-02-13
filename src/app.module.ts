import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import config from './config/config';
import { UserModule } from './user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            cache: true,
            load: [config]
        }),
        JwtModule.registerAsync({
            imports: [ConfigModule],
            useFactory: async (config) => ({
                secret: config.get('jwt.secret'),
            }),
            global: true,
            inject: [ConfigService],
        }),
        MongooseModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: async (config) => ({
                uri: config.get('database.connectionString'),
            }),
            inject: [ConfigService],
        }),
        UserModule,
        AuthModule,
    ],
})
export class AppModule { }
