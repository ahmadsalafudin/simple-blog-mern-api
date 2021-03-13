const { validationResult } = require("express-validator")
const BlogPost = require('../models/blog')
const path = require('path')
const fs = require('fs')

exports.createBlogPost = (req, res, next) => {
    const errors = validationResult(req)
    console.log(errors)
    console.log(req.file)

    if (!errors.isEmpty()) {
        const err = new Error('Input value tidak sesuai');
        err.errorStatus = 400;
        err.data = errors.array()
        throw err;
    }

    if (!req.file) {
        const err = new Error('Img harus di upload');
        err.errorStatus = 422;
        throw err;
    }

    const title  = req.body.title
    const image  = req.file.path
    const body  = req.body.body //content

    const Posting = new BlogPost({
        title: title,
        image: image,
        body: body,
        author: {uid: 1, name: 'Salaph Alghibrany'}
    });
    
    Posting.save()
    .then(result => {
        res.status(201).json({
            message : ' Create Blog Post Succesfully',
            data : result
        })
    })
    .catch(err => {
        console.log(err)
        next(err)
    })
}

exports.getAllBlogPost = (req, res, next) => {
    const currentPage = parseInt(req.query.page) || 1;
    const perPage = parseInt(req.query.perPage) || 5;
    let totalItems;

    BlogPost.find()
    .countDocuments()
    .then(count => {
        totalItems = count
        return BlogPost.find()
        .skip((currentPage - 1) * perPage)
        .limit(perPage)
    })
    .then( result => {
        res.status(200).json({
            message: 'Data berhasil di ambil',
            data : result,
            total_data : totalItems,
            per_page : perPage,
            current_page : currentPage
        })
    })
    .catch(err => {
        console.log(err)
        next(err)
    })
}

exports.getBlogPostById = (req, res, next) => {
    const postId = req.params.postId
    BlogPost.findById(postId)
    .then(result => {
        if(!result){
            const err = new Error('Data idak dapat ditemukan');
            err.errorStatus = 404;
            throw err;
        }

        res.status(200).json({
            message: 'Data dengan ' + postId + ' berhasil di ambil',
            data: result
        })
    })
    .catch(err => {
        next(err)
    })
}

exports.updateBlogPost = (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        const err = new Error('Input value tidak sesuai');
        err.errorStatus = 400;
        err.data = errors.array()
        throw err;
    }

    if (!req.file) {
        const err = new Error('Img harus di upload');
        err.errorStatus = 422;
        throw err;
    }

    const title  = req.body.title
    const image  = req.file.path
    const body  = req.body.body //content
    const postId = req.params.postId;

    BlogPost.findById(postId)
    .then(post => {
        if(!post){
            const err = new Error('Data Blog tidak ditemukan');
            err.errorStatus = 404
            throw err
        }

        post.title = title;
        post.body = body;
        post.image = image;

        return post.save()
    })
    .then(result => {
        res.status(200).json({
            message: 'Blog berhasil di update',
            data: result
        })
    })
    .catch(err => {
        next(err)
    })
    
}

exports.deleteBlogPost = (req, res, next) => {
    const postId = req.params.postId
    BlogPost.findById(postId)
    .then(post => {
        if (!post) {
            const err = new Error('Data blog tidak di temukan');
            err.errorStatus = 404;
            throw err
        }

        removeImage(post.image)
        return BlogPost.findByIdAndRemove(postId)
    })
    .then(result => {
        res.status(200).json({
            message: 'Data blog berhasil di hapus',
            data: {}
        })
    })
    .catch(err => {
        next(err)
    })
}

const removeImage = (filePath) => {
    filePath = path.join(__dirname, '../..', filePath);
    fs.unlink(filePath, err => console.log(err))
}