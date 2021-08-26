$(document).ready(function(){

    $('.account-menu__item').each(function(i) {
        $(this).on('click', function() {   
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

    $('.menu__toggle').on('click', ToggleMenu);
    $('.overlay').on('click', ToggleMenu);
    $('.menu__item').each(function(i) {
        $(this).on('click', function() {
            $('.menu__active-item').text($('.menu__item').eq(i).text());
            ToggleMenu();  
            switch (i) {
                case 0:
                    $('.order').show(100);
                    break;
                case 1:
                    $('.order[data-status="delivered"] .order-body').slideUp();
                    $('.order[data-status="cancelled"] .order-body').slideUp();
                    $('.order[data-status="delivered"]').find('.arrow.up').removeClass('up');
                    $('.order[data-status="cancelled"]').find('.arrow.up').removeClass('up');
                    $('.order[data-status="delivered"]').hide(100);
                    $('.order[data-status="cancelled"]').hide(100);
                    $('.order:not([data-status="delivered"]):not([data-status="cancelled"])').show(100);
                    break;
                case 2:
                    $('.order:not([data-status="delivered"]) .order-body').slideUp();
                    $('.order:not([data-status="delivered"])').find('.arrow.up').removeClass('up');
                    $('.order:not([data-status="delivered"])').hide(100);
                    $('.order[data-status="delivered"]').show(100);
                    break;
                case 3:
                    $('.order:not([data-status="cancelled"]) .order-body').slideUp();
                    $('.order:not([data-status="cancelled"])').find('.arrow.up').removeClass('up');
                    $('.order:not([data-status="cancelled"])').hide(100);
                    $('.order[data-status="cancelled"]').show(100);
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