import { Column, Entity, Index, Point, PrimaryGeneratedColumn } from 'typeorm'

@Entity('vessel_positions')
export class VesselPosition {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column('varchar', { length: 20, name: 'ship_name' })
    shipName: string

    @Column('geometry', { name: 'coordinates', spatialFeatureType: 'Point', srid: 4326 })
    @Index()
    coordinates: Point

    @Column('double precision', { name: 'true_heading' })
    trueHeading: number

    @Column('double precision', { name: 'cog' })
    cog: number

    @Column('double precision', { name: 'sog' })
    sog: number

    @Column('double precision', { name: 'mmsi' })
    @Index()
    mmsi: number

    @Column('timestamp with time zone', { name: 'timestamp' })
    @Index()
    timestamp: Date
}
