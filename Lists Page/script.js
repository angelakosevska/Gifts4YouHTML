document.addEventListener('DOMContentLoaded', function() {
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');

    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            if (this.checked) {
                this.parentElement.style.opacity = '0.5'; // Dim the item to show it's taken
            } else {
                this.parentElement.style.opacity = '1';
            }
        });
    });
});
