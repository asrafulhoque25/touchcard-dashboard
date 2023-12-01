/**
 * @Script js for (Template/Project Name)
 *
 * @project     - Project Name
 * @author      - 
 * @created_by  - 
 * @created_at  - 
 * @modified_by -
 */


/**
 * ========================================================
 * this function execute when window properly loaded
 * ===========================================================
 */

$(window).on('load', function () {

    //  $('.btn-sidebar-toggle') 
    // init on mobile
    $(function () {
        if (window.matchMedia('(max-width: 991px)').matches) {
            $('body').addClass('sidebar-collapsed');
        } else {
            $('body').removeClass('sidebar-collapsed');
        }

        $(window).resize(function () {
            if (window.matchMedia('(max-width: 991px)').matches) {
                $('body').addClass('sidebar-collapsed');
            } else {
                $('body').removeClass('sidebar-collapsed');
            }
        })
    })

});



/**
 * ========================================================
 * this function execute when DOM element ready 
 * ===========================================================
 */

$(document).ready(function () {


    //  $('.btn-sidebar-toggle') 
    // init
    $(function () {
        $('.btn-sidebar-toggle').on('click', function (e) {
            e.preventDefault();
            $('body').toggleClass('sidebar-collapsed');
        })
        $('.navbar-logo').on('click', function (e) {
            if ($('body').hasClass('sidebar-collapsed')) {
                e.preventDefault();
                $('body').toggleClass('sidebar-collapsed');
            }
        })
    })

});
