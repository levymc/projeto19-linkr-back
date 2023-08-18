import Joi from "joi";

export const postSchema = Joi.object({
  text: Joi.string().allow(''),
  hashtags: Joi.string().allow(''),
  postId: Joi.number().integer().required(),
});
