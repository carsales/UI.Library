(function ($, CSN) {
    'use strict';

    var UI = CSN.UI || (CSN.UI = {});

    UI.Modal = function Modal(config) {
        if (UI.Modal.instance) {
            return UI.Modal.instance.init(config);
        }

        var _modalContent = { lastUsed: '' }, _openUrlCallback = function (callback, url) {
            var that = this, w = $(window);
            return function (html) {
                var left, top;
                that.element.removeClass('is-loading').html(html);
                _addCloseButton.call(that);
                _modalContent[url] = html;
                _modalContent.lastUsed = url;
                callback.call(that);
                left = -Math.round(that.element.outerWidth() / 2);
                top = -Math.round(that.element.outerHeight() / 2) + w.scrollTop();
                that.element.css({ 'marginLeft': left, 'marginTop': top });
                that.element.trigger('modal-open');
            };
        }, _openModal = function (top, left) {
            var w = $(window), scrollTop = w.scrollTop(),
                d = $(document);

            this.overlay.css('height', d.outerHeight(true));

            if (!isNaN(left) && !isNaN(top)) {
                this.element.css({ 'left': left, 'top': top });
                this.overlay.removeClass('hidden');
                this.element.removeClass('hidden');
            } else {
                this.element.css('visibility', 'hidden').removeClass('hidden');
                left = -Math.round(this.element.outerWidth() / 2);
                top = -Math.round(this.element.outerHeight() / 2) + scrollTop;
                this.overlay.removeClass('hidden');
                this.element.css({
                    'left': '50%',
                    'marginLeft': left,
                    'top': '50%',
                    'marginTop': top,
                    'visibility': 'visible'
                });
            }

            this.overlay.one('click', _closeModal);
            this.isOpen = true;
        }, _addCloseButton = function () {
            this.element.append('<span class="btn btn-close" title="Close">Close</span>').find('.btn-close').one('click', _closeModal);
        }, _closeModal;

        UI.Modal.instance = {
            element: null,
            overlay: null,
            isOpen: false,
            modalState: '',

            init: function (config) {
                var that = this;
                if (this.element === null) {
                    this.element = $('<div class="csn-modal-container hidden"></div>').appendTo('body');
                    this.overlay = $('<div class="csn-modal-overlay hidden"></div>').appendTo('body');

                    $('body').on('keyup', function (ev) {
                        if (that.isOpen && ev.which === 27) {
                            that.close();
                        }
                    });
                }

                if (config) {
                    if (!isNaN(config.width)) {
                        this.element.width(config.width);
                    }
                    if (typeof config.className === 'string') {
                        this.element.addClass(config.className);
                    }
                }

                if (typeof _closeModal == 'undefined') {
                    _closeModal = $.proxy(this.close, this);
                }

                return this;
            },

            open: function (dialogSrc, left, top) {
                if (dialogSrc !== _modalContent.lastUsed) {
                    if (!_modalContent.hasOwnProperty(dialogSrc)) {
                        _modalContent[dialogSrc] = $(dialogSrc).removeClass('hidden');
                    }

                    this.element.empty().append(_modalContent[dialogSrc]);
                    _modalContent.lastUsed = dialogSrc;
                }

                _openModal.call(this, top, left);
                _addCloseButton.call(this);
                this.element.trigger('modal-open');
            },

            openUrl: function (url, callback) {
                this.element.empty().addClass('is-loading');
                if (_modalContent.hasOwnProperty(url)) {
                    _openModal.call(this);
                    _openUrlCallback.call(this, callback, url)(_modalContent[url]);
                } else {
                    _openModal.call(this); // Display any initial state
                    this.element.load(url, _openUrlCallback.call(this, callback, url));
                }
            },

            close: function () {
                this.element.addClass('hidden');
                this.overlay.addClass('hidden');
                this.clearState();
                this.isOpen = false;
                this.element.trigger('modal-close');
            },

            setState: function (state) {
                if (typeof state == 'string') {
                    state = state.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
                    this.element.removeClass(this.modalState).addClass(state);
                    this.modalState = state;
                }
            },

            clearState: function (state) {
                if (typeof state == 'string') {
                    state = state.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
                    this.element.removeClass(state);
                    this.modalState = $.trim(this.modalState.replace(state, ''));
                } else {
                    this.element.removeClass(this.modalState);
                    this.modalState = '';
                }
            },

            find: function (selector) {
                return this.element.find(selector);
            },

            isEmpty: function () {
                return !this.element.children().length;
            }
        };

        return UI.Modal.instance.init(config);
    };

}(jQuery, (window.CSN || (window.CSN = {}))));