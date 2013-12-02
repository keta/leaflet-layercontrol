/*global module, grunt */
module.exports = function (grunt) {
    "use strict";

    grunt.util.linefeed = "\n"; // fixes CRLF issue on Windows systems

    grunt.initConfig({
        "pkg": grunt.file.readJSON("package.json"),

        "uglify": {
            "options": {
                "preserveComments": false,
                "banner": "/* <%= pkg.name %> <%= pkg.version %> (<%= pkg.repository.url %>) */\n"
            },
            "default": {
                "files": {
                    "dist/<%= pkg.name %>.min.js" : [ "<%= pkg.name %>.js" ]
                }
            }
        }
    });

    grunt.loadNpmTasks("grunt-contrib-uglify");

    grunt.registerTask("default", [ "build" ]);
    grunt.registerTask("build", [ "uglify" ]);
};
