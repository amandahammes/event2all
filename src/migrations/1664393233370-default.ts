import { MigrationInterface, QueryRunner } from "typeorm";

export class default1664393233370 implements MigrationInterface {
    name = 'default1664393233370'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`birth_date\` datetime NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`birth_date\``);
    }

}
