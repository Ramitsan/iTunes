export const radioPlayerInit = () => {
    const radio = document.querySelector('.radio');
    const radioCoverImg = document.querySelector('.radio-cover__img');
    const radioNavigation = document.querySelector('.radio-navigation');
    const radioHeaderBig = document.querySelector('.radio-header__big');
    const radioItem = document.querySelectorAll('.radio-item');
    const radioStop = document.querySelector('.radio-stop');

    const audio = new Audio();
    audio.type = 'audio/aac';

    radioStop.disabled = true;

    //меняем иконку кнопки play\stop
    const changeIconPlay = () => {
        if (audio.paused) {
            radio.classList.remove('play'); // при паузе удаляем анимацию крутящейся пластинки
            radioStop.classList.add('fa-play');
            radioStop.classList.remove('fa-stop');
        } else {
            radio.classList.add('play'); // при воспроизведении добавляем анимацию крутящейся пластинки
            radioStop.classList.add('fa-stop');
            radioStop.classList.remove('fa-play');
        }
    };

    // выбор радиостанции
    const selectItem = elem => {
        radioItem.forEach(item => item.classList.remove('select'));
        elem.classList.add('select');
    };

    radioNavigation.addEventListener('change', evt => {
        const target = evt.target;
        const parrent = target.closest('.radio-item'); // получаем родителя 
        selectItem(parrent);

        // подставляем название радиостанции в заголовок
        const title = parrent.querySelector('.radio-name').textContent;
        radioHeaderBig.textContent = title;

        // подставляем логотип радиостанции
        const urlImg = parrent.querySelector('.radio-img').src;
        radioCoverImg.src = urlImg;

        // получаем адрес радиостанции, записанный в дата-атрибут
        audio.src = target.dataset.radioStantion;

        radioStop.disabled = false;
        audio.play();
        changeIconPlay();
    });

    radioStop.addEventListener('click', () => {
        if (audio.paused) {
            audio.play();
        } else {
            audio.pause();
        }
        changeIconPlay();
    });
};