import { Request, Response } from "express"
import { Equal, Repository } from "typeorm"
import { AppDataSource } from "../data-source"
import { Follow } from "../entities/Follow"
import { User } from "../entities/User"
import ResponseError from "../error/responseError"
import { redisClient } from "../libs/redis"

export default new (class FollowService {
    private readonly followRepository: Repository<Follow> = AppDataSource.getRepository(Follow)

    async get(id: any) {
        const responseFollowing = await AppDataSource.getRepository(User).find({
            where: {
                following: {follower: Equal(id)}
            },
            relations: {
                following: true,
            }
        })

        const followingRedis = responseFollowing.map((val) => {
            return {
                ...val,
                isFollow: true,
            };
        });

        const responseFollower = await AppDataSource.getRepository(User).find({
            where: { follower: { following: Equal(id) } },
            relations: { follower: true }
        })
        
            const followerRedis = await Promise.all(
                responseFollower.map(async (val) => {
                    const isFollow = await this.getFollow(val.id, id);
    
                    return {
                        ...val,
                        isFollow,
                    };
                })
            );

        return {
            message: "Success get data folow!",
            follower: followerRedis,
            following: followingRedis
        }
    }

    async getFollow(following: number, follower: number) {
        const response = await this.followRepository.count({
            where: {
                following: Equal(following),
                follower: Equal(follower)
            }
        })

        if (response != 0) return true
        else return false
    }

    async follow(req: Request, res: Response) {
        const following = req.body.following
        const follower = res.locals.session.id
        // console.log("Following :", following);
        // console.log("Follower :", follower);
        if (follower == following) throw new ResponseError(403, "Can't follow yourself!")

        const checkFollower = await AppDataSource.getRepository(User).find({
            where: {
                id: following
            }
        })
        // console.log("checkFollower :", checkFollower);
        if (!checkFollower[0]) throw new ResponseError(403, "User not found!")

        const isFollow = await this.followRepository.countBy({
            following: Equal(following),
            follower: Equal(follower),
        })
        if (isFollow) throw new ResponseError(400, "You've already follow this user!")
        
        await this.followRepository.save({ following, follower })

        return {
            message: "Follow Success!"
        }
    }

    async unFollow(req: Request, res: Response) {
        const following = req.body.following
        const follower = res.locals.session.id
        // console.log("Following :", following);
        // console.log("Follower :", follower);
        if (follower == following) throw new ResponseError(403, "Can't unfollow yourself!")

        const checkFollower = await AppDataSource.getRepository(User).find({
            where: {
                id: following
            }
        })
        console.log("checkFollower :", checkFollower);
        
        if (!checkFollower[0]) throw new ResponseError(403, "User not found!")

        const isFollow = await this.followRepository.findOne({
            where: {
                following: Equal(following),
                follower: Equal(follower),
            }
        })
        if(!isFollow) throw new ResponseError(400, "You're not follow this user!")
        
        await this.followRepository.delete({ follower, following })

        return {
            message: "Unfollow Success!"
        }
    }
})