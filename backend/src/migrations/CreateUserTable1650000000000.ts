import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUserTable1650000000000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
    `);
    
    await queryRunner.query(`
      CREATE TABLE "users" (
        "id" UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        "email" VARCHAR UNIQUE NOT NULL,
        "password" VARCHAR NOT NULL,
        "role" VARCHAR(20) NOT NULL DEFAULT 'user' CHECK (role IN ('user', 'admin', 'manager', 'baker')),
        "firstName" VARCHAR NOT NULL,
        "lastName" VARCHAR NOT NULL,
        "phone" VARCHAR,
        "workload" INTEGER DEFAULT 0,
        "isEmailVerified" BOOLEAN DEFAULT false,
        "geoLat" DOUBLE PRECISION,
        "geoLong" DOUBLE PRECISION,
        "address" JSONB,
        "resetPasswordToken" VARCHAR,
        "resetPasswordExpires" TIMESTAMP,
        "isActive" BOOLEAN DEFAULT true,
        "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "users";`);
  }
}
