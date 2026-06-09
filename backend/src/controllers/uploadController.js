const { uploadToS3 } = require('../config/storage');
const Media = require('../models/Media');

exports.uploadImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'No file uploaded',
      });
    }

    const { type = 'blog', alt, caption } = req.body;

    const result = await uploadToS3(req.file.buffer, req.file.originalname, type);

    // Save to media library
    const media = await Media.create({
      fileName: result.key.split('/').pop(),
      originalName: req.file.originalname,
      mimeType: req.file.mimetype,
      size: req.file.size,
      url: result.url,
      key: result.key,
      type: 'image',
      folder: type,
      uploadedBy: req.user._id,
      alt: alt || '',
      caption: caption || '',
      isPublic: true,
    });

    res.status(200).json({
      success: true,
      url: result.url,
      key: result.key,
      media: {
        id: media._id,
        url: media.url,
        alt: media.alt,
        size: media.readableSize,
      },
    });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to upload image',
    });
  }
};

// Get media library (Admin)
exports.getMediaLibrary = async (req, res) => {
  try {
    const { limit = 20, page = 1, folder, type } = req.query;
    const skip = (page - 1) * limit;

    const filter = {};
    if (folder) filter.folder = folder;
    if (type) filter.type = type;

    const media = await Media.find(filter)
      .sort({ createdAt: -1 })
      .limit(parseInt(limit))
      .skip(skip)
      .populate('uploadedBy', 'name email');

    const total = await Media.countDocuments(filter);

    res.status(200).json({
      success: true,
      media,
      pagination: {
        total,
        page: parseInt(page),
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('Get media error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch media',
    });
  }
};

// Delete media (Admin)
exports.deleteMedia = async (req, res) => {
  try {
    const { id } = req.params;

    const media = await Media.findById(id);

    if (!media) {
      return res.status(404).json({
        success: false,
        message: 'Media not found',
      });
    }

    // TODO: Delete from S3 as well
    // await deleteFromS3(media.key);

    await media.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Media deleted successfully',
    });
  } catch (error) {
    console.error('Delete media error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete media',
    });
  }
};
