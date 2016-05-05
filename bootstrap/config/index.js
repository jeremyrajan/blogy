const path = require('path');
module.exports = {
  title: 'My BlogY', // This is title for your blog
  template: { // all the template configurations are here
    dir: path.join(process.cwd(), 'templates', 'default'), // The path to your template
    public: path.join(process.cwd(), 'templates', 'default', 'public'), // The path to your static files, css/js/images
    layout: 'layout' // Name of your master template/ layout file.
  },
  post: { // All the post configuration goes here
    dir: `${process.cwd()}/data/posts`, // The directory where your posts will be saved. Better to be specific/different folder
    timestamp: 'YYYY-MM-DD-hh:mm:ss', // this is used to create post URL.
    displayDate: 'DD-MM-YYYY hh:mm', // What should the date format when displayed.
    limit: 5, // The number of posts on the home page
    excerpt: 600 // excerpt, substring basically.
  },
  page: { // Page configurations
    dir: `${process.cwd()}/data/pages` // The directory where your pages will be saved.
  },
  data: { // Data directory, which will host both posts/pages or any other information.
    dir: `${process.cwd()}/data`
  },
  connection: {
    port: 3000 // Connection port.
  },
  author: {
    name: 'Your Name', // Replace it with your name
    avatar: '/img/nodejs-logo.png' // Replace it with your avatar, Default references to once inside the template.
  }
};
