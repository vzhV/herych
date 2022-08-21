import {Author} from "./Author";

export interface Comment{
  id: number;
  title: string;
  content: string;
  author: Author;
  date: Date;
}
