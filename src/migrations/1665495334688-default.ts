import { MigrationInterface, QueryRunner } from "typeorm";

export class default1665495334688 implements MigrationInterface {
    name = 'default1665495334688'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`todolist\` (\`id\` int NOT NULL AUTO_INCREMENT, \`content\` varchar(255) NOT NULL, \`done\` tinyint NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`event_id\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`user\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`email\` varchar(255) NOT NULL, \`birth_date\` datetime NOT NULL, \`password\` varchar(255) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), UNIQUE INDEX \`IDX_e12875dfb3b1d92d7d7c5377e2\` (\`email\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`quotation\` (\`id\` int NOT NULL AUTO_INCREMENT, \`description\` varchar(255) NOT NULL, \`provider\` varchar(255) NOT NULL, \`expected_expense\` int NOT NULL, \`actual_expense\` int NOT NULL, \`amount_already_paid\` int NOT NULL, \`createDateColumn\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updateDateColumn\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`event_id\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`guest\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`contact\` varchar(255) NOT NULL, \`invite\` tinyint NOT NULL, \`isConfirmed\` tinyint NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`event_id\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`event\` (\`id\` int NOT NULL AUTO_INCREMENT, \`place\` varchar(255) NOT NULL, \`name\` varchar(255) NOT NULL, \`date\` datetime NOT NULL, \`invite_number\` int NOT NULL, \`event_budget\` int NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`event_user\` (\`event_id\` int NOT NULL, \`user_id\` int NOT NULL, INDEX \`IDX_d786ee07604f4d95725c3b9c55\` (\`event_id\`), INDEX \`IDX_9dfa54101406ff45b9a161d006\` (\`user_id\`), PRIMARY KEY (\`event_id\`, \`user_id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`todolist\` ADD CONSTRAINT \`FK_42c8997f7ea2351181477171600\` FOREIGN KEY (\`event_id\`) REFERENCES \`event\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`quotation\` ADD CONSTRAINT \`FK_2b7cdb365346a3f68f7c6044d68\` FOREIGN KEY (\`event_id\`) REFERENCES \`event\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`guest\` ADD CONSTRAINT \`FK_ae372f09afa964bff363a1058a2\` FOREIGN KEY (\`event_id\`) REFERENCES \`event\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`event_user\` ADD CONSTRAINT \`FK_d786ee07604f4d95725c3b9c558\` FOREIGN KEY (\`event_id\`) REFERENCES \`user\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`event_user\` ADD CONSTRAINT \`FK_9dfa54101406ff45b9a161d006a\` FOREIGN KEY (\`user_id\`) REFERENCES \`event\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`event_user\` DROP FOREIGN KEY \`FK_9dfa54101406ff45b9a161d006a\``);
        await queryRunner.query(`ALTER TABLE \`event_user\` DROP FOREIGN KEY \`FK_d786ee07604f4d95725c3b9c558\``);
        await queryRunner.query(`ALTER TABLE \`guest\` DROP FOREIGN KEY \`FK_ae372f09afa964bff363a1058a2\``);
        await queryRunner.query(`ALTER TABLE \`quotation\` DROP FOREIGN KEY \`FK_2b7cdb365346a3f68f7c6044d68\``);
        await queryRunner.query(`ALTER TABLE \`todolist\` DROP FOREIGN KEY \`FK_42c8997f7ea2351181477171600\``);
        await queryRunner.query(`DROP INDEX \`IDX_9dfa54101406ff45b9a161d006\` ON \`event_user\``);
        await queryRunner.query(`DROP INDEX \`IDX_d786ee07604f4d95725c3b9c55\` ON \`event_user\``);
        await queryRunner.query(`DROP TABLE \`event_user\``);
        await queryRunner.query(`DROP TABLE \`event\``);
        await queryRunner.query(`DROP TABLE \`guest\``);
        await queryRunner.query(`DROP TABLE \`quotation\``);
        await queryRunner.query(`DROP INDEX \`IDX_e12875dfb3b1d92d7d7c5377e2\` ON \`user\``);
        await queryRunner.query(`DROP TABLE \`user\``);
        await queryRunner.query(`DROP TABLE \`todolist\``);
    }

}
