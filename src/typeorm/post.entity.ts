import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Post {

    @PrimaryGeneratedColumn({
        type: 'int',
        name: 'id'
    })
    id: number;
    
    @Column({
        type: 'longtext',
        name: 'body'
    })
    body: string;
    
    @Column({
        type: 'bigint',
        name: 'creation_time'
    })
    creation_time: number = Date.now();

    @Column({
        type: 'int',
        name: 'user_id'
    })
    user_id: number;

    @ManyToOne(() => User, (User) => User.id, { cascade: true })
    @JoinColumn({ name: 'user_id' })
    user: User;
}
