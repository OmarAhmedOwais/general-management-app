import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
  } from 'typeorm';
  import { IsNotEmpty } from 'class-validator';
  
  @Entity()
  export class Resource {
    @PrimaryGeneratedColumn()
    id!: number;
  
    @Column()
    @IsNotEmpty()
    name!: string;
  
    @Column({ nullable: true })
    description?: string;
  
    @Column({ default: 'active' })
    status!: string;
  
    @CreateDateColumn()
    createdAt!: Date;
  
    @UpdateDateColumn()
    updatedAt!: Date;
  }
  