import Joi from "joi";

export const postSchema = Joi.object({
  text: Joi.string().required(),
  hashtags: Joi.string().required(),
  postId: Joi.number().integer().required(),
});
