require('dotenv').config();
const mongoose = require('mongoose');

// Import models
const User = require('../src/models/User');
const Blog = require('../src/models/Blog');
const Newsletter = require('../src/models/Newsletter');
const Showcase = require('../src/models/Showcase');

// Firebase data structure (paste your exported Firebase data here)
const firebaseData = {
  blogs: {
    // Paste your blogs data from Firebase here
    // Example:
    // "-NXabc123": {
    //   title: "Blog Title",
    //   text: "<p>Content</p>",
    //   category: "Technology",
    //   thumb: "image_url",
    //   time: "Mon Jan 01 2024",
    //   popular: false
    // }
  },
  contacts: {
    // Paste newsletter emails from Firebase here
    // Example:
    // "-NXdef456": "user@example.com"
  },
  doddle: {
    // Paste showcase data from Firebase here
    // Example:
    // doddle: "image_url",
    // head: "Welcome Heading",
    // tag: "Subtitle"
  },
  users: {
    // Paste users data from Firebase here
    // Example:
    // "-NXghi789": {
    //   name: "John Doe",
    //   mobile: "+919999999999",  // This will be converted to email
    //   previlage: false
    // }
    // Note: Since we're switching to email, you'll need to manually map mobile numbers to emails
    // or update the user data with actual email addresses before migration
  }
};

const migrate = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Clear existing data (optional - comment out if you want to keep existing data)
    console.log('🗑️  Clearing existing data...');
    await User.deleteMany({});
    await Blog.deleteMany({});
    await Newsletter.deleteMany({});
    await Showcase.deleteMany({});
    console.log('✅ Existing data cleared');

    // Migrate Users
    if (firebaseData.users) {
      console.log('👤 Migrating users...');
      const users = Object.values(firebaseData.users);
      for (const user of users) {
        // Skip if no name or mobile/email
        if (!user.name || (!user.mobile && !user.email)) continue;
        
        await User.create({
          name: user.name,
          email: user.email || user.mobile, // Use email if exists, fallback to mobile
          previlage: user.previlage || false,
        });
      }
      console.log(`✅ Migrated ${users.length} users`);
    }

    // Migrate Blogs
    if (firebaseData.blogs) {
      console.log('📝 Migrating blogs...');
      const blogs = Object.values(firebaseData.blogs);
      for (const blog of blogs) {
        if (blog.title && blog.text) {
          await Blog.create({
            title: blog.title,
            text: blog.text,
            category: blog.category,
            thumb: blog.thumb,
            time: blog.time,
            popular: blog.popular || false,
          });
        }
      }
      console.log(`✅ Migrated ${blogs.length} blogs`);
    }

    // Migrate Newsletter Subscribers
    if (firebaseData.contacts) {
      console.log('📧 Migrating newsletter subscribers...');
      const emails = Object.values(firebaseData.contacts);
      for (const email of emails) {
        if (email && email.includes('@')) {
          await Newsletter.create({
            email: email.trim().toLowerCase(),
            isActive: true,
          });
        }
      }
      console.log(`✅ Migrated ${emails.length} subscribers`);
    }

    // Migrate Showcase
    if (firebaseData.doddle && firebaseData.doddle.doddle) {
      console.log('🎨 Migrating showcase...');
      await Showcase.create({
        doddle: firebaseData.doddle.doddle,
        head: firebaseData.doddle.head,
        tag: firebaseData.doddle.tag,
        isActive: true,
      });
      console.log('✅ Migrated showcase');
    }

    console.log('\n🎉 Migration completed successfully!');
    console.log('\n📊 Summary:');
    console.log(`Users: ${await User.countDocuments()}`);
    console.log(`Blogs: ${await Blog.countDocuments()}`);
    console.log(`Newsletter Subscribers: ${await Newsletter.countDocuments()}`);
    console.log(`Showcases: ${await Showcase.countDocuments()}`);

  } catch (error) {
    console.error('❌ Migration failed:', error);
  } finally {
    await mongoose.connection.close();
    console.log('\n🔌 Disconnected from MongoDB');
  }
};

// Run migration
migrate();
