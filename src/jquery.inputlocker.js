/*!
 * jQuery input locker plugin.
 * 
 * Version: 0.1
 * Author:  Rubens Mariuzzo
 * License: http://www.apache.org/licenses/LICENSE-2.0
 */
!function($) {
    
    "use_strict";
    
    // Input Locker Class //
    //--------------------//
    
    var InputLocker = function (element, options) {
        this.$element = $(element);
        this.options = $.extend({}, $.fn.inputLocker.defaults, options);
    };
    
    InputLocker.prototype.lock = function () {
        if (!this.$unlocker) {
            this.$element.attr('readonly', 'readonly');
            replaceClass(this.$element, this.options.lockedClass, this.options.unlockedClass);
            this.$unlocker = createUnlocker(this.$element);
            var margin = this.$element.css('margin');
            this.$element.width(this.$element.width() - 20);
            this.paddingRight = parseInt(this.$element.css('padding-right'), 10);
            this.$element.css('padding-right', 20 - this.paddingRight + 'px');
            this.$element.css('margin', margin);
        }
    };
    
    InputLocker.prototype.unlock = function () {
        if (this.$unlocker) {
            replaceClass(this.$element, this.options.unlockedClass, this.options.lockedClass);
            this.$unlocker.remove();
            delete this.$unlocker;
            this.$element.removeAttr('readonly');
            this.$element.css('padding-right', this.paddingRight + 'px');
            this.$element.width(this.$element.width() + 20);
            delete this.paddingRight;
        }
    };
    
    // Private Functions //
    //-------------------//
    
    function replaceClass($element, search, replace) {
        $element.removeClass(search).addClass(replace);
    }
    
    function createUnlocker($element) {
        var height = $element.outerHeight(false);
        var $unlocker = $('<span>×</span>').css({
            position: 'absolute',
            zIndex : $element.css('z-index') + 1,
            textAlign: 'center',
            width: '20px',
            height: height,
            lineHeight: height + 'px',
            cursor: 'pointer'
        });
        $unlocker.attr('style', function (index, style) {
            return (style || '') 
                + 'font-weight: bold !important;'
                + 'font-size: 20px !important;'
                + 'color: #444 !important';
        });
        var pos = $element.position();
        $unlocker.css({
            top: pos.top
                + parseInt($element.css('margin-top'), 10),
            left: pos.left 
                + $element.outerWidth(true) 
                - parseInt($element.css('padding-right'), 10)
                - parseInt($element.css('border-right-width'), 10) 
                - 20
        }).on('click', function () {
            $element.val('').inputLocker('unlock').focus();
        }).on('mouseenter', function () {
            $unlocker.css('color', '#000');
        }).on('mouseleave', function () {
            $unlocker.css('color', '#444');
        });
        $element.parent().append($unlocker);
        return $unlocker;
    }
    
    // jQuery plugin hook //
    //--------------------//
    
    var old = $.fn.inputLocker;
    
    $.fn.inputLocker = function (option) {
        return this.each(function () {
            var $this = $(this),
                data = $this.data('input-locker'),
                options = typeof option == 'object' && option;
            if (!data) {
                $this.data('input-locker', (data = new InputLocker(this, options)));
            }
            if (option == 'lock') {
                data.lock();
            } else if (option == 'unlock') {
                data.unlock();
            }
        });
    };
    
    $.fn.inputLocker.defaults = {
        autoLock : true,
        lockedClass : 'locked',
        unlockedClass : 'unlocked'
    };
    
    $.fn.inputLocker.Constructor = InputLocker;
    
    $.fn.inputLocker.noConflict = function () {
        $.fn.inputLocker = old;
        return this;
    };
    
    // Data API //
    //----------//
    
    $(document).ready(function () {
        $('input[data-toggle*=input-locker]').each(function () {
            var $input = $(this);
            if ($input.is('.' + $.fn.inputLocker.defaults.lockedClass)) {
                $input.inputLocker('lock');
            } else if ($input.is('.' + $.fn.inputLocker.defaults.unlockedClass)) {
                $input.inputLocker('unlock');
            }
        });
    });
    
}(jQuery);