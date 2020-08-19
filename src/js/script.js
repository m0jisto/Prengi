//Slider & Tabs

function sliderHeader () {
    let slideIndex = 1,
        slides = document.querySelectorAll('.header__item'),
        prev = document.querySelector('.header__dots_prev'),
        next = document.querySelector('.header__dots_next'),
        dotsWrap = document.querySelector('.header__dots_wrapper'),
        dots = document.querySelectorAll('.header__dots_round');

    function showSlides (n) {
    
        if (n > slides.length) {
            slideIndex = 1;
        }

        if (n < 1) {
            slideIndex = slides.length;
        }

        slides.forEach((item) => item.classList.remove('header__item_active'));
        dots.forEach((item) => item.classList.remove('header__dots_round_active'));

        slides[slideIndex - 1].classList.add('header__item_active');
        dots[slideIndex - 1].classList.add('header__dots_round_active');
    }

    showSlides(slideIndex);

    function plusSlides (n) {
        showSlides(slideIndex += n);
    }

    function autoPlusSlides () {
        plusSlides(1);
    }

    // setInterval(autoPlusSlides, 6000);

    next.addEventListener ('click', function () {
        plusSlides (1);
    });

    prev.addEventListener ('click', function () {
        plusSlides (-1);
    });

    function currentSlides (n) {
        showSlides(slideIndex = n);
    }

    dotsWrap.addEventListener('click', function(e) {
        for (let i = 0; i < dots.length + 1; i++) {
            if (e.target.classList.contains('header__dots_round') && event.target == dots[i-1]) {
                currentSlides(i);
            }
        }
    });
}

sliderHeader();

function sliderSolutions () {
    let slideIndex = 1,
        slides = document.querySelectorAll('.solutions__item'),
        prev = document.querySelector('.solutions__prev'),
        next = document.querySelector('.solutions__next'),
        tabs = document.querySelector('.solutions__list'),
        tab = document.querySelectorAll('.solutions__link');

    function showSlides (n) {
    
        if (n > slides.length) {
            slideIndex = 1;
        }

        if (n < 1) {
            slideIndex = slides.length;
        }
        slides.forEach((item) => item.classList.remove('solutions__item_active'));
        tab.forEach((item) => item.classList.remove('solutions__link_active'));

        slides[slideIndex - 1].classList.add('solutions__item_active');
        tab[slideIndex - 1].classList.add('solutions__link_active');
    }

    showSlides(slideIndex);

    function plusSlides (n) {
        showSlides(slideIndex += n);
    }

    next.addEventListener ('click', function () {
        plusSlides (1);
    });

    prev.addEventListener ('click', function () {
        plusSlides (-1);
    });

    function currentSlides (n) {
        showSlides(slideIndex = n);
    }

    tabs.addEventListener('click', function(e) {
        for (let i = 0; i < tab.length + 1; i++) {
            if (e.target.classList.contains('solutions__link') && event.target == tab[i-1]) {
                currentSlides(i);
            }
        }
    });
}

sliderSolutions();

// Smooth scroll and pageup

$(window).scroll(function (){
    if ($(this).scrollTop() > 550) {
        document.querySelectorAll('.out-transition__arrow').forEach((item) => item.classList.add('out-transition__arrow_active-animation'));
        setTimeout(()=> {
            document.querySelectorAll('.out-transition__arrow').forEach((item) => item.classList.remove('out-transition__arrow_active-animation'));
            document.querySelectorAll('.out-transition__arrow').forEach((item) => item.classList.add('out-transition__arrow_active'));
        }, 10000);
    }
});

// Modal

$('button').on('click', function () {
    $('.overlay, #consultation').fadeIn('slow');
});

$('.modal__close').on('click', function () {
    $('.overlay, #consultation, #order, #thanks').fadeOut('slow');
});

$('.start__img').on('click', function () {
    $('.overlay, #consultation').fadeIn('slow');
});

// Sending data

$('form').submit(function(e){
    e.preventDefault();
    $.ajax({
        type: "POST",
        url: "mailer/smart.php",
        data: $(this).serialize()
    }).done(function(){
        $(this).find("input").val("");
        $('#order, #consultation').fadeOut();
        $('.overlay, #thanks').fadeIn('slow');
        
        $('form').trigger('reset');
    });
    return false;
});