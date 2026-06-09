const Blog = require('../models/Blog');
const Newsletter = require('../models/Newsletter');
const { sendBulkEmails } = require('../config/email');
const { getNewsletterTemplate } = require('../utils/emailTemplates');

exports.getAllBlogs = async (req, res) => {
  try {
    const { limit = 20, page = 1, category } = req.query;
    const skip = (page - 1) * limit;
    const filter = { status: 'published' };
    
    if (category) filter.category = category;

    const blogs = await Blog.find(filter)
      .sort({ createdAt: -1 })
      .limit(parseInt(limit))
      .skip(skip)
      .populate('author', 'name email');

    const total = await Blog.countDocuments(filter);

    res.json({
      success: true,
      blogs,
      pagination: { total, page: parseInt(page), pages: Math.ceil(total / limit) }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch blogs' });
  }
};

exports.getBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.identifier).populate('author', 'name email');
    
    if (!blog) {
      return res.status(404).json({ success: false, message: 'Blog not found' });
    }

    blog.views += 1;
    await blog.save();

    res.json({ success: true, blog });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch blog' });
  }
};

exports.getFeaturedBlogs = async (req, res) => {
  try {
    const { limit = 3 } = req.query;
    const blogs = await Blog.find({ status: 'published' })
      .sort({ likes: -1, views: -1 })
      .limit(parseInt(limit))
      .populate('author', 'name email');

    res.json({ success: true, blogs });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch featured blogs' });
  }
};

exports.getPopularBlogs = async (req, res) => {
  try {
    const { limit = 5 } = req.query;
    const blogs = await Blog.find({ status: 'published' })
      .sort({ views: -1 })
      .limit(parseInt(limit))
      .populate('author', 'name email');

    res.json({ success: true, blogs });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch popular blogs' });
  }
};

exports.createBlog = async (req, res) => {
  try {
    const { title, content, category, coverImage, status = 'published' } = req.body;

    const blog = await Blog.create({
      title,
      content,
      category,
      coverImage,
      author: req.user._id,
      status
    });

    await blog.populate('author', 'name email');

    if (status === 'published') {
      const subscribers = await Newsletter.find({ isActive: true });
      if (subscribers.length > 0) {
        const emails = subscribers.map(sub => sub.email);
        const blogLink = `${process.env.FRONTEND_URL}/blog?b=${blog._id}`;
        const html = getNewsletterTemplate(title, category, blogLink);
        sendBulkEmails(emails, `New Blog: ${title}`, html).catch(err => console.error(err));
      }
    }

    res.status(201).json({ success: true, blog });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.updateBlog = async (req, res) => {
  try {
    const blog = await Blog.findByIdAndUpdate(
      req.params.identifier,
      req.body,
      { new: true, runValidators: true }
    ).populate('author', 'name email');

    if (!blog) {
      return res.status(404).json({ success: false, message: 'Blog not found' });
    }

    res.json({ success: true, blog });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findByIdAndDelete(req.params.identifier);
    
    if (!blog) {
      return res.status(404).json({ success: false, message: 'Blog not found' });
    }

    res.json({ success: true, message: 'Blog deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to delete blog' });
  }
};

exports.likeBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.identifier);
    
    if (!blog) {
      return res.status(404).json({ success: false, message: 'Blog not found' });
    }

    blog.likes += 1;
    await blog.save();

    res.json({ success: true, likes: blog.likes });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to like blog' });
  }
};
