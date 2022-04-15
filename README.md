# codescanner
 Do you know this problem when you need to search for some specific code piece in your source code? I gotchu!

# Usage
Run `npx codescanner`. Enter `help` for a list of commands.

# .codescannerignore
Create a `.codescannerignore` file in your current directory. Every line in the file includes a string, which makes the code scanner ignore the file, if the filename contains the string. An example file would be:
```
forbidden.txt
some/path
```

**IMPORTANT: Don't include empty lines in your .codescannerignore**