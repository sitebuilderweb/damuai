document.addEventListener('DOMContentLoaded', () => {
  const filterButtons = document.querySelectorAll('[data-filter]');
  const courseCards = document.querySelectorAll('[data-category]');
  const searchInput = document.querySelector('#courseSearch');
  const resultCount = document.querySelector('#resultCount');

  function applyFilters() {
    const activeBtn = document.querySelector('.filter-btn.active');
    const category = activeBtn ? activeBtn.dataset.filter : 'all';
    const query = searchInput ? searchInput.value.trim().toLowerCase() : '';
    let visible = 0;

    courseCards.forEach(card => {
      const matchesCategory = category === 'all' || card.dataset.category.includes(category);
      const matchesQuery = !query || card.innerText.toLowerCase().includes(query);
      const show = matchesCategory && matchesQuery;
      card.style.display = show ? '' : 'none';
      if (show) visible += 1;
    });

    if (resultCount) {
      resultCount.textContent = `${visible} курс табылды`;
    }
  }

  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      applyFilters();
    });
  });

  if (searchInput) {
    searchInput.addEventListener('input', applyFilters);
  }

  applyFilters();

  document.querySelectorAll('.lesson-test').forEach(form => {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const questions = form.querySelectorAll('.question');
      let correct = 0;
      questions.forEach(q => {
        const picked = q.querySelector('input[type="radio"]:checked');
        if (picked && picked.value === '1') correct += 1;
      });
      const resultBox = form.querySelector('.test-result');
      if (!resultBox) return;
      if (correct === questions.length) {
        resultBox.className = 'test-result show success';
        resultBox.textContent = `Өте жақсы! ${correct}/${questions.length}. Курс аяқталды! 🎉`;
      } else {
        resultBox.className = 'test-result show warning';
        resultBox.textContent = `Нәтиже: ${correct}/${questions.length}. Қайта бір рет қарап шығыңыз.`;
      }
    });
  });
});
