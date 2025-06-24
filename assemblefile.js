const assemble = require('assemble');
const watch = require('base-watch');
const gulpLoadPlugins = require('gulp-load-plugins');
const handlebarHelpers = require('handlebars-helpers')();
const browserSync = require('browser-sync').create();
const del = require('del');
const extname = require('gulp-extname');
const wiredep = require('wiredep').stream;
const argv = require('minimist')(process.argv.slice(2));
const concat = require('gulp-concat');
const inlinesource = require('gulp-inline-source');
const rename = require('gulp-rename');
const tap = require('gulp-tap');
const path = require('path');
const gulpFile = require('gulp-file');
const fs = require("fs");
const url = require("url");
const pageData = require('assemble-middleware-page-variable');
const minify = require('gulp-minify');
let cleanCSS = require('gulp-clean-css');
require('./app/scripts/main.js');


let configPath = '';
let jsConfigPath = '';
let scssConfigPath = '';
const contentsFolder = './app/contents';

if (['localhost', 'staging', 'production'].indexOf(argv.env) > -1) {
  configPath = './_env/'+ argv.env +'/config.json';
  jsConfigPath = '_env/'+ argv.env +'/data.js';
  scssConfigPath = '_env/'+ argv.env +'/';
} else {
  configPath = './_env/production/config.json';
  jsConfigPath = '_env/production/data.js';
  scssConfigPath = '_env/production/';
}

const config = require(configPath);
const app = assemble();
const $ = gulpLoadPlugins();

app.use(watch());

app.task('styles', () => {
  return app.src(['app/styles/*.scss'])
      .pipe($.plumber())
      // .pipe($.sourcemaps.init())
      .pipe($.sass.sync({
        outputStyle: 'expanded',
        precision: 10,
        includePaths: ['.', scssConfigPath]
      }).on('error', $.sass.logError))
      .pipe($.autoprefixer({browsers: ['> 1%', 'last 2 versions', 'Firefox ESR', 'ie >= 10']}))
      // .pipe($.sourcemaps.write())
      .pipe(cleanCSS({compatibility: 'ie8'}))
      .pipe(app.dest('.tmp/styles'))
      .pipe(app.dest('dist/styles'))
      .pipe(browserSync.stream());
});

app.task('scripts', () => {
  return app.src([jsConfigPath, 'app/scripts/*.js'])
    .pipe($.plumber())
    // .pipe($.sourcemaps.init())
    .pipe($.babel())
    // .pipe($.sourcemaps.write('.'))
    .pipe(minify())
    .pipe(app.dest('.tmp/scripts'))
    .pipe(browserSync.stream());
});

function lint(files, options) {
  return app.src(files)
    .pipe(reload({stream: true, once: true}))
    .pipe($.eslint(options))
    .pipe($.eslint.format())
    .pipe($.if(!browserSync.active, $.eslint.failAfterError()));
}

app.task('lint', () => {
  return lint('app/scripts/*.js', {
    fix: true
  })
  .pipe(app.dest('app/scripts'));
});

app.task('html', ['styles', 'scripts', 'assemble'], () => {
  return app.src('.tmp/**/*.html')
      .pipe($.useref(
        {
          searchPath: ['.tmp', 'app', '.'],
          transformPath: function(filePath) {
            return filePath;
          }
        }
      ))
      // .pipe($.cache($.if('scripts/**/*.js', $.babel({ presets: "minify" }))))
      // .pipe($.cache($.if('*.css', $.cssnano())))
      .pipe($.if('*.html', $.replace(/(src=|href=|url\()(\'|\")(?!http:\/\/|https:\/\/|\/\/)(?!#)(?!mailto|javascript|market|sms|tel|wtai|gtalk|skype|geopoint|whatsapp)(\/)?([^\'\"]*)(\'|\")/g, `$1$2${config.root_path}$4$5`)))
      .pipe($.if('*.html', $.htmlmin({collapseWhitespace: false})))
      .pipe(app.dest('dist'));
});

app.task('json', () => {
  return app.src('.tmp/**/*.json')
      .pipe($.beautify())
      .pipe(app.dest('dist'));
});

app.task('includes', () => {
  return app.src('app/includes/**/*')
      .pipe(app.dest('.tmp/includes'))
      .pipe(app.dest('dist/includes'));
});

app.task('assemble-setup', () => {
  app.partials('app/handlebars/partials/**/*.hbs');
  app.layouts('app/handlebars/layouts/**/*.hbs');
  app.data(configPath);
  app.data('app/contents/data/*.json');
    console.log(require('./app/contents/data/article.json'));


    app.onLoad(/\.hbs$/, pageData(app));

  return app.src('app/contents/*.json')
    .pipe(tap((file) => {
      const fileName = path.basename(file.path);
      const fileJson = require(file.path);
      const templateFile = fileJson.layout.template;
      const htmlFileName = path.parse(path.basename(fileJson.sitemap.loc)).name;

      const contents = fs.readFileSync(`./app/handlebars/pages/${templateFile}`);

      app.page(
        `./${fileJson.sitemap.loc}`,
        Object.assign(
          {
            contents: contents,
            data: {
              content: fileJson.content
            }
          }
        )
      )
    }));
});

app.task('assemble', ['assemble-setup'], () => {

  return app.toStream('pages')
    .pipe(app.renderFile())
    .pipe(app.dest('.tmp'))
    .pipe(browserSync.stream());

});

app.task('images', () => {
  return app.src('app/images/**/*')
      .pipe(app.dest('dist/images'));
});

app.task('downloads', () => {
  return app.src('app/downloads/**/*')
      .pipe(app.dest('dist/downloads'));
});

app.task('fonts', () => {
  return app.src(require('main-bower-files')('**/*.{eot,svg,ttf,woff,woff2,otf}', function (err) {})
      .concat('app/fonts/**/*'))
      .pipe(app.dest('.tmp/fonts'))
      .pipe(app.dest('dist/fonts'));
});

app.task('extras', () => {
  return app.src([
    'app/*.*',
    '!app/*.html'
  ], {
    dot: true
  }).pipe(app.dest('dist'));
});

app.task('clean', del.bind(null, ['.tmp', 'dist']));

function reload() {
  return browserSync.stream();
}

app.task('serve', ['styles', 'scripts', 'assemble', 'includes', 'fonts'], () => {
  var baseHTMLDir = path.resolve(__dirname, ".tmp/");

  browserSync.init({
    // notify: false,
    port: 9000,
    server: {
      baseDir: ['.tmp', 'app'],
      middleware: function(req, res, next) {
        var fileName = url.parse(req.url);
        fileName = fileName.href.split(fileName.search).join("");

        if (/\/$/g.test(fileName)) {
          let exists = fs.existsSync(baseHTMLDir + fileName.replace(/\/$/g, '.html'));

          if (exists) {
            req.url = fileName.replace(/\/$/g, '.html');
          }
        }

        return next();
      },
      serveStaticOptions: {
        extensions: ['html']
      },
      routes: {
        '/node_modules': 'node_modules'
      }
    }
  });

  app.watch([
    'app/images/**/*',
    'app/downloads/**/*',
    '.tmp/includes/**/*'
  ]).on('change', reload);

  app.watch('app/handlebars/**/*.hbs', ['assemble']).on('change', reload);
  app.watch('app/styles/**/*.scss', ['styles', 'assemble']);
  app.watch('app/scripts/**/*.js', ['scripts']);
  app.watch('app/includes/**/*', ['includes']);
  app.watch('app/fonts/**/*', ['fonts']);
});

// inject bower components
app.task('wiredep', () => {
  app.src('app/styles/*.scss')
      .pipe(wiredep({
        ignorePath: /^(\.\.\/)+/
      }))
      .pipe(app.dest('app/styles'));

  app.src('app/handlebars/**/*.hbs')
      .pipe(wiredep({
        exclude: ['bootstrap-sass'],
        ignorePath: /^(\.\.\/)*\.\./
      }))
      .pipe(app.dest('app'));
});

app.task('build', ['html', 'json', 'images', 'downloads', 'includes', 'extras', 'fonts'], () => {
  return app.src('dist/**/*').pipe($.size({
    title: 'build',
    gzip: true
  }));
});

app.task('default', ['clean'], () => {
  app.build('build', (err) => {
    if (err) throw err;
    console.log('done!');
  });
});

// expose your instance of assemble to assemble's CLI
module.exports = app;
