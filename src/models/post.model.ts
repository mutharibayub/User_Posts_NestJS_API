import { BelongsTo, BelongsToMany, Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';
import { User } from './user.model';

@Table({
    freezeTableName: true,
    timestamps: false
})
export class Post extends Model {

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
    body: string;
    
    @Column({
        allowNull: false,
        type: DataType.BIGINT
    })
    creation_time: number = Date.now();

    @Column({
        allowNull: false,
        type: DataType.INTEGER
    })
    @ForeignKey(() => User)
    user_id: number;

    @BelongsTo(() => User)
    user: User
}
