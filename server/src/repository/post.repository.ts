import { Post } from "../schemas/Post.schema";
import { EntityRepository, Repository } from "typeorm";

@EntityRepository(Post)
export class PostRepository extends Repository<Post> {}
