module.exports = function(grunt){

    require('load-grunt-tasks')(grunt);
    grunt.initConfig({ // initializing grunt file
        pkg: grunt.file.readJSON('package.json'), // provide path of packge.json
        autoprefixer:{ // configure auto-prefixer
            options:{
                // options related to task
                browsers:['last 2 versions', 'ie 8', 'ie 9']
            },
            target:{
                files:{'css/styleprefixed.css': 'css/style.css' }
            }
           
        },
        watch:{
            files:['css/style.css'],
            tasks:['autoprefixer']
        },
        copy:{ // copy css file to another destination
            main:{
                files:[
                    {src:'css/style.css', dest: 'css/stylecopied.css'}
                ]
            }
        },
        cssmin:{ // minify css
            target:{
                files:{'styleprefixed.min.css': ['css/styleprefixed.css']}
            }
        },
        uglify: {
            target:{
                files:{
                    'js/output.min.js': ['js/*.js']
                }
            }
        },
        qunit:{
            all:{
                options:{
                    urls:['http://localhost:8000/index.html']
                }
            }
        },
        connect:{
            server:{
                options:{
                    port: 8000,
                    base: 'tests/'
                },
                keepalive: true
            }
        },
        compress:{
            main:{
                options:{
                    archive: 'site.zip'
                },
                files: [
                    {expand:true, src:['css/*.css'], dest:'/'}
                ]
            }
        },
        gitcommit:{
            task:{
                options: {
                    message: 'Testing',
                    noVerify: true,
                    noStatus: false
                }
            },
            files: ['.']
        },
        githooks:{
            all: {
                'pre-commit': 'test'
            }
        },
        rsync:{
            options:{
                exclude:["node-modules", ".git*"]
            }
        }
    });

    // load packges in config file
    // grunt.loadNpmTasks('grunt-autoprefixer'); 
    // grunt.loadNpmTasks('gulp-contrib-watch');
    // grunt.loadNpmTasks('gulp-contrib-cssmin');
    // grunt.loadNpmTasks('gulp-contrib-uglify');

    grunt.registerTask('default', ['autoprefixer','watch', 'connect', 'qunit','cssmin', 'uglify', 'compress', 'gitcommit']);
    
}