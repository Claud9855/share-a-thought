const fs = require('fs')
const util = require('util')

// Promise version of fs.readFile
const readFromFile = util.promisify(fs.readFile)

module.exports = {
    readFromFile,

    /**
     * Function to write data to the JSON file given a destination and some content
     * @param {object} destination The file you want to write to.
     * @param {string} content The content you want to write to the file
     * @returns {void} Nothing
     */
    writeToFile(destination, content) {
        fs.writeToFile(destination, JSON.stringify(content, null, 4), (err) => err ? console.log(err) : console.log(`\nData Written to${destination}`))
    },

    /**
     * Function to read data from a given file and append some content
     * @param {object} content The content you want to append to the file.
     * @param {string} file The path to the file you want to save to.
     * @returns {void} Nothing
     */
    readAndAppend(content, file) {
        fs.readFile(file, 'utf8', (err, data) => {
            if(err) {
                console.log(err)
            }
            else {
                const parsedData = JSON.parse(data)
                parsedData.push(content)
                this.writeToFile(file, parsedData)
            }

        })
    }

}