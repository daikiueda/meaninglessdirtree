"use strict";

var path = require( "path" ),
    fs = require( "fs" ),
    _ = require( "lodash" ),
    Dealer = require( "./lib/utils/InfiniteDealer.js" );

/**
 * Build meaningless directory structure.
 * @param {String} targetRootDir
 * @param {Integer} dirBandLimit The number of sub-directories for each new directory.
 * @param {Integer} dirLevelLimit The depth of the directory hierarchy.
 * @param {Integer} fileCount The number of files for each new directory.
 * @param {Object} [options]
 *   @param {Array} options.metasyntactics meaningless strings.
 */
function buildMeaninglessDirectoryStructure( targetRootDir, dirBandLimit, dirLevelLimit, fileCount, options ){

    options = options || {};

    var metasyntactics = options.metasyntactics || [ "foo", "bar", "baz", "qux", "norf" ],
        getNameStr,
        getExtensionStr,
        buildOneDirectory;

    getNameStr = ( function(){
        var namesDeck = new Dealer( metasyntactics );
        return function getNameStr( quantity ){
            return namesDeck.serve( quantity ).join( "" );
        };
    } )();

    getExtensionStr = ( function(){
        var extensionsDeck = new Dealer( metasyntactics.slice( 0, 2 ) );
        return function getExtensionStr(){
            return extensionsDeck.serve( 1 ).join( "" );
        };
    } )();

    buildOneDirectory = function( targetDir, level ){
        for( var files = fileCount; files; files-- ){
            var filePath = path.join( targetDir, [ getNameStr( fileCount - files + 1 ), getExtensionStr() ].join( "." ) );
            fs.writeFileSync( filePath, filePath );
        }

        if( level <= dirLevelLimit ){
            for( var dirs = dirBandLimit; dirs; dirs-- ){
                var dirPath = path.join( targetDir, getNameStr( dirBandLimit - dirs + 1 ) );
                fs.mkdirSync( dirPath );
                buildOneDirectory( dirPath, level + 1 );
            }
        }
    };

    void( getExtensionStr( 0 ) ); // foo.foo, it's not cool :P

    buildOneDirectory( targetRootDir, 1 );
}


/**
 * Build meaningless directory structure.
 * @param {String} targetRootDir
 * @param {Integer} dirBandLimit The number of sub-directories for each new directory.
 * @param {Integer} dirLevelLimit The depth of the directory hierarchy.
 * @param {Integer} fileCount The number of files for each new directory.
 * @param {Object} [options]
 *   @param {Array} options.metasyntactics meaningless strings.

 */
module.exports = function meaninglessdirtree(  targetRootDir, dirBandLimit, dirLevelLimit, fileCount, options ){
    var args = [].slice.call( arguments ).slice( 0, 5 ),
        argTypes = args
            .map( function( value ){
                return typeof value !== "object" ? typeof value:
                    Object.prototype.toString.call( value ).slice( 8, -1 ).toLowerCase();
            } ),
        rootDirStats;

    if( ! _.isEqual( _.take( argTypes, 4 ),  [ "string", "number", "number", "number" ] ) ){
        throw new TypeError( "Any arguments is invalid type." );
    }

    buildMeaninglessDirectoryStructure.apply( this, args );
};
