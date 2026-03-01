document.addEventListener('DOMContentLoaded', () => {
    
    // Elements
    const inputSection = document.getElementById('inputSection');
    const loadingSection = document.getElementById('loadingSection');
    const resultsSection = document.getElementById('resultsSection');
    
    const analyzeBtn = document.getElementById('analyzeBtn');
    const backBtn = document.getElementById('backBtn');
    const magneticElements = document.querySelectorAll('.magnetic');
    
    // Magnetic Button Effect
    magneticElements.forEach(elem => {
        elem.addEventListener('mousemove', (e) => {
            const rect = elem.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            // Subtle movement based on mouse position
            elem.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px)`;
        });
        
        elem.addEventListener('mouseleave', () => {
            // Reset position with smooth transition
            elem.style.transform = 'translate(0px, 0px)';
        });
    });

    // Navigation Flow Simulation
    analyzeBtn.addEventListener('click', () => {
        const promptText = document.getElementById('promptInput').value;
        const isLocal = document.getElementById('localToggle').checked;
        
        // Very basic validation simulation
        if (!promptText.trim()) {
            document.getElementById('promptInput').style.borderColor = 'rgba(255, 0, 0, 0.5)';
            setTimeout(() => {
                document.getElementById('promptInput').style.borderColor = 'rgba(255, 255, 255, 0.1)';
            }, 500);
            return;
        }

        // Transition: Input -> Loading
        switchSection(inputSection, loadingSection);

        // Simulate network/AI delay
        const statusText = document.querySelector('.status-text');
        
        setTimeout(() => { statusText.textContent = "Scraping DOM elements..."; }, 1000);
        setTimeout(() => { statusText.textContent = "Running neural sentiment check..."; }, 2000);
        setTimeout(() => { 
            // Transition: Loading -> Results
            switchSection(loadingSection, resultsSection); 
        }, 3000);
    });

    backBtn.addEventListener('click', () => {
        // Transition: Results -> Input
        switchSection(resultsSection, inputSection);
        
        // Reset loading text for next time
        setTimeout(() => {
            document.querySelector('.status-text').textContent = "Quantum formatting DOM...";
            
             // Hack to re-trigger the SVG circle animation on back
             const circle = document.querySelector('.circle');
             const clone = circle.cloneNode(true);
             circle.parentNode.replaceChild(clone, circle);
        }, 400); // Wait for transition to finish
    });

    // Helper function for smooth opacity/display transitions
    function switchSection(oldSection, newSection) {
        oldSection.classList.remove('active');
        // Small delay allowing the fade out to start before bringing in the new one
        setTimeout(() => {
            newSection.classList.add('active');
        }, 200);
    }
});
