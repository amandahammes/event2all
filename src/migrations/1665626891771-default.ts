import { MigrationInterface, QueryRunner } from "typeorm";

export class default1665626891771 implements MigrationInterface {
    name = 'default1665626891771'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`quotation\` ADD \`contact\` varchar(255) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`quotation\` DROP COLUMN \`contact\``);
    }

}
