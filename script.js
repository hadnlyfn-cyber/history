// script.js
// Простая логика для сенсорных экранов: при первом tap показываем подпись, при втором — переходим по ссылке.
// Также добавляем клавиатурную поддержу (Enter/Space уже работают для <a>, но для touch нужен toggle).

document.addEventListener('DOMContentLoaded', () => {
  const markers = Array.from(document.querySelectorAll('.marker'));

  // Для каждого маркера — отслеживаем touch/click чтобы показать/скрыть подпись на мобильных
  markers.forEach(marker => {
    let tapped = false;

    // Если устройство сенсорное — перехватываем первый клик (touchend) чтобы показать подсказку
    marker.addEventListener('touchend', (ev) => {
      // Если уже было касание недавно — позволяем браузеру открыть ссылку
      if (tapped) {
        return; // второе касание откроет ссылку как обычно
      }
      ev.preventDefault(); // предотвращаем мгновенный переход
      // Устанавливаем data-visible чтобы CSS показал .label
      marker.setAttribute('data-visible', 'true');
      tapped = true;
      // Скрываем через 2.5 сек если пользователь не нажал снова
      setTimeout(() => {
        marker.removeAttribute('data-visible');
        tapped = false;
      }, 2500);
    }, {passive: false});

    // На десктопе: при наведении CSS подсказки работают — js не нужен.
    // Также поддержка открытия по Enter/Space: у <a> это есть по умолчанию.

    // Доп: если пользователь нажал прямо на метку мышью и удерживает — сразу перейти
    marker.addEventListener('click', (ev) => {
      // При нормальном клике — открыть ссылку как обычно. Никакой доп логики.
    });
  });

  // Доп: Обработчик для тонкой настройки позиций на ресайзе (если потребуется).
  window.addEventListener('resize', () => {
    // Здесь можно динамически откорректировать позиции, если картинка масштабируется асинхронно.
  });
});
