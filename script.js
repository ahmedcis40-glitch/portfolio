/* --- CONTACT FORM --- */
document.getElementById('contact-form').addEventListener('submit', function(e) {
  e.preventDefault();
  const btn = this.querySelector('button');
  btn.textContent = 'Envoi en cours…';
  btn.disabled = true;

  const formData = new FormData(this);

  fetch('/portfolio/backend/contact.php', {
    method: 'POST',
    body: formData
  })
  .then(response => response.json())
  .then(data => {
    if (data.success) {
      document.getElementById('form-success').style.display = 'block';
      btn.style.display = 'none';
      this.querySelectorAll('input,textarea').forEach(i => i.value = '');
      showToast('✓ Message envoyé avec succès !');
    } else {
      showToast('✗ Erreur : ' + data.message);
      btn.textContent = 'Envoyer le message';
      btn.disabled = false;
    }
  })
  .catch(error => {
    showToast('✗ Erreur : ' + error.message);
    btn.textContent = 'Envoyer le message';
    btn.disabled = false;
  });
});