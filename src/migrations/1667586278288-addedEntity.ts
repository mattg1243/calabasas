import { MigrationInterface, QueryRunner } from "typeorm";

export class addedEntity1667586278288 implements MigrationInterface {
    name = 'addedEntity1667586278288'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "beats" ("_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying NOT NULL, "artwork" character varying, "description" character varying, "tempo" integer NOT NULL, "genreTags" character varying array, "otherTags" character varying array, "clipPath" character varying NOT NULL, "wavPath" character varying NOT NULL, "licensed" boolean NOT NULL DEFAULT false, CONSTRAINT "PK_a294f9d90e273452e5a02cc578c" PRIMARY KEY ("_id"))`);
        await queryRunner.query(`CREATE TABLE "credits" ("_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "currentOwner_id" uuid, CONSTRAINT "PK_04986024f0626c715bb1da5a135" PRIMARY KEY ("_id"))`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "credits"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "bio" character varying`);
        await queryRunner.query(`ALTER TABLE "users" ADD "avatar" character varying`);
        await queryRunner.query(`ALTER TABLE "users" ADD "creditsToSpend" integer NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "users" ADD "creditsAcquired" integer NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "users" ADD "totalCreditsAcquired" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ADD "uploadedBeats_id" uuid`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_d404b5f005ecc3a4923dbbc803b" FOREIGN KEY ("uploadedBeats_id") REFERENCES "beats"("_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "credits" ADD CONSTRAINT "FK_aa7fec0ea6d8572ca2811e863b7" FOREIGN KEY ("currentOwner_id") REFERENCES "users"("_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "credits" DROP CONSTRAINT "FK_aa7fec0ea6d8572ca2811e863b7"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_d404b5f005ecc3a4923dbbc803b"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "uploadedBeats_id"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "totalCreditsAcquired"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "creditsAcquired"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "creditsToSpend"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "avatar"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "bio"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "credits" integer NOT NULL DEFAULT '0'`);
        await queryRunner.query(`DROP TABLE "credits"`);
        await queryRunner.query(`DROP TABLE "beats"`);
    }

}
