import {  Repository } from "typeorm";
import { User } from "@/data/entities";

export class UserRepository extends Repository<User> {
  // Add specific methods or overrides as needed
}