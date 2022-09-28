import { MigrationInterface, QueryRunner } from "typeorm";

export class default1664393851617 implements MigrationInterface {
    name = 'default1664393851617'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`guest\` ADD \`birth_date\` datetime NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`guest\` DROP COLUMN \`birth_date\``);
    }

}
