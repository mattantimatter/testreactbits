import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { APP_INTERCEPTOR, APP_FILTER } from '@nestjs/core';
import { AdminModule } from './modules/admins/admin.module';
import { AuthModule } from './modules/auth/auth.module';
import { RolesModule } from './modules/roles/roles.module';
import { HelpersModule } from './modules/helpers/helpers.module';
import { SettingsModule } from './modules/settings/settings.module';
import { UsersModule } from './modules/users/users.module';
import { AiChatModule } from './modules/ai-chat/ai-chat.module';
import { ChatSessionsModule } from './modules/chat-sessions/chat-sessions.module';
import { ProjectsModule } from './modules/projects/projects.module';
import { TasksModule } from './modules/tasks/tasks.module';
import { McpModule } from './modules/mcp/mcp.module';
import { I18nModule } from './i18n/i18n.module';
import { ResponseInterceptor } from './common/interceptors/response.interceptor';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { HealthController } from './health.controller';

@Module({
    controllers: [HealthController],
    imports: [
        // Config module
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: '.env',
        }),

        // TypeORM module with Postgres (Supabase), MySQL, or SQLite
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: (configService: ConfigService) => {
                const dbType = configService.get('DB_TYPE', 'postgres');

                // Base configuration shared by both databases
                const baseConfig = {
                    entities: [__dirname + '/**/*.entity{.ts,.js}'],
                    synchronize: configService.get('NODE_ENV') === 'development',
                    logging: false, // Disabled SQL query logging
                };

                // Postgres configuration (Supabase-compatible)
                if (dbType === 'postgres') {
                    const databaseUrl = configService.get<string>('DATABASE_URL');

                    if (databaseUrl) {
                        return {
                            ...baseConfig,
                            type: 'postgres' as const,
                            url: databaseUrl,
                            ssl: configService.get('DB_SSL', 'true') === 'true'
                                ? { rejectUnauthorized: false }
                                : false,
                        };
                    }

                    return {
                        ...baseConfig,
                        type: 'postgres' as const,
                        host: configService.get<string>('DB_HOST'),
                        port: parseInt(configService.get<string>('DB_PORT') || '5432', 10),
                        username: configService.get<string>('DB_USERNAME'),
                        password: configService.get<string>('DB_PASSWORD'),
                        database: configService.get<string>('DB_DATABASE'),
                        ssl: configService.get('DB_SSL', 'true') === 'true'
                            ? { rejectUnauthorized: false }
                            : false,
                    };
                }

                // MySQL configuration
                if (dbType === 'mysql') {
                    return {
                        ...baseConfig,
                        type: 'mysql' as const,
                        host: configService.get<string>('DB_HOST'),
                        port: parseInt(configService.get<string>('DB_PORT') || '3306', 10),
                        username: configService.get<string>('DB_USERNAME'),
                        password: configService.get<string>('DB_PASSWORD'),
                        database: configService.get<string>('DB_DATABASE'),
                    };
                }

                // SQLite configuration
                if (dbType === 'sqlite') {
                    return {
                        ...baseConfig,
                        type: 'better-sqlite3' as const,
                        database: configService.get<string>('SQLITE_DATABASE') || './database.sqlite',
                    };
                }

                // Default to Postgres if invalid DB_TYPE
                return {
                    ...baseConfig,
                    type: 'postgres' as const,
                    host: configService.get<string>('DB_HOST'),
                    port: parseInt(configService.get<string>('DB_PORT') || '5432', 10),
                    username: configService.get<string>('DB_USERNAME'),
                    password: configService.get<string>('DB_PASSWORD'),
                    database: configService.get<string>('DB_DATABASE'),
                    ssl: configService.get('DB_SSL', 'true') === 'true'
                        ? { rejectUnauthorized: false }
                        : false,
                };
            },
            inject: [ConfigService],
        }),

        // I18n module (Global)
        I18nModule,

        // Feature modules
        AuthModule,
        UsersModule,        // Must come before AdminModule - more specific routes first
        AdminModule,
        AiChatModule,        // AI Chat & LLM integration
        ChatSessionsModule,  // Chat history & session management
        RolesModule,
        HelpersModule,
        SettingsModule,
        ProjectsModule,      // Projects management
        TasksModule,         // Task management

        // MCP Module - Exposes tools and resources to AI agents
        McpModule,
    ],
    providers: [
        // Global response interceptor
        {
            provide: APP_INTERCEPTOR,
            useClass: ResponseInterceptor,
        },
        // Global exception filter
        {
            provide: APP_FILTER,
            useClass: HttpExceptionFilter,
        },
    ],
})
export class AppModule { }
