import { MigrationInterface, QueryRunner } from 'typeorm';

export class r0121677057380274 implements MigrationInterface {
  name = 'r0121677057380274';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`room\` CHANGE \`price\` \`price\` int(12) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`room\` CHANGE \`order\` \`order\` int(3) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`event\` MODIFY COLUMN \`label\` varchar(200) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`event\` CHANGE \`order\` \`order\` int(3) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`bonus_malus\` MODIFY COLUMN \`label\` varchar(200) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`character\` CHANGE \`order\` \`order\` int(3) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`resource\` CHANGE \`order\` \`order\` int(3) NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`resource\` CHANGE \`order\` \`order\` int NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`character\` CHANGE \`order\` \`order\` int NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`bonus_malus\` MODIFY COLUMN \`label\` varchar(30) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`event\` CHANGE \`order\` \`order\` int NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`event\` MODIFY COLUMN \`label\` varchar(30) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`room\` CHANGE \`order\` \`order\` int NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`room\` CHANGE \`price\` \`price\` int NOT NULL`,
    );
  }
}
