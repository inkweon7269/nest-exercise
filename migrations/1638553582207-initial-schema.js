const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class initialSchema1638553582207 {
    name = 'initialSchema1638553582207'

    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "contact" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "phone" character varying, "userId" uuid NOT NULL, CONSTRAINT "REL_e7e34fa8e409e9146f4729fd0c" UNIQUE ("userId"), CONSTRAINT "PK_2cbbe00f59ab6b3bb5b8d19f989" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "club" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, CONSTRAINT "PK_79282481e036a6e0b180afa38aa" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "email" character varying NOT NULL, "password" character varying NOT NULL, "username" character varying NOT NULL, "createAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "board" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying NOT NULL, "description" character varying NOT NULL, "createAt" TIMESTAMP NOT NULL DEFAULT now(), "userId" uuid, CONSTRAINT "PK_865a0f2e22c140d261b1df80eb1" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user_club" ("userId" uuid NOT NULL, "clubId" uuid NOT NULL, CONSTRAINT "PK_5c2b2a6c65c1a826eee4bccf4b0" PRIMARY KEY ("userId", "clubId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_bbd870a86349a44a70cf8364de" ON "user_club" ("userId") `);
        await queryRunner.query(`CREATE INDEX "IDX_cdb22098ad875e1d2bf1d85556" ON "user_club" ("clubId") `);
        await queryRunner.query(`ALTER TABLE "contact" ADD CONSTRAINT "FK_e7e34fa8e409e9146f4729fd0cb" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "board" ADD CONSTRAINT "FK_c9951f13af7909d37c0e2aec484" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_club" ADD CONSTRAINT "FK_bbd870a86349a44a70cf8364de6" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "user_club" ADD CONSTRAINT "FK_cdb22098ad875e1d2bf1d85556e" FOREIGN KEY ("clubId") REFERENCES "club"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "user_club" DROP CONSTRAINT "FK_cdb22098ad875e1d2bf1d85556e"`);
        await queryRunner.query(`ALTER TABLE "user_club" DROP CONSTRAINT "FK_bbd870a86349a44a70cf8364de6"`);
        await queryRunner.query(`ALTER TABLE "board" DROP CONSTRAINT "FK_c9951f13af7909d37c0e2aec484"`);
        await queryRunner.query(`ALTER TABLE "contact" DROP CONSTRAINT "FK_e7e34fa8e409e9146f4729fd0cb"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_cdb22098ad875e1d2bf1d85556"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_bbd870a86349a44a70cf8364de"`);
        await queryRunner.query(`DROP TABLE "user_club"`);
        await queryRunner.query(`DROP TABLE "board"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "club"`);
        await queryRunner.query(`DROP TABLE "contact"`);
    }
}
