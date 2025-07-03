import { MigrationInterface, QueryRunner } from 'typeorm'

export class Init1751393696882 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE EXTENSION IF NOT EXISTS postgis;
        `)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP EXTENSION postgis;
        `)
    }
}
