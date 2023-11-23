import { Column, HasMany, Model, Table, DataType } from 'sequelize-typescript';
import { Post } from './post.model';

@Table({
    freezeTableName: true,
    timestamps: false
})
export class User extends Model {

    @Column({
        allowNull: false,
        autoIncrement: true,
        primaryKey:true,
        type: DataType.INTEGER
    })
    id: number;

    @Column({
        allowNull: false,
        type: DataType.STRING
    })
    name: string;
    
    @Column({
        allowNull: false,
        type: DataType.STRING,
        unique: true
    })
    @Column
    email: string;
    
    @Column({
        allowNull: false,
        type: DataType.STRING
    })
    @Column
    password: string;

    @HasMany(() => Post)
    posts: Post[];
}
