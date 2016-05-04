# BlogY - A Lightweight Blogging Engine

This is BlogY (pronounced, blogee), a lightweight blogging engine built upon ExpressJS, Handlebars and Markdown. The aim being to design a very simple engine, with minimal setup. It is as simple as 1.2.3.. :)

## About
BlogY has been inspired from both Ghost and Jekyll. I love Ghost platform, for its simplicity and ability to change configs. And Jekyll, on how easy it is generate a website and create posts/pages. You can say, its a crossover between both blogging platforms. Rather than providing a backend for it, you can change the config file and it will do the job for you (as long as, its under your control).

## Install
```
npm install [-g] blogy --save
```
You might want to install it globally to get access to the CLI api, for creating and deleting posts/pages.
## Setup
To setup,
```
mkdir my-blog
```

```
cd my-blog && blogy setup
```
This will setup a base project with defaults.

There are 3 main folders, while setting up your shiny blogY engine.


1. config
2. templates
3. data

**Config** folder is where your platform configuration resides. If you look at the `index.js` inside the folder, you can see all the default configurations. You can go ahead and change things, as per your requirements. They are pretty self-explainatory :). Some of the configurations that you can set are:

1. Blog Title
2. URL structure for posts
3. Timestamp display
4. Author information, such as avatar/name
5. Template information.

As you can see, 99% of the config goes via this file; which gives you guys full authority to change things and see the results. But please make sure, **"With great powers, comes great responsibility"**. For ex: if you change the url structure for the posts, there will be cases that blogY can't find your posts, unless the file names are updated. But dont worry, we will add a task for this in the future.

**Templates** folder consists of templates, separated in folders. For instance with default setup, you will see a default template folder inside the directory. I am using [PureCSS](http://purecss.io) layout in it. As always, its your decision on choosing which folder and where. But it is always good to follow the same pattern when creating new templates. For instance, a template consists of:

1. Public Folder: Which hosts all your static assets
2. layout.hbs: Your master template/layout
3. page.hbs: Page template
4. post.hbs: Post template
5. home.hbs: The main, with list of posts.
6. 404.hbs: The usual deal :).

And yes, we use handlebars as our templating engine, because its awesome!

Next up, **data** folder. As the name suggests, this guy will store all your posts/pages when created. There is a separate folder for posts and pages, so that its easy to organize. And yes, you can markdown for your posts/pages which makes it even better! Again, this is a structure I follow so that things are organized and well kept.

## Oh yea! CLI!

BlogY also provides, out of the box CLI api for you to create or delete post/page. Again, its _easy peasy, lemon squeasy!_. Lets list down:

Navigate to the folder, where you have setup blogY.

#### Create Post
```
blogy create post --t=<Title goes here>
```
#### Create Page
```
blogy create page --t=<Title goes here>
```

#### Delete Post/Page
The easiest thing to do is, navigate to directory and delete the said post. Or try

```
blogy delete post --f=<Name of the file>
```
For pages, replace `post` with `page`. Easy as that!

## Issues
Please report issues here: https://github.com/jeremyrajan/blogy/issues

## Contributions
If you have any new feature request, please setup a tracker for it or if you want to work on blogY with me, I will be more than happy :). Ping me at jeremyrajan[at]gmail[dot]com
