/* ============================================================
 * Originated from bootstrap-dropdown.js v2.1.1
 * http://twitter.github.com/bootstrap/javascript.html#dropdowns
 * ============================================================ */


!function ($) {

    "use strict";


    /* DROPDOWN CLASS DEFINITION
     * ========================= */

    var toggle = '[data-toggle=dropdown]'
      , Dropdown = function (element) {
          var $el = $(element).on('click.dropdown.data-api', this.toggle)
          $('html').on('click.dropdown.data-api', function () {
              $el.parent().removeClass('is-active')
          })
      }

    Dropdown.prototype = {

        constructor: Dropdown

    , toggle: function (e) {
        var $this = $(this)
          , $parent
          , isActive

        if ($this.is('.disabled, :disabled')) return

        $parent = getParent($this)

        isActive = $parent.hasClass('is-active')


        if (!isActive) {
            $parent.toggleClass('is-active');
            $this.focus();

            $(document).one("touchstart", function () {
                clearMenus();
            });
        } else {
            clearMenus();
        }

        return false
    }

    , keydown: function (e) {
        var $this
          , $items
          , $active
          , $parent
          , isActive
          , index

        if (!/(38|40|27)/.test(e.keyCode)) return

        $this = $(this)

        e.preventDefault()
        e.stopPropagation()

        if ($this.is('.disabled, :disabled')) return

        $parent = getParent($this)

        isActive = $parent.hasClass('is-active')

        if (!isActive || (isActive && e.keyCode == 27)) return $this.click()

        $items = $('[role=menu] li:not(.divider) a', $parent)

        if (!$items.length) return

        index = $items.index($items.filter(':focus'))

        if (e.keyCode == 38 && index > 0) index--                                        // up
        if (e.keyCode == 40 && index < $items.length - 1) index++                        // down
        if (!~index) index = 0

        $items
          .eq(index)
          .focus()
    }

    }

    function clearMenus() {
        getParent($(toggle))
          .removeClass('is-active');
    }

    function getParent($this) {
        var selector = $this.attr('data-target')
          , $parent

        if (!selector) {
            selector = $this.attr('href')
            selector = selector && /#/.test(selector) && selector.replace(/.*(?=#[^\s]*$)/, '') //strip for ie7
        }

        $parent = $(selector)
        $parent.length || ($parent = $this.parent())

        return $parent
    }


    /* DROPDOWN PLUGIN DEFINITION
     * ========================== */

    $.fn.dropdown = function (option) {
        return this.each(function () {
            var $this = $(this)
              , data = $this.data('dropdown')
            if (!data) $this.data('dropdown', (data = new Dropdown(this)))
            if (typeof option == 'string') data[option].call($this)
        })
    }

    $.fn.dropdown.Constructor = Dropdown


    /* APPLY TO STANDARD DROPDOWN ELEMENTS
     * =================================== */

    $(function () {
        $('html')
          .on('click.dropdown.data-api', clearMenus)
        $('body')
          .on('click.dropdown touchstart.dropdown.data-api', '.dropdown form', function (e) { e.stopPropagation() })
          .on('click.dropdown.data-api touchend.dropdown.data-api', toggle, Dropdown.prototype.toggle)
          .on('keydown.dropdown.data-api touchstart.dropdown.data-api', toggle + ', [role=menu]', Dropdown.prototype.keydown)
    })

}(window.jQuery);