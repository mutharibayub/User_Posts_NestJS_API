import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {

    @PrimaryGeneratedColumn({
        type: 'int',
        name: 'id'
    })
    id: number;

    @Column({
        type: 'varchar',
        name: 'name'
    })
    name: string;
    
    @Column({
        type: 'varchar',
        name: 'email',
        unique: true
    })
    email: string;
    
    @Column({
        type: 'varchar',
        name: 'password'
    })
    password: string;
}
