import { ToDoList } from '../entities/ToDoList';
import { AppDataSource } from "../datasource";

export const listRepository = AppDataSource.getRepository(ToDoList);