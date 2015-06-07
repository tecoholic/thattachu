# Thattachu

Thattachu is a multi-lingual typing tutor built using [jquery.ime](https://github.com/wikimedia/jquery.ime).
It is a completely static site with all its course files as JSON.

## Requirements

* AngularJS
* Bootstrap
* jquery.ime

## Deployment

### With Bower
The client side dependencies are handled by Bower. You would need the NodeJS, npm and bower.
In your public/html directory
```
git clone https://github.com/tecoholic/thattachu
cd thattachu
bower install
```

### Without Bower
If you are using a shared host and cannot use NodeJS.

* Download the zip file from this page and unzip it in your public_html folder or use `git clone https://github.com/tecoholic/tecoholic`
* Download the zip files of AngularJS, Bootstrap, and jquery.ime and unzip them inside the `thattachu` folder created in the last step
* Update the script and link tags with correct urls in `index.html`

## Tests

* Unit tests are written in Jasmine and run using Karma

```
npm install
npm test
```

* Functional tests are written using CasperJS.
```
npm install casperjs
casperjs test tests/casper/
```

## Course Structure

The file structure to organise courses are as given below

```
thattachu
    |--data
        |--en
            |--courselist.json
            |--course_1.json
            |--course_2.json
        |--ta
            |--courselist.json
            |--demo_1.json
            |--demo_2.json
```

The `data` folder houses all the course files organized according to their languages.
Each language folder has a `courselist.json` which has the metadata of the courses in the directory
and their filenames.

## Creating Course files

To create course files see [Thattachu Asiriyar](https://github.com/tecoholic/thattachu-asiriyar)

