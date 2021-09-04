$(document).ready(function () {

    $('.account-menu__item').each(function (i) {
        $(this).on('click', function () {
            if (i != 1) {
                $('.order-body').slideUp();
                $('.arrow.up').removeClass('up');
            }
            $('.account-menu__item.active').removeClass('active');
            $(this).addClass('active');
            $('.account-body__block.active').removeClass('active');
            $('.account-body__block').eq(i).addClass('active');
        });
    });

    showPage($('.order'), 1);

    $('.menu__toggle').on('click', ToggleMenu);
    $('.overlay').on('click', ToggleMenu);
    $('.menu__item').each(function (i) {
        $(this).on('click', function () {
            $('.menu__active-item').text($('.menu__item').eq(i).text());
            ToggleMenu();
            let $delivered = $('.order[data-status="delivered"]');
            let $cancelled = $('.order[data-status="cancelled"]');
            let $active = $('.order:not([data-status="delivered"]):not([data-status="cancelled"])');

            switch (i) {
                case 0:
                    $('.order').show(100);
                    showPage($('.order'), 1);
                    break;
                case 1:
                    $('.order-body', $delivered).slideUp();
                    $('.order-body', $cancelled).slideUp();
                    $delivered.find('.arrow.up').removeClass('up');
                    $cancelled.find('.arrow.up').removeClass('up');
                    $delivered.hide(100);
                    $cancelled.hide(100);
                    $active.show(100);
                    showPage($active, 1);
                    break;
                case 2:
                    $('.order-body', $('.order').not($delivered)).slideUp();
                    $('.order').not($delivered).find('.arrow.up').removeClass('up');
                    $('.order').not($delivered).hide(100);
                    $delivered.show(100);
                    showPage($delivered, 1);
                    break;
                case 3:
                    $('.order-body', $('.order').not($cancelled)).slideUp();
                    $('.order').not($cancelled).find('.arrow.up').removeClass('up');
                    $('.order').not($cancelled).hide(100);
                    $cancelled.show(100);
                    showPage($cancelled, 1);
                    break;
            }
        });
    });

    $('.order-head').on('click', showCard);

});

function ToggleMenu() {
    $('.menu__body').slideToggle(200);
    $('.menu__toggle').toggleClass("pressed");
    $('.overlay').toggleClass("cover");
}

function showCard() {
    //for only one order card opening
    //$('.order-body').not($(this).next()).slideUp(200);
    //$('.order-head').not($(this)).find('.arrow.up').removeClass('up');

    $(this).next().slideToggle(200);
    $(this).find('.arrow').toggleClass('up');
}

function showPage(orders, page) {
    let ordersPerPage = 10;
    let shownOrders = orders.slice((page - 1) * ordersPerPage,
        ((page - 1) * ordersPerPage) + ordersPerPage);
    orders.not(shownOrders).each(function () {
        $(this).hide();
        $('.order-body', $(this)).slideUp();
        $(this).find('.arrow.up').removeClass('up');
    });
    shownOrders.each(function () {
        $(this).show();
    });
    renderControls(orders, '.contols-container', page, numPages(orders, ordersPerPage));
}

function numPages(orders, ordersPerPage) {
    return Math.ceil(orders.length / ordersPerPage);
}

function renderControls(orders, container, currentPage, numPages) {
    if (numPages > 1) {
        $(container).html("<ul class = 'controls'></ul>");
            for (let i = 1; i <= numPages; i++) {
                if (i == currentPage) {
                    $('ul.controls', container).append($('<li>', {
                        class: 'controls__page-number current',
                        'data-num': '' + i + '',
                    }));
                } else {
                    if ((i >= 1 && i <= 3) || i == numPages || i - currentPage == 1 || i - currentPage == -1) {
                        $('ul.controls', container).append($('<li>', {
                            class: 'controls__page-number',
                            'data-num': '' + i + '',
                            click: function () {
                                showPage(orders, i);
                                return true;
                            }
                        }));
                    } else {
                        if (i - currentPage == -2 || i - numPages == -1) {
                            $('ul.controls', container).append($('<li>', {
                                class: 'controls__space',
                                'data-num': '...'
                            }));
                        }
                    }
                }
            }
        $('ul.controls', container).append($('<li>', {
            class: 'controls__next',
            text: 'дальше',
            click: function () {
                if (currentPage == numPages) {
                    showPage(orders, 1);
                    return true;
                } else {
                    showPage(orders, currentPage + 1);
                    return true;
                }
            }
        }));
    } else {
        $(container).html('');
    }
}