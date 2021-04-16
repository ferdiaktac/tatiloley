$(document).ready(function () {
    $('a[href="#"]').on('click', function(e) {
        e.preventDefault();
    });

    // AOS
    AOS.init();
    AOS.init({
        once: true,
        disable: 'mobile',
        offset: 50,
    });

    // Fixed header home
    $(window).scroll(function () {
        var hTop = $(".header.home");
        if ($(this).scrollTop() >= hTop.outerHeight() * 6) {
            hTop.addClass("fixed");
            hTop.find(".logo img").attr("src", "assets/images/header/logo.svg");
        } else {
            hTop.removeClass("fixed");
            hTop.find(".logo img").attr("src", "assets/images/header/logo-white.svg");
        }
    });

    // Fixed header pages
    $(window).scroll(function () {
        var hTop = $(".header");
        if ($(this).scrollTop() >= hTop.outerHeight() * 6) {
            hTop.addClass("fixed");
            hTop.find(".logo img").attr("src", "assets/images/header/logo.svg");
        } else {
            hTop.removeClass("fixed");
        }
    });

    // Fixed Mobile Bottom
    $(window).scroll(function () {
        var hTop = $(".mobile-bottom-fixed-menu");
        if ($(this).scrollTop() >= hTop.outerHeight() * 6) {
            hTop.addClass("m-menu-show");
        } else {
            hTop.removeClass("m-menu-show");
        }
    });

    // Select2
    $('.destination').select2({
        language: "tr",
        placeholder: "Nereye gitmek istiyorsun?",
    });

    $('.category').select2({
        language: "tr",
        minimumResultsForSearch: -1,
    });

    $('.sort').select2({
        language: "tr",
        minimumResultsForSearch: -1,
        theme: "default select-sort",
    });

    $('.filter_select').select2({
        language: "tr",
        theme: "default filter-theme",
        placeholder: "Seçiniz",
        width: '100%',
    });


    // Guest Select
    var options = {
        content: function () {
            return $(this).parent().find('.popover-content').html();
        },
        html: true,
        placement: 'bottom',
    };
    var $popover = $('.search-box>.trigger').popover(options);

// Open Popover
    var pax = [1, 0, 0];
    $('.search-box>.trigger').click(function (e) {
        e.stopPropagation();
        $('.popover-body input').each(function (i) {
            $(this).val(pax[i]);
        });
    });

// Close Popover
    $(document).on('click', function (e) {
        $('[data-toggle="popover"],[data-original-title]').each(function () {
            if (!$(this).is(e.target) && $(this).has(e.target).length === 0 && $('.popover').has(e.target).length === 0) {
                (($(this).popover('hide').data('bs.popover') || {}).inState || {}).click = false  // fix for BS 3.3.6
            }
        });
    });

    $(document).click(function (e) {
        if ($(e.target).hasClass('dismiss')) {
            $('.search-box>.trigger').popover('hide');
        }
    });

// On Close Store Values
    $popover.on('hide.bs.popover', function (e) {
        $('.popover-body input').each(function (i) {
            pax[i] = $(this).val();
        });
    });

// Change Values on + & - Button Clicks
    $(document).on('click', '.number-spinner a', function () {
        var btn = $(this),
            input = btn.closest('.number-spinner').find('input'),
            oldValue = input.val().trim(),
            inputPax = $('#pax'),
            dataTotal = parseInt(inputPax.attr('data-total')),
            dataAdults = parseInt(inputPax.attr('data-adults')),
            dataChildren = parseInt(inputPax.attr('data-children')),
            dataBaby = parseInt(inputPax.attr('data-baby'));

        if (btn.attr('data-dir') == 'up') {
            if (oldValue < input.attr('max')) {
                oldValue++;

                if (input.attr('id') === 'adult') {
                    dataAdults++;
                    inputPax.attr('data-adults', dataAdults);
                } else if (input.attr('id') === 'child') {
                    dataChildren++
                    inputPax.attr('data-children', dataChildren);
                } else if (input.attr('id') === 'baby') {
                    dataBaby++
                    inputPax.attr('data-baby', dataBaby);
                }
            }
        } else {
            if (oldValue > input.attr('min')) {
                oldValue--;

                if (input.attr('id') === 'adult') {
                    dataAdults--
                    inputPax.attr('data-adults', dataAdults);
                } else if (input.attr('id') === 'child') {
                    dataChildren--
                    inputPax.attr('data-children', dataChildren);
                } else if (input.attr('id') === 'baby') {
                    dataBaby--
                    inputPax.attr('data-baby', dataBaby);
                }
            }
        }

        dataTotal = dataAdults + dataChildren + dataBaby;
        inputPax.attr('data-total', dataTotal);
        inputPax.attr('placeholder', dataAdults + ' Yetişkin, ' + dataChildren + ' Çocuk, ' + dataBaby + ' Bebek');

        input.val(oldValue);
    });

    // Filter Scroll Content
    var filtercheck = 8;
    hidefiltercheck = "- Daha az göster";
    showfiltercheck = "+ Daha fazla göster";

    $(".show-hide-checks").html(showfiltercheck);
    $(".filter-scroll-content .custom-checkbox:not(:lt(" + filtercheck + "))").hide();

    $(".show-hide-checks").click(function (e) {
        e.preventDefault();
        if ($(".filter-scroll-content .custom-checkbox:eq(" + filtercheck + ")").is(":hidden")) {
            $(".filter-scroll-content .custom-checkbox:hidden").show();
            $(".show-hide-checks").html(hidefiltercheck);
        } else {
            $(".filter-scroll-content .custom-checkbox:not(:lt(" + filtercheck + "))").hide();
            $(".show-hide-checks").html(showfiltercheck);
        }
    });

    var filtercheckdistrict = 8;
    hidefiltercheck = "- Daha az göster";
    showfiltercheck = "+ Daha fazla göster";

    $(".show-hide-checks-district").html(showfiltercheck);
    $(".filter-scroll-content-district .custom-checkbox:not(:lt(" + filtercheckdistrict + "))").hide();

    $(".show-hide-checks-district").click(function (e) {
        e.preventDefault();
        if ($(".filter-scroll-content-district .custom-checkbox:eq(" + filtercheckdistrict + ")").is(":hidden")) {
            $(".filter-scroll-content-district .custom-checkbox:hidden").show();
            $(".show-hide-checks-district").html(hidefiltercheck);
        } else {
            $(".filter-scroll-content-district .custom-checkbox:not(:lt(" + filtercheckdistrict + "))").hide();
            $(".show-hide-checks-district").html(showfiltercheck);
        }
    });

    // Advert Carousel
    $(".owl-carousel-advert-img").each(function () {
        $(this).owlCarousel({
            nav: true,
            lazyLoad: true,
            navText: ["<i class='fas fa-chevron-left'></i>", "<i class='fas fa-chevron-right'></i>"],
            dots: true,
            loop: true,
            slideSpeed: 300,
            paginationSpeed: 400,
            items: 1,
            stagePadding: 0,
            margin: 0,
        });
    });

    // Tooltip
    $(function () {
        $('[data-toggle="tooltip"]').tooltip()
    });

    // Filter Search
    $('.noresults').hide();

    $("#search_input").on("keyup", function () {
        var value = $(this).val().toLowerCase();
        $(".favorite-lists li").filter(function () {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
            $('.noresults').hide();

            var noResult = true;
            $(".favorite-lists").children('li').each(function () {
                if ($(this).children(':visible').length != 0) {
                    noResult = false;
                }
            });
            if (noResult) {
                $('.noresults').show();
            }
        });
    });

    $('#search_input').on('input change', function () {
        if ($(this).val() != '') {
            $('#create_list').prop('disabled', false);
        } else {
            $('#create_list').prop('disabled', true);
        }
    });

    // Read More
    var showChar = 400;
    var ellipsestext = "...";
    var moretext = "devamını okuyun";
    var lesstext = "devamını gizle";
    $('.more').each(function () {
        var content = $(this).html();

        if (content.length > showChar) {

            var c = content.substr(0, showChar);
            var h = content.substr(showChar, content.length - showChar);

            var html = c + '<span class="moreellipses">' + ellipsestext + '&nbsp;</span><span class="morecontent"><span>' + h + '</span>&nbsp;&nbsp;<a href="" class="morelink">' + moretext + '</a></span>';

            $(this).html(html);
        }

    });

    $(".morelink").click(function () {
        if ($(this).hasClass("less")) {
            $(this).removeClass("less");
            $(this).html(moretext);
        } else {
            $(this).addClass("less");
            $(this).html(lesstext);
        }
        $(this).parent().prev().toggle();
        $(this).prev().toggle();
        return false;
    });

    // Hero Gallery
    var total = $('.carousel-item').length;
    var currentIndex = $('.carousel-item.active').index() + 1;
    $('#slidetext').html(currentIndex + '/' + total);

    $('.carousel').on('slid.bs.carousel', function () {
        currentIndex = $('.carousel-item.active').index() + 1;
        var text = currentIndex + '/' + total;
        $('#slidetext').html(text);
    });


});

// Copy Clipboard
var button = $('.copy_clipboard');

button.on('click', function () {
    var target = $(this);
    target.addClass('copied');
    window.setTimeout(function () {
        target.removeClass('copied');
    }, 2000);
});

function copyClipboard() {
    var copyText = document.getElementById("advert_url");
    copyText.select();
    document.execCommand("copy");
}

// Trigger Datepicker
function calendar() {
    $('input[name="datepicker-in"]').focus();
}

// Datepicker Night Calc
$('#search_checkin').on('apply.daterangepicker', function (ev, picker) {
    $('.total-night-calc').text(picker.endDate.diff(picker.startDate, "days"));
});

// Add border color selected rooms
var prevVal;
$(".advert-item").each(function () {
    $(".advert-item").on("change", function () {
        var val = $(this).find('option:selected').val();
        $(this).removeClass(`border-${prevVal}`).addClass(`border-${val}`);
        prevVal = val;
    });
});

$(document).on('input', '.js-room-select', function () {
    if ($(this).val() == 0) {
        setTimeout(() => {
            $('.js-selected-rooms div[data-name="' + $(this).closest('.advert-item').find('.room-name').text() + '"]').remove();
        }, 0);
    }
    if ($('.js-selected-rooms div[data-name="' + $(this).closest('.advert-item').find('.room-name').text() + '"]').length) {
        $('.js-selected-rooms div[data-name="' + $(this).closest('.advert-item').find('.room-name').text() + '"] #room-count').text(`${$(this).val()} x`);
    } else {
        $('.js-selected-rooms').append(`
            <div class="js-selected-room" data-name="${$(this).closest('.advert-item').find('.room-name').text()}">
                <span id="room-count">${$(this).val()} x</span>
                <span id="room-name">${$(this).closest('.advert-item').find('.room-name').text()}</span>
            </div>
        `);
    }

    let total = 0;
    $('.js-selected-rooms div').each((i, item) => {
        total = total + parseInt($(item).find('#room-count')[0].innerHTML.split(' ')[0]);
        $('.total-room-calc').text(total);
    });
});

// Accordion
$(document).ready(function () {
    var allPanels = $('.accordion > dd').hide();

    $('.accordion > dt > a').click(function (e) {
        e.preventDefault();

        $this = $(this);
        $target = $this.parent().next();

        if (!$target.hasClass('active')) {
            allPanels.removeClass('active').slideUp();
            $target.addClass('active').slideDown();
        }

        $('.accordion > dt > a').attr("aria-expanded", false);

        if ($this.attr('aria-expanded') === true) {
            $this.attr('aria-expanded', false);
        } else {
            $this.attr('aria-expanded', true)
        }
    });
});

// Register Tel Input
$(function() {
    var input = document.querySelector("#tel_number");
    window.intlTelInput(input, {
        utilsScript: "assets/js/telinput/js/utils.js",
        initialCountry: "tr"
    });
});

$(function() {
    var input = document.querySelector("#tel_number_mobile");
    window.intlTelInput(input, {
        utilsScript: "assets/js/telinput/js/utils.js",
        initialCountry: "tr"
    });
});

$( ".chat-container" ).scrollTop( 99999 );

// Switch Toogle
var switchtoggle = $('.switch-checkbox');

switchtoggle.on('change', function () {
    const containerelement=$(this).closest('.toggle-wrapper');
    if ($(this).is(':checked')) {
        containerelement.find(".toggle-off").removeClass("active");
        containerelement.find(".toggle-on").addClass("active");
        containerelement.find(".toggle-on-content").show();
        containerelement.find(".toggle-off-content").hide();
    } else {
        containerelement.find(".toggle-on").removeClass("active");
        containerelement.find(".toggle-off").addClass("active");
        containerelement.find(".toggle-on-content").hide();
        containerelement.find(".toggle-off-content").show();
    }
});

switchtoggle.each((i, item) => {
    const containerelement=$(item).closest('.toggle-wrapper');
    if ($(item).is(':checked')) {
        containerelement.find(".toggle-off").removeClass("active");
        containerelement.find(".toggle-on").addClass("active");
        containerelement.find(".toggle-on-content").show();
        containerelement.find(".toggle-off-content").hide();
    } else {
        containerelement.find(".toggle-on").removeClass("active");
        containerelement.find(".toggle-off").addClass("active");
        containerelement.find(".toggle-on-content").hide();
        containerelement.find(".toggle-off-content").show();
    }
});

