(function (global) {
  System.config({
    transpiler: 'typescript',
    typescriptOptions: {
      emitDecoratorMetadata: true
    },
    paths: {
      'npm:': 'https://npmcdn.com/'
    },
    map: {
      '@angular/core': 'npm:@angular/core@2.0.1/bundles/core.umd.js',
      '@angular/common': 'npm:@angular/common@2.0.1/bundles/common.umd.js',
      '@angular/compiler': 'npm:@angular/compiler@2.0.1/bundles/compiler.umd.js',
      '@angular/platform-browser': 'npm:@angular/platform-browser@2.0.1/bundles/platform-browser.umd.js',
      '@angular/platform-browser-dynamic': 'npm:@angular/platform-browser-dynamic@2.0.1/bundles/platform-browser-dynamic.umd.js',
      '@angular/http': 'npm:@angular/http@2.0.1/bundles/http.umd.js',
      '@angular/router': 'npm:@angular/router@3.0.1/bundles/router.umd.js',
      '@angular/forms': 'npm:@angular/forms@2.0.1/bundles/forms.umd.js',
      'rxjs': 'npm:rxjs@5.0.0-beta.12',
      'angular-in-memory-web-api': 'npm:angular-in-memory-web-api',
      'text': 'npm:systemjs-plugin-text'
    },
    meta: {
      '*.html': {
        loader: 'text'
      },
      '*.css': {
        loader: 'text'
      }
    },
    packages: {
      app: {
        defaultExtension: 'ts'
      },
      rxjs: {
        defaultExtension: 'js'
      },
      'angular-in-memory-web-api': {
        main: './index.js',
        defaultExtension: 'js'
      }
    }
  });
})(this);
