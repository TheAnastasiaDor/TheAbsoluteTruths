document.getElementById('astronomy').addEventListener('click', function() {
    window.location.href = 'earth.html';
});

document.getElementById('world-history').addEventListener('click', function() {
    window.location.href = 'g7.html';
});

// Assuming there's an element with the id 'win' in your HTML, otherwise remove this.
document.getElementById('win').addEventListener('click', function() {
    window.location.href = 'win.html';
});

document.addEventListener('DOMContentLoaded', function () {
    // Check if we're on the correct page for these elements.
    if (document.getElementById('merkel') && document.getElementById('trash-icon')) {
        const merkel = document.getElementById('merkel');
        const trashIcon = document.getElementById('trash-icon');
        let isDragging = false;

        merkel.addEventListener('mousedown', function (e) {
            isDragging = true;
        });

        document.addEventListener('mousemove', function (e) {
            if (isDragging) {
                merkel.style.left = e.pageX - merkel.width / 2 + 'px';
                merkel.style.top = e.pageY - merkel.height / 2 + 'px';
                checkOverlap();
            }
        });

        document.addEventListener('mouseup', function (e) {
            isDragging = false;
        });

        function checkOverlap() {
            const merkelRect = merkel.getBoundingClientRect();
            const trashRect = trashIcon.getBoundingClientRect();

            if (!(merkelRect.right < trashRect.left ||
                  merkelRect.left > trashRect.right ||
                  merkelRect.bottom < trashRect.top ||
                  merkelRect.top > trashRect.bottom)) {
                if (calculateOverlap(merkelRect, trashRect) >= 10) {
                    // Replace with 2.svg
                    document.getElementById('svg1').src = '2.svg';
                    merkel.style.display = 'none';
                    trashIcon.style.display = 'none';
                    // Wait for 1 minute, then redirect to win.html
                    setTimeout(function() {
                        window.location.href = 'win.html';
                    }, 60000); // 60000 milliseconds = 1 minute
                }
            }
        }

        function calculateOverlap(rect1, rect2) {
            const x_overlap = Math.max(0, Math.min(rect1.right, rect2.right) - Math.max(rect1.left, rect2.left));
            const y_overlap = Math.max(0, Math.min(rect1.bottom, rect2.bottom) - Math.max(rect1.top, rect2.top));
            const overlapArea = x_overlap * y_overlap;

            const rect1Area = (rect1.right - rect1.left) * (rect1.bottom - rect1.top);
            return (overlapArea / rect1Area) * 100;
        }
    }
});
