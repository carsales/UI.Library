UI Code Guide
-------------

This is a short and shape guide on writing reasonable, responsible and high quality user interfaces.

This is a living document and new ideas are always welcome. Please contribute.

## General Principles

* All code in any project should look like a single person typed it, even when many people are contributing
* Strictly enforce a pre-agreed upon style - this guide should help you in that
* Boy Scout Rule - when working in an area that is pre-existing, when possible, try to leave it in a better state than when you found it
* For indentations, use soft tabs with a 4 space indent


## File Organisation

    <pre>Content
├─ css
│  ├─ main.css  // Compiled version of main.less
│  ├─ main.less
│  ├─ base
│  │  ├─ _animations.less
│  │  ├─ _mixins.less
│  │  ├─ _reset.less
│  │  ├─ _typography.less
│  │  ├─ _utility.less
│  │  └─ _variables.less
│  ├─ modules
│  │  └─ _accordions.less
│  └─ patterns
│     ├─ _buttons.less
│     ├─ _carets.less
│     ├─ _dropdowns.less
│     ├─ _forms.less
│     ├─ _grid.less
│     ├─ _lists.less
│     ├─ _loader.less
│     ├─ _media.less
│     ├─ _star-rating.less
│     ├─ _tables.less
│     ├─ _tabs.less
│     └─ _wells.less
│
├─ images
│  ├─ backgrounds
│  └─ sprites
│     ├─ ui-sprite.png
│     ├─ images-sprite.png
│     └─ [...]
│
└─ scripts
   ├─ lib
   │  └─ jquery.js
   ├─ patterns
   │  └─ forms.js
   └─ modules
      ├─ gallery.js
      └─ accordion.js</pre>
