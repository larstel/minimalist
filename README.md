# minimalist

## buildConfig.json (mandatory)

### available configs (currently all mandatory):

| config            | example            | description                             |
| ----------------- | ------------------ | --------------------------------------- |
| contentPath       | "de/content"       | the directory where all pages are       |
| iconPath          | "icon.svg"         | the path where the icon exists          |
| contentLanguage   | "de"               | the tag for <html lang="?">             |
| title             | "example title"    | the title for the browsers tab          |
| header            | "www.example.com"  | the header at the top of all pages      |
| subHeader         | "an example"       | the sub header at the top of all pages  |

### Example:
~~~~
{
  "contentPath": "de/content/",
  "iconPath": "icon.svg",
  "contentLanguage": "de",
  "title": "example title",
  "header": "www.exaple.com",
  "subHeader": "an example"
}
~~~~

## custom.css (mandatory)
- for implementing custom css classes
