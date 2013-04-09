Field Counter
=============

A jQuery plugin for displaying the character and/or word counts of form field. 
The counts are updated as data is entered into the field, and the output string
is completely customizable, and can be placed anywhere on the page.

# Authors and Attributions
Field Counter was written by Jocko MacGregor for [Ballantine Digital Media](http://blog.buzztown.com/).

# License
This work is licensed under a <a rel="license" href="http://creativecommons.org/licenses/by/3.0/">Creative Commons Attribution 3.0 Unported License</a>.

<a rel="license" href="http://creativecommons.org/licenses/by/3.0/"><img alt="Creative Commons License" style="border-width:0" src="http://i.creativecommons.org/l/by/3.0/88x31.png" /></a>

# Usage
Sorry if this isn't a fully detailed yet, I'm building it for a work project, 
but hopefully I will get back to documenting it a little more fully.  In the 
mean time here's some basics.

All references below are assuming you're using the sample.html file included in
the repository.  If you are using your own code please adjust your paths,
expectations and shorts accordingly.

### Basic Requirements
I would recommend using the latest version of jQuery (as of publication, 1.9.1),
but you will need at least version 1.4.3 to enable the HTML5 functionality of
jQuery.  I have not done thorough testing of the various versions, but if you
have 1.9.1+ you should be alright.

You must also include the Field Counter javascript file in your HTML document.

Remember to set your paths to match your environment.

```html
<!-- Javascript files (jQuery 1.4.3 or higher is required) -->
<script src="//ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js"></script>
<script type="text/javascript" src=&quot;js/premium-select-0.1b.js"></script>;

<!-- CSS File -->
<link rel="stylesheet" href="css/premium-select.css" >;
```

### Basic Implementation
The most basic approach is to have a form field (likely a textarea), and another
DOM element to hold the counter's output.  These are generally referenced as the
field and counter respectively.

If you provide the 'fieldCounter' class to the counter's tag, the Field Counter
will automatically initialize the field.

Here's the code:
```html
<textarea id="formFieldBasic" name="formField" style="width:500px;height:100px;">This is a basic sample counter field. This field is limited to 300 characters.</textarea>
<p class="fieldCounter" data-limit="300" data-field="formFieldBasic">0/0</p>
```

### Custom Counter String
You can also customize the output of the counter string using the 'format' data
attribute.  This attribute is a string that is used as a template, with the 
various values injected between hashes (#).   Read the 'Custom Counter Template'
section below for more details.

Here's an example:
```html
<textarea id="formFieldCustomOutput" name="formField" style="width:500px;height:100px;">This is a sample counter field with a customized counter string, and limit of 200 characters.</textarea>
<p class="fieldCounter" data-limit="200" data-field="formFieldCustomOutput" data-format="There are #count# of #limit# characters used totaling #words# words.">0 of 0 characters used.</p>
```

### No Limit
You can remove the maximum limit of the field by setting the 'limit' data
attribute to 0, or removing it entirely.  When you do this, you may also want
to set a custom counter string as well so that the default limit value is not
displayed.

Here's an example:
```html
<textarea id="formFieldNoLimit" name="formField" style="width:500px;height:100px;">This is a sample counter field with no character limit. It should be noted that you have to set the 'format' data attribute for this one to prevent it from displaying the limit, which is 0, and therfore useless in this regard.</textarea>
<p class="fieldCounter" data-field="formFieldNoLimit" data-format="C:#count#, W:#words#">0</p>
```

# Custom Counter Template
To customize the output of the counter's display you can provide a template
string to Field Counter that it will use to generate the output.  The template
uses variables that are enclosed in has marks (#).

For example:
There are #count# of #limit# characters used totaling #words# words.

Each variable will be removed from the template an replaced with their properly
calculated corresponding value.

These are the variables that you can use

##### count
The current number of characters in the field.

##### limit
The maximum number of characters that are allowed in the field.

##### words
The number of words that are present in the field.