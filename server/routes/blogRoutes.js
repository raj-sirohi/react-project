const mongoose = require('mongoose');
const Blog = mongoose.model('Blog');
const {authenticate} = require('../middlewares/authenticate');
const ErrorDTO = require('../dto/ErrorDTO');

const _ = require('lodash');

module.exports=app=>{

    app.post('/api/blogs', authenticate, (req, res) => {
        var body = _.pick(req.body, ['title', 'subject', 'body']);
        var blog = new Blog({ _user: req.user._id, 'createDate': Date.now(), ...body });
        blog.save()
            .then((blog) => {
                res.status(200).send({ 'blog': blog });
            })
            .catch(error => {
                const errorDTO = new ErrorDTO(ErrorDTO.ERROR_TYPES.SYSTEM, 'Cannot create blog', 'blogRoutes-post blog',error)
                console.log('blog post error', error);
                res.status(500).send(errorDTO)
            })
    });

    app.put('/api/blogs/:id', authenticate,async function (req, res) {

        const id = req.params.id;

        let body = _.pick(req.body, ['title', 'subject','body']);
        let blog = {_user: req.user._id,updateDate:Date.now(), ...body};

        try {
            const updatedBlog = await Blog.findByIdAndUpdate(
                id,
                {$set: blog},
                {new: true}
            );

            res.status(200).send({'blog':updatedBlog})
        } catch (e) {
            console.log('Error', e);
            return res.status(422).send({

                error: {errorType:'system',error: e, errorMessage: 'cannot update blog'}
            });
        }
    })


}