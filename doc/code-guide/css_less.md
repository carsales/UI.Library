## CSS &amp; Less

### Coding Style

* Use clear and well thought out class names that don't include any presentation-based descriptions
* Put space after `:` character
* Put spaces before `{` in rule declarations, with no line break
* Each declaration should appear on its own line
* Single line rules are permitted only when containing a single property eg:

<pre>
<code css="language-css">
.sprite {
  background-image: url(../img/sprite.png);
  display: inline-block;
  height: 15px;
  width: 16px;
}
    .icon           { background-position: 0 0; }
    .icon-home      { background-position: 0 -20px; }
    .icon-account   { background-position: 0 -40px; }
</code>
</pre>

* Quote attribute values in selectors eg `input[type="text"]` 
* When specifying zero values, avoid unit values eg `margin: 0` instead of `margin: 0px` 
* Always use shorthand eg `background: url() bottom right #fff no-repeat;` 
* Properties should appear in alphabetical order
* Each rule should end in a semi-colon (`;`). Even the last one.

### Naming Conventions

* Keep classes lowercase and use dashes in between words. Not underscores or camelCase
* Use `is-` prefix for state based class names. eg:

<pre>
<code class="language-css">
.dropdown {
    ...
}

.dropdown.is-active {
    ...
}
</code>
</pre>
            
* Use 'base-' prefix for variables/class names when referring to a default
* Use 'primary-' prefix for variables/class names when representing something that is primary/main
* For sizing class prefixes, use 'mini', 'small', 'large' and 'huge' (Medium should be default)

### Patterns

A pattern is a set of styles and variations that can be used over and over in a design. This includes things like buttons, grids, tables, forms etc. New patterns should be created sparingly as most of the common patterns should already exist. If not, a new pattern needs to have flexibility and extensibility at it's heart.

### Modules

Modules should not be confused with patterns. Think of a module as a re-usable block that may or may not include patterns.

* When a class is reliant on a parent module, prefix the class based on the module name (eg .module-modal &gt; .modal-header etc)
* Modules should be structured in a consistent fashion using the following structure (with only the containing element being mandatory)

<pre>
<code class="language-html">
&lt;div class="module-modulename"&gt;
    &lt;div class="modulename-header"&gt;...&lt;/div&gt;
    &lt;div class="modulename-body"&gt;...&lt;/div&gt;
    &lt;div class="modulename-footer"&gt;...&lt;/div&gt;
&lt;/div&gt;
</code>
</pre>