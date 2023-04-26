My Personal Website
-------------------

Built and setup through github pages, [this setup is described here](https://medium.com/zendesk-engineering/how-to-create-a-website-like-freshswift-net-using-hugo-travis-ci-and-github-pages-67be6f480298)

I mainly went this route because I've been avoiding ruby (and thus Jekyll) for as long as possible.  I may pick it up in the future, but for the moment, I've not found a good reason to explicitly use it.

As this is a static site, I've elected to use one of the many static site generators out there.  Also, as the site will already include javascript, I might as well double down and use a NodeJS static site generator.

One of the most famous and flexible generators at the time of this writing was "Metal Smith" so thats what I will be using.

Requirements
------------

The following are a list of requirments to build/manage this project:

 * [Node Version Manager (nvm)](https://github.com/creationix/nvm)

Setup
-----

This project's environment can be setup through asdf+npm, run the following commands:

```bash
asdf install
npm install
```
