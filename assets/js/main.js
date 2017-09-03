$('span#currentYear').text((new Date()).getFullYear());
$(window).resize(function(){
    if ($(window).height() < 575) {
        $('.col-sm-6.postThumbnailOdd').removeClass('order-2');
        $('.col-sm-6.postOdd').removeClass('order-1');
        $('.col-sm-6.postThumbnailOdd').addClass('order-1');
        $('.col-sm-6.postOdd').addClass('order-2');
    } else {
        $('.col-sm-6.postThumbnailOdd').removeClass('order-1');
        $('.col-sm-6.postOdd').removeClass('order-2');
        $('.col-sm-6.postThumbnailOdd').addClass('order-2');
        $('.col-sm-6.postOdd').addClass('order-1');
    }
});
