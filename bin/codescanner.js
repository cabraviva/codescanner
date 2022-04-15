#! /usr/bin/env node
console.log('Welcome to codescanner!')
console.log('Enter a command (try "help"):')

function randomFromArray(arr) {
  return arr[Math.floor(Math.random() * arr.length)]
}

const os = require('os')
const fs = require('fs')
const path = require('path')

const username = os.userInfo().username

function coolname () {
    return randomFromArray([
        'Superstar',
        'My Lord',
        'Rockstar',
        'Nerd',
        'Freak',
        'Champion',
        username,
        'xxSuperCoolDev64xx',
        'Franklin',
        'FrankDrebin0815',
        'Commander',
        'Commander'
    ])
}

function readdirSyncRecursive (dir) {
    var results = []
    var list = fs.readdirSync(dir)
    list.forEach(function(file) {
        file = path.join(dir, file)
        var stat = fs.statSync(file)
        if (stat && stat.isDirectory()) {
            results = results.concat(readdirSyncRecursive(file))
        } else {
            results.push(file)
        }
    })
    return results
}

const ignoreFileEndings = [
    '.mp4',
    '.mp3',
    '.jpg',
    '.jpeg',
    '.png',
    '.gif',
    '.ico',
    '.webp',
    '.ttf',
    '.exe',
    '.zip',
    '.rar',
    '.7z',
    '.pdf',
    '.doc',
    '.docx',
    '.xls',
    '.xlsx',
    '.ppt',
    '.pptx',
    '.tar'
]

const _sessionname = coolname()

function scandDir (regex) {
    const files = readdirSyncRecursive(process.cwd())
    console.log('------------------------------------------------------------------------------------------------------------------------')
    files.forEach(file => {
        // Don't scan ignored files
        if (ignoreFileEndings.some(ending => file.endsWith(ending))) {
            return
        }

        try {
            const filecontent = fs.readFileSync(file, 'utf8').toString('utf8')
            const _matches = [...filecontent.matchAll(regex)]

            for (const match of _matches) {
                // Get line number
                const line = filecontent.substring(0, match.index).split('\n').length

                console.log(`${_sessionname}, I found a match in ${file} at line ${line}!`)
                console.log('------------------------------------------------------------------------------------------------------------------------')
            }
        } catch (e) {
            console.log(`${_sessionname}, we have a problem! Seems like ${file} is too large to scan!`)
        }
    })
}

function scandDirMy (regex) {
    const files = readdirSyncRecursive(process.cwd())
    console.log('------------------------------------------------------------------------------------------------------------------------')
    files.forEach(file => {
        // Don't scan ignored files
        if (ignoreFileEndings.some(ending => file.endsWith(ending))) {
            return
        }

        // Don't scan node_modules
        if (file.includes('node_modules')) {
            return
        }

        try {
            const filecontent = fs.readFileSync(file, 'utf8').toString('utf8')
            const _matches = [...filecontent.matchAll(regex)]

            for (const match of _matches) {
                // Get line number
                const line = filecontent.substring(0, match.index).split('\n').length

                console.log(`${_sessionname}, I found a match in ${file} at line ${line}!`)
                console.log('------------------------------------------------------------------------------------------------------------------------')
            }
        } catch (e) {
            console.log(`${_sessionname}, we have a problem! Seems like ${file} is too large to scan!`)
        }
    })
}

const rl = require('readline-sync')
let cmd = ''
while (cmd !== 'exit') {
    cmd = rl.question('> ')
    
    if (cmd === 'exit') {
        console.log()
        console.log(`Goodbye ${_sessionname}!`)
    } else if (cmd === 'help') {
        console.log()
        console.log('Available commands:')
        console.log('  help - show this help menu')
        console.log('  exit - exit the program')
        console.log('  scan <RegEx> - scan the current directory for code that matches the RegEx')
        console.log('  iscan <RegEx> - scan the current directory for code that matches the RegEx without case sensitivity')
        console.log('  scanmy <RegEx> - scan the current directory for code that matches the RegEx, but ignore everything which includes node_modules')
        console.log()
        console.log('Example:')
        console.log('  scan (.*?); // scan for any code that ends with a semicolon')
        console.log('  scan Hello World // scan for the string "Hello World"')
    } else if (cmd.startsWith('scanmy')) {
        const args = cmd.split(' ')
        args.shift()
        const argsf = args.join(' ')
        const regex = new RegExp(argsf, 'g')
        scandDirMy(regex)
    } else if (cmd.startsWith('scan')) {
        const args = cmd.split(' ')
        args.shift()
        const argsf = args.join(' ')
        const regex = new RegExp(argsf, 'g')
        scandDir(regex)
    } else if (cmd.startsWith('iscan')) {
        const args = cmd.split(' ')
        args.shift()
        const argsf = args.join(' ')
        const regex = new RegExp(argsf, 'gi')
        scandDir(regex)
    } else {
        console.log('Unknown command: ' + cmd)
        console.log('Type "help" for a list of available commands.')
    }
}
