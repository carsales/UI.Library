# UI Code Guide
This is a short and shape guide on writing reasonable, responsible and high quality user interfaces.
This is a living document and new ideas are always welcome. Please contribute.

## General Principles
- All code in any project should look like a single person typed it, even when many people are contributing
- Strictly enforce a pre-agreed upon style - this guide should help you in that
- Boy Scout Rule - when working in an area that is pre-existing, when possible, try to leave it in a better state than when you found it
- For indentations, use soft tabs with a 4 space indent

## Coding Conventions

### Styling
#### Coding Style
- Use LESS preprocessor to generate all CSS files
- Use clear and well thought out class names that don't include any presentation-based descriptions
- Put space after the `:` character
- Put spaces before `{` in rule declarations, with no line break
- Each declaration should appear on its own line
- Single line rules are permitted only when containing a single property eg:
      .sprite {
          background-image: url(../img/sprite.png);
          display: inline-block;
          height: 15px;
          width: 16px;
      }
          .icon           { background-position: 0 0; }
          .icon-home      { background-position: 0 -20px; }
          .icon-account   { background-position: 0 -40px; }
- Quote attribute values in selectors eg `input[type="text"]`
- When specifying zero values, avoid unit values eg `margin: 0` instead of `margin: 0px`
- Always use shorthand eg `background: url() bottom right #fff no-repeat;`
- Properties should appear in alphabetical order
- Each rule should end in a semi-colon (`;`). Even the last one.

### HTML
#### Coding Style
##### HTML5 Doctype
Enforce standards mode in every browser possible with this simple doctype at the beginning of every HTML page.

##### Attribute order
HTML attributes should come in this particular order for easier reading of code.

- class
- id
- data-*
- for|type|href etc.

### Javascript
#### Coding Style

- Use data attributes as javascript hooks for patterns