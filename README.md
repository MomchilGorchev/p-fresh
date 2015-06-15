# Static Web Development Kit

## Intro

> Static Web Development kit is a series of tools that will help you build amazing static sites. It comes bundled with my favorite grid system (Bootstrap's) and my own file structure but you can change and remove all of this to suit your purposes.
You will be able to see your website while you develop, lint your JS, compile your SASS, minimize your images and much more.

## How to install and use

In order to use this tool you should be familiar with the [Node.js platform](https://nodejs.org/)


1. Clone the repo
  ```
  $ git clone https://github.com/pguimera/static-dev-kit.git
  ```

2. Install all the dependencies
  ```
  $ npm install
  ```

3. Install gulp globally (recommended but optional)
  ```
  $ npm install -g gulp
  ```

4. Run the development mode
  ```
  $ gulp serve
  ```
  This should open a new tab in your default browser, if it doesn't navigate to `http://localhost:3000`.


5. You are ready to develop! Edit the files you want inside the `/app` folder.


If you want to preview your project for production run `$ gulp serve:dist`.

And if you want to optimize, concatenate and minimize everything ready to be released to the wild simply run `$ gulp` and everything should be in the `dist` folder.

## More info

If you want to know more about each individual 'component' I'm using and make your own perfect development tool, you can inspect the npm packages I've used in the `package.json` file. Then simply go to [NPM](https://www.npmjs.com/) and search for the package name.

If you want a more complete version of this tool with material design stuff included you can always use Google [Web Starter Kit](https://github.com/google/web-starter-kit) which this tool is based on.

Also there's a big bunch of community made gulp recipes in [here](https://github.com/gulpjs/gulp/tree/master/docs/recipes)

## License

MIT [Pablo Guimera](https://github.com/pguimera)


