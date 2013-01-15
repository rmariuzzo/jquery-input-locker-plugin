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
        
    };
    
    InputLocker.prototype.unlock = function () {
        
    };
    
    // jQuery plugin hook //
    //--------------------//
    
    var old = $.fn.inputLocker;
    
    $.fn.inputLocker = function (option) {
        return this.each(function () {
            
        });
    };
    
    $.fn.inputLocker.defaults = {
        autoLock : true
    };
    
    $.fn.InputLocker.Constructor = InputLocker;
    
    $.fn.inputLocker.noConflict = function () {
        $.fn.inputLocker = old;
        return this;
    };
    
    // Data API //
    //----------//
    
    $(document).ready(function () {
        $('input[data-input-locker]').each(function () {
            var $input = $(this);
            if ($input.data('input-locker') === 'locked') {
                $input.inputLocker('lock');
            } else if ($input.data('input-locker') === 'unlocked') {
                $input.inputLocker('unlock');
            }
        });
    });
    
}(jQuery);