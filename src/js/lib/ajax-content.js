/*
ToDo: modify to support variations

data-ajax-form:
---------------
Example 1: with submit button

<div data-ajax-form="MyAjaxContentBody">
    <form action="/new-cars/data/cars-in-stock" method="get">
        <label for="State">Location</label>
        <select name="numbers">
            <option value="">Choose a state</option>
            <option value="1">One</option>
            <option value="2">Two</option>
        </select>
        <input type="submit" value="Go"/>
    </form>
    <div id="MyAjaxContentBody"></div>
</div>

Example 2: with auto-submit triggers and without submit button

<div data-ajax-form="MyAjaxContentBody">
    <form action="/new-cars/data/cars-in-stock" method="get">
        <label for="State">Location</label>
        <select name="numbers" data-ajax="auto-submit">
            <option value="">Choose a state</option>
            <option value="1">One</option>
            <option value="2">Two</option>
        </select>
    </form>
    <div id="MyAjaxContentBody"></div>
</div>

Example 3: Where content body is outside the context element.

<div data-ajax-form="MyAjaxContentBody">
    <form action="/new-cars/data/cars-in-stock" method="get">
        <label for="State">Location</label>
        <select name="numbers" data-ajax="auto-submit">
            <option value="">Choose a state</option>
            <option value="1">One</option>
            <option value="2">Two</option>
        </select>
    </form>
</div>
<div id="MyAjaxContentBody"></div>

Example 4: replace everything (inc form)

<div id="MyAjaxContentBody" data-ajax-form="MyAjaxContentBody">
    <form action="/new-cars/data/cars-in-stock" method="get">
        <label for="State">Location</label>
        <select name="numbers">
            <option value="">Choose a state</option>
            <option value="1">One</option>
            <option value="2">Two</option>
        </select>
        <input type="submit" value="Go"/>
    </form>
</div>

data-ajax-link:
---------------
Example: 1 - perform ajax on click

<a data-ajax-link="my-update-panel" href="/blah/bla2">Click to update</a>
<div id="my-update-panel"> Ajax content goes here </div>

*/
(function ($) {
    "use strict";
    var namespace = "ajaxcontent",

        events = {
            type: "form",
            loaded: "loaded." + namespace
        },

        defaultOptions = {
            loadingClassName: "is-loading"
        };

    function initAjaxForms(container, options) {
        var contentBodyId = container.data("ajax-form");

        container.on("submit", "form", function (event) {
            event.preventDefault();

            var form = $(this),
                remoteUrl = form.attr("action"),
                method = form.attr("method") || "GET",
                formData = form.serialize();

            if (remoteUrl && formData) {
                var contentBody = $("#" + contentBodyId);

                $.ajax(remoteUrl, {
                    type: method,
                    data: formData,

                    success: function (data) {
                        contentBody.html(data);
                        container.trigger(events.loaded, data);
                    },

                    beforeSend: function () {
                        container.addClass(options.loadingClassName);
                    },

                    complete: function () {
                        container.removeClass(options.loadingClassName);
                    }
                });
            }
        });

        container.on("change", '[data-ajax="auto-submit"]', function (event) {
            $(this).parents("form:first").trigger("submit");
        });

        container.on("click", 'input[type="checkbox"][data-ajax="auto-submit"], input[type="radio"][data-ajax="auto-submit"]', function (event) {
            $(this).parents("form:first").trigger("submit");
        });

        container.find('[data-ajax="auto-submit"]').removeAttr("disabled");
    }

    function initAjaxLinks(link, options) {
        remoteUrl = link.attr("href");
        contentBodyId = link.data("ajax-link");

        if (contentBodyId && remoteUrl) {
                
            link.on("click", function (event) {
                event.preventDefault();
                
                var contentBody = $("#" + contentBodyId);
                $.ajax(remoteUrl, {
                    success: function (data) {
                        contentBody.html(data);
                        link.trigger(events.loaded, data);
                    },
                    beforeSend: function () {
                        link.attr("disabled", "disabled");
                        contentBody.addClass(options.loadingClassName);
                    },
                    complete: function () {
                        link.removeAttr("disabled");
                        contentBody.removeClass(options.loadingClassName);
                    }
                });
            });

            link.removeAttr("disabled");
        }
    }

    /***** Plugin Methods *****/
    var methods = {
        init: function (options) {
            var opts = $.extend({}, defaultOptions, options);

            this.each(function () {
                var $this = $(this);

                if (opts.type) {
                    switch (opts.type.toLowerCase()) {
                        case "form":
                            initAjaxForms($this, opts);
                            break;
                        case "link":
                            initAjaxLinks($this, opts);
                            break;
                        default:
                            break;
                    }
                }
            });

            return this;
        },

        destroy: function () {
            $(this).off(namespace);
        }
    };

    /***** Plugin Entry *****/
    $.fn.ajaxContent = function (method) {

        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof method === 'object' || !method) {
            return methods.init.apply(this, arguments);
        } else {
            return null;
        }
    };
}(jQuery));

//Auto wiring up (after document ready)
$(function () {
    $('[data-ajax-form]').ajaxContent({ type: "form" });
    $('a[data-ajax-link]').ajaxContent({ type: "link" });
});