$(document).ready(function(){
    const openPopUp = $('#openPopUp');
    const openPopUp2 = $('#openPopUp2');
    const closePopUp = $('#closePopUp');
    const closePopUp2 = $('#closePopUp2')
    const popUp = $('#pop-up');
    const tel = $('#tel')
    const fullName = $('#FullName')
    const btnSend = $('#btnSend')
    const consTel = $('#consultation-input-tel')
    const consName = $('#consultation-input-name')
    const menu = $('#menu-img');
    const menuOpen = $('#menu-add')
    const menuClose = $('#pop-up-close-menu')
    const form1 = $('#form-pop-up')
    const form2 = $('#form-pop-up2')
    const headerBtn = $('#header-btn')
    const consBtn = $('#consultation-btn')
    const form3 = $('#consultation-container')
    const form4 = $('#consultation-container2')
    let loader = $('.loader')



    $('.multiple-items').slick({
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 3,
        dots: true,
        responsive: [
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    infinite: true,
                    dots: true,
                    centerMode: true
                }
            },

            {
                breakpoint: 900,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    centerMode: true
                }
            }
        ]
    });


    $('.review-slider').slick();




    const slider = $('.multiple-items');

    slider.on('init reInit afterChange', function (event , slick , CurrentSlide ) {

        $ ('.slider-count-total').text(slick.slideCount);
        $ ('.slider-count-current').text(CurrentSlide + 1);
    })

    const sliderRw = $('.review-slider');

    sliderRw.on('afterChange', function (event , slick , CurrentSlide ) {
        $ ('.slider-rw-total').text(slick.slideCount);
        $ ('.slider-rw-current').text(CurrentSlide + 1);
    })


    openPopUp.click(function () {
        popUp.show();
        popUp.addClass('open')
        popUp.children().addClass('open')

        $('body').addClass('open-pop-up')

        form1[0].reset()
    });

    openPopUp2.click(function () {
        popUp.show();
        popUp.addClass('open')
        popUp.children().addClass('open')

        $('body').addClass('open-pop-up')

        form1[0].reset()
    });

    closePopUp.click(function () {
        popUp.hide()
        $('body').removeClass('open-pop-up')

    })

    closePopUp2.click(function () {
        popUp.hide()
        $('body').removeClass('open-pop-up')


    })


    menu.on('click',function () {
        menuOpen.show().css('display', 'flex');
        menuOpen.addClass('open')
        $('body').addClass('open-pop-up')
    })

    menuClose.click(function () {
        menuOpen.hide()
        $('body').removeClass('open-pop-up')

    })


    $('#btnSend').click (function (e) {
        e.preventDefault()
        let hasError = false;

        $('.error-input ').hide();

        if (!fullName.val()) {
            fullName.next().show();
            hasError = true
        }

        if (!tel.val()) {
            tel.next().show();
            hasError = true
        }

        if (!hasError) {
            loader.show()

            $.ajax({
                method: "POST",
                url: "https://testologia.ru/checkout",
                data: {name: fullName.val(),  phone: tel.val() }
            })
                .done(function( msg ) {
                    loader.hide()

                    if (msg.success) {
                        submitForm()
                    } else {
                        alert('Возникла ошибка при оформлении, позвоните нам!')
                    }
                });
        }
    })


    $('#consultation-btn').click (function (ev) {
        ev.preventDefault()
        let hasError = false;

        $('.error-input2 ').hide();

        if (!consName.val()) {
            consName.next().show();
            hasError = true
        }

        if (!consTel.val()) {
            consTel.next().show();
            hasError = true
        }

        if (!hasError) {
            loader.show()
            $.ajax({
                method: "POST",
                url: "https://testologia.ru/checkout",
                data: {name: consName.val(),  phone: consTel.val() }
            })
                .done(function( msg ) {
                    if (msg.success) {
                        loader.hide()
                        submitForm2()
                    } else {
                        alert('Возникла ошибка при оформлении, позвоните нам!')
                    }
                });
        }
    })

    function submitForm() {
        form1.hide();
        form2.show();
    }

    function submitForm2() {
        form3.hide();
        form4.show();
    }

    $ ('#btnSend').onclick = () => {
        validation();
    }


    fullName.onkeydown = (e) => {
        let letter = parseInt(e.key)
        if (!isNaN(letter)) {
            return false;
        }
        console.log(e.key)
    };

    consName.onkeydown = (e) => {
        let letter = parseInt(e.key)
        if (!isNaN(letter)) {
            return false;
        }
        console.log(e.key)
    };

    tel.onkeydown = (e) => {
        let number = parseInt(e.key)
        if (isNaN(number)) {
            return false;
        }
        console.log(e.key)
    };


    consTel.onkeydown = (e) => {
        let number = parseInt(e.key)
        if (isNaN(number)) {
            return false;
        }
        console.log(e.key)
    };


    function validation() {
        if (!consTel.value) {
            alert('Введите ваш номер')
            return;
        } else if (!consName.value) {
            alert('Введите ваше имя')
            return;
        }
        alert('Мы скоро с вами свяжемся!')
    }
})