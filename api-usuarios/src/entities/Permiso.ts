
// entities/Permiso.ts
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Permiso {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nombre: string;
}