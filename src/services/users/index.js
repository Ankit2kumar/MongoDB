import express from 'express';
import createError from 'http-errors';

import BlogSchema from './schema.js';

const blogsRouter = express.Router();

blogsRouter.get('/', async (req, res, next) => {
	try {
		const blogs = await BlogSchema.find();
		res.send(blogs);
	} catch (error) {
		console.log(error);
		next(createError(500, 'An Error Occured!'));
	}
});
blogsRouter.get('/:id', async (req, res, next) => {
	try {
		const id = req.params.id;
		const blog = await BlogSchema.findById(id);
		if (blog) {
			res.send(blog);
		} else {
			next(createError(404, `Blog Post ${req.params.id} is not found`));
		}
	} catch (error) {
		console.log(error);
		next(createError(500, 'An error occurred while getting the blog post'));
	}
});
blogsRouter.post('/', async (req, res, next) => {
	try {
		const newBlog = new BlogSchema(req.body);
		const { _id } = await newBlog.save();
		res.status(201).send(_id);
	} catch (error) {
		console.log(error);
		next(createError(400, error));
	}
});
blogsRouter.put('/:id', async (req, res, next) => {
	try {
		const blog = await BlogSchema.findByIdAndUpdate(req.params.id, req.body, {
			runValidators: true,
			new: true,
		});
		if (blog) {
			res.send(blog);
		} else {
			next(createError(404, `Blog Post ${req.params.id} is not found!`));
		}
	} catch (error) {
		console.log(error);
		next(createError(500, 'An error occurred while modifying the blog post!!'));
	}
});
blogsRouter.delete('/:id', async (req, res, next) => {
	try {
		const blog = await BlogSchema.findByIdAndDelete(req.params.id);
		if (blog) {
			res.status(204).send();
		} else {
			next(createError(404, `Blog Post ${req.params.id} is not found!`));
		}
	} catch (error) {
		console.log(error);
		next(createError(500, 'An eror occurred whiöe deleting the blog post'));
	}
});

export default blogsRouter;
