'use strict';
const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#primary-nav');
function closeMenu(returnFocus = false) {
  if (!menuButton || !navigation) return;
  navigation.classList.remove('is-open');
  menuButton.setAttribute('aria-expanded', 'false');
  if (returnFocus) menuButton.focus();
}
menuButton?.addEventListener('click', () => {
  const open = menuButton.getAttribute('aria-expanded') !== 'true';
  navigation.classList.toggle('is-open', open);
  menuButton.setAttribute('aria-expanded', String(open));
});
navigation?.querySelectorAll('a').forEach(link => link.addEventListener('click', () => closeMenu()));
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && !document.querySelector('.page-dialog')?.open && menuButton?.getAttribute('aria-expanded') === 'true') closeMenu(true);
});
const dialog = document.querySelector('.page-dialog');
document.querySelectorAll('[data-page]').forEach(button => button.addEventListener('click', () => {
  dialog.querySelector('#dialog-title').textContent = button.dataset.page;
  dialog.querySelector('.planned-path').textContent = `Будущий путь: ${button.dataset.path}`;
  dialog.showModal();
}));
dialog?.querySelectorAll('.dialog-close').forEach(button => button.addEventListener('click', () => dialog.close()));
const conceptSelect = document.querySelector('#concept-select');
const widthSelect = document.querySelector('#width-select');
const compareFrame = document.querySelector('.compare-frame');
function updateComparison() {
  compareFrame.src = conceptSelect.value;
  compareFrame.style.width = widthSelect.value === 'auto' ? '100%' : `${widthSelect.value}px`;
  compareFrame.title = `Предпросмотр: ${conceptSelect.selectedOptions[0].textContent}`;
  document.querySelector('.open-current').href = conceptSelect.value;
}
conceptSelect?.addEventListener('change', updateComparison);
widthSelect?.addEventListener('change', () => {
  compareFrame.style.width = widthSelect.value === 'auto' ? '100%' : `${widthSelect.value}px`;
});
