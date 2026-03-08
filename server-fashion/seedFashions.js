const mongoose = require('mongoose');
const Fashion = require('./models/Fashion');

// MongoDB Connection
const MONGODB_URI = 'mongodb://localhost:27017/FashionData';

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log('✅ Connected to MongoDB - FashionData database');
  seedDatabase();
})
.catch((err) => {
  console.error('❌ MongoDB connection error:', err);
  process.exit(1);
});

// Sample Fashion Data
const fashionData = [
  // Casual Style (5 items)
  {
    title: 'Denim Jacket with White Tee',
    details: '<h2>Classic Casual Look</h2><p>A timeless denim jacket paired with a crisp white t-shirt creates the perfect casual outfit. This versatile combination works for various occasions from weekend outings to casual Fridays at work.</p><ul><li>100% cotton denim</li><li>Comfortable fit</li><li>Easy to style</li></ul>',
    thumbnail: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500',
    style: 'Casual'
  },
  {
    title: 'Relaxed Fit Joggers & Sneakers',
    details: '<h2>Comfort Meets Style</h2><p>These relaxed-fit joggers combined with trendy sneakers offer maximum comfort without sacrificing style. Perfect for running errands or casual meetups.</p><p><strong>Features:</strong></p><ul><li>Elastic waistband</li><li>Breathable fabric</li><li>Multiple color options</li></ul>',
    thumbnail: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=500',
    style: 'Casual'
  },
  {
    title: 'Weekend Chino Pants Look',
    details: '<h2>Smart Casual Perfection</h2><p>Chino pants are the cornerstone of smart casual dressing. Pair them with a polo shirt or casual button-down for an effortlessly polished look.</p><p>Ideal for:</p><ul><li>Brunch dates</li><li>Casual office days</li><li>Weekend shopping</li></ul>',
    thumbnail: 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=500',
    style: 'Casual'
  },
  {
    title: 'Cozy Sweater & Jeans',
    details: '<h2>Fall Essential</h2><p>Nothing says casual comfort like a soft sweater paired with your favorite jeans. This outfit is perfect for cooler weather and creates a relaxed, approachable vibe.</p><p><em>Style tip: Roll up your sleeves for a more laid-back look!</em></p>',
    thumbnail: 'https://images.unsplash.com/photo-1601762603339-fd61e28b698a?w=500',
    style: 'Casual'
  },
  {
    title: 'Casual Summer Polo Outfit',
    details: '<h2>Beat the Heat in Style</h2><p>A breathable polo shirt with light-colored shorts creates the perfect summer casual outfit. Stay cool and stylish during warm weather activities.</p><ul><li>Moisture-wicking fabric</li><li>UV protection</li><li>Multiple color choices</li></ul>',
    thumbnail: 'https://images.unsplash.com/photo-1622445275463-afa2ab738c34?w=500',
    style: 'Casual'
  },
  
  // Streetwear Style (4 items)
  {
    title: 'Oversized Hoodie Supreme',
    details: '<h2>Street Culture Icon</h2><p>The oversized hoodie is a streetwear staple that combines comfort with urban style. Perfect for making a bold statement while staying cozy.</p><h3>Key Features:</h3><ul><li>Premium cotton blend</li><li>Bold graphic prints</li><li>Relaxed, oversized fit</li><li>Kangaroo pocket</li></ul>',
    thumbnail: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=500',
    style: 'Streetwear'
  },
  {
    title: 'Vintage Band Tee & Cargo Pants',
    details: '<h2>90s Revival</h2><p>Combine a vintage band t-shirt with utility cargo pants for an authentic streetwear look. This outfit pays homage to 90s hip-hop culture while remaining contemporary.</p><p><strong>Styling tips:</strong></p><ul><li>Pair with chunky sneakers</li><li>Add a chain accessory</li><li>Layer with a flannel shirt</li></ul>',
    thumbnail: 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=500',
    style: 'Streetwear'
  },
  {
    title: 'Bomber Jacket Street Look',
    details: '<h2>Urban Edge</h2><p>The bomber jacket is essential for any streetwear wardrobe. Its versatility allows you to dress it up or down while maintaining that urban edge.</p><p>Perfect combinations:</p><ul><li>With slim-fit jeans</li><li>Over a graphic tee</li><li>Paired with high-top sneakers</li></ul>',
    thumbnail: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=500',
    style: 'Streetwear'
  },
  {
    title: 'Skater Style Complete Set',
    details: '<h2>Authentic Skate Culture</h2><p>Channel authentic skate culture with this complete set featuring wide-leg pants, a graphic tee, and skate shoes. Perfect for both skating and everyday wear.</p><h3>Includes:</h3><ul><li>Baggy fit pants</li><li>Premium skate shoes</li><li>Branded accessories</li></ul>',
    thumbnail: 'https://images.unsplash.com/photo-1525562723836-dca67a71d5f1?w=500',
    style: 'Streetwear'
  },
  
  // Formal Style (4 items)
  {
    title: 'Classic Navy Blue Suit',
    details: '<h2>Timeless Elegance</h2><p>A well-tailored navy blue suit is the foundation of any professional wardrobe. This versatile piece works for interviews, important meetings, and formal events.</p><h3>Specifications:</h3><ul><li>Italian wool blend</li><li>Slim-fit cut</li><li>Two-button closure</li><li>Fully lined</li></ul><p><em>Includes matching vest for three-piece option.</em></p>',
    thumbnail: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=500',
    style: 'Formal'
  },
  {
    title: 'Charcoal Grey Business Attire',
    details: '<h2>Corporate Excellence</h2><p>The charcoal grey suit exudes professionalism and sophistication. Paired with a crisp white shirt and silk tie, this outfit commands respect in any business setting.</p><p><strong>Perfect for:</strong></p><ul><li>Board meetings</li><li>Client presentations</li><li>Corporate events</li><li>Job interviews</li></ul>',
    thumbnail: 'https://images.unsplash.com/photo-1594938291221-94f18cbb5660?w=500',
    style: 'Formal'
  },
  {
    title: 'Black Tie Evening Wear',
    details: '<h2>Red Carpet Ready</h2><p>This impeccable black tuxedo is designed for the most formal occasions. Complete with satin lapels, bow tie, and cummerbund.</p><h3>Premium Details:</h3><ul><li>Super 120s wool</li><li>Peak lapels</li><li>Satin trim</li><li>Custom tailoring available</li></ul><p>Make an unforgettable impression at galas, weddings, and formal dinners.</p>',
    thumbnail: 'https://images.unsplash.com/photo-1617127365659-c47fa864d8bc?w=500',
    style: 'Formal'
  },
  {
    title: 'Modern Business Casual',
    details: '<h2>Contemporary Professional</h2><p>Bridge the gap between formal and casual with this modern business casual outfit. A blazer paired with tailored chinos offers flexibility for today\'s dynamic workplace.</p><p>Key components:</p><ul><li>Unstructured blazer</li><li>Premium chino pants</li><li>Dress shirt (no tie)</li><li>Leather loafers</li></ul>',
    thumbnail: 'https://images.unsplash.com/photo-1598808503491-c8ba0f67e7b9?w=500',
    style: 'Formal'
  }
];

async function seedDatabase() {
  try {
    // Clear existing data
    await Fashion.deleteMany({});
    console.log('🗑️  Cleared existing fashion data');
    
    // Insert new data
    const fashions = await Fashion.insertMany(fashionData);
    console.log(`✅ Successfully inserted ${fashions.length} fashion items`);
    
    // Display summary
    const styles = await Fashion.aggregate([
      {
        $group: {
          _id: '$style',
          count: { $sum: 1 }
        }
      }
    ]);
    
    console.log('\n📊 Fashion Database Summary:');
    styles.forEach(s => {
      console.log(`   - ${s._id}: ${s.count} items`);
    });
    
    console.log('\n✨ Database seeding completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
}
