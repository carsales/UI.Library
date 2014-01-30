Development Notes
=================

## 2013-12-28

I had an idea to remove the need for JavaScript to wire-up the site navigation menu interations for touch devices, instead relying on CSS. The code is to utilise the `:active` pseudo-class with `<a>`. So the CSS would be:

```css
a:active + .menu-panel {
	display:block;
}
```

However, this didn't seem to work on IE11 nor Chrome in Windows 8 mode.

I then tried this:

```css
a:focus + .menu-panel {
	display:block;
}
```

This worked for IE11, not for Chrome. However, as the focus is set to the link in the top-level menu, when you touch any part of the sub-menu, the sub-menu disappears due to the loss of focus from the top-level item.

The code for the desktop version:

```css
li:hover .menu-panel {
    display: block;
}
```

will display the sub-menu in IE11, but again, when the menu panel is touched, there is a loss of focus.

Without an iPad to test these theories, it is difficult to come to a conclusion that an interactive menu cannot have its behaviours styled in CSS. Perhaps this is actually correct, if one considers the three pillars of browser software:

<pre>
HTML	(structure, content)
CSS 	(presentation)
JS		(behaviour, data)
</pre>

For now, the behaviour will be encoded into JavaScript.