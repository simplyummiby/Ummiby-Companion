const accordion = document.querySelector('.accordion-trigger');
const accordionPanel = document.getElementById('reading-unit-answer');

accordion?.addEventListener('click', () => {
  const isOpen = accordion.getAttribute('aria-expanded') === 'true';
  accordion.setAttribute('aria-expanded', String(!isOpen));
  accordionPanel.hidden = isOpen;
});

document.querySelectorAll('.nav-toggle').forEach((toggle) => {
  toggle.addEventListener('click', () => {
    const target = document.getElementById(toggle.getAttribute('aria-controls'));
    const isOpen = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', String(!isOpen));
    target.hidden = isOpen;
  });
});
