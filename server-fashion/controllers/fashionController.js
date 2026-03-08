const Fashion = require('../models/Fashion');

// Get all fashions (sorted by createdAt descending)
exports.getAllFashions = async (req, res) => {
  try {
    const fashions = await Fashion.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: fashions.length,
      data: fashions
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching fashions',
      error: error.message
    });
  }
};

// Get fashions by style
exports.getFashionsByStyle = async (req, res) => {
  try {
    const { style } = req.params;
    const fashions = await Fashion.find({ style }).sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: fashions.length,
      data: fashions
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching fashions by style',
      error: error.message
    });
  }
};

// Get fashion by ID
exports.getFashionById = async (req, res) => {
  try {
    const { id } = req.params;
    const fashion = await Fashion.findById(id);
    
    if (!fashion) {
      return res.status(404).json({
        success: false,
        message: 'Fashion not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: fashion
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching fashion',
      error: error.message
    });
  }
};

// Create new fashion
exports.createFashion = async (req, res) => {
  try {
    const { title, details, thumbnail, style } = req.body;
    
    const fashion = await Fashion.create({
      title,
      details,
      thumbnail,
      style,
      createdAt: new Date()
    });
    
    res.status(201).json({
      success: true,
      message: 'Fashion created successfully',
      data: fashion
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error creating fashion',
      error: error.message
    });
  }
};

// Update fashion
exports.updateFashion = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, details, thumbnail, style } = req.body;
    
    const fashion = await Fashion.findByIdAndUpdate(
      id,
      { title, details, thumbnail, style },
      { new: true, runValidators: true }
    );
    
    if (!fashion) {
      return res.status(404).json({
        success: false,
        message: 'Fashion not found'
      });
    }
    
    res.status(200).json({
      success: true,
      message: 'Fashion updated successfully',
      data: fashion
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error updating fashion',
      error: error.message
    });
  }
};

// Delete fashion
exports.deleteFashion = async (req, res) => {
  try {
    const { id } = req.params;
    const fashion = await Fashion.findByIdAndDelete(id);
    
    if (!fashion) {
      return res.status(404).json({
        success: false,
        message: 'Fashion not found'
      });
    }
    
    res.status(200).json({
      success: true,
      message: 'Fashion deleted successfully',
      data: fashion
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting fashion',
      error: error.message
    });
  }
};
