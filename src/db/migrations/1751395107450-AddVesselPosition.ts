import { MigrationInterface, QueryRunner } from "typeorm";

export class AddVesselPosition1751395107450 implements MigrationInterface {
    name = 'AddVesselPosition1751395107450'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "vessel_positions" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "ship_name" character varying(20) NOT NULL, "coordinates" geometry(Point,4326) NOT NULL, "true_heading" double precision NOT NULL, "cog" double precision NOT NULL, "sog" double precision NOT NULL, "mmsi" double precision NOT NULL, "timestamp" TIMESTAMP WITH TIME ZONE NOT NULL, CONSTRAINT "PK_614d7d2f2909862c7fcd8e287d8" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_f438bc770390aea28cc16e04d4" ON "vessel_positions" USING GIST ("coordinates") `);
        await queryRunner.query(`CREATE INDEX "IDX_b98838c4bbfe8729f749d47c10" ON "vessel_positions" ("mmsi") `);
        await queryRunner.query(`CREATE INDEX "IDX_dd7bee62cb03ff17dd4eb73b4c" ON "vessel_positions" ("timestamp") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."IDX_dd7bee62cb03ff17dd4eb73b4c"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_b98838c4bbfe8729f749d47c10"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_f438bc770390aea28cc16e04d4"`);
        await queryRunner.query(`DROP TABLE "vessel_positions"`);
    }

}
