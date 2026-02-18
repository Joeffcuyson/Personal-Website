// ============================================
// CUSTOM CURSOR MODULE
// ============================================
// ⚠️ DON'T EDIT THIS FILE UNLESS YOU KNOW WHAT YOU'RE DOING!
// If cursor crashes, just replace this file with the original.
// ============================================

(function() {
    'use strict';
    
    // Wait for DOM to be ready
    function initCustomCursor() {
        const cursor = document.querySelector('.cursor');
        const cursorFollower = document.querySelector('.cursor-follower');
        
        // Exit if cursor elements don't exist
        if (!cursor || !cursorFollower) {
            console.warn('Custom cursor elements not found. Cursor disabled.');
            return;
        }
        
        // Check if it's a touch device
        const isTouchDevice = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);
        
        if (isTouchDevice) {
            // Hide custom cursor on touch devices
            cursor.style.display = 'none';
            cursorFollower.style.display = 'none';
            return;
        }
        
        // Position variables
        let mouseX = window.innerWidth / 2;
        let mouseY = window.innerHeight / 2;
        let cursorX = mouseX;
        let cursorY = mouseY;
        let followerX = mouseX;
        let followerY = mouseY;
        let hasMovedMouse = false;
        
        // Hide cursor initially
        cursor.style.opacity = '0';
        cursorFollower.style.opacity = '0';
        
        // Update mouse position
        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            
            // Show cursor on first mouse movement
            if (!hasMovedMouse) {
                cursor.style.opacity = '1';
                cursorFollower.style.opacity = '0.5';
                hasMovedMouse = true;
            }
        });
        
        // Smooth animation loop using requestAnimationFrame
        function animateCursor() {
            // Main cursor follows immediately
            cursorX = mouseX;
            cursorY = mouseY;
            
            // Follower has smooth easing
            followerX += (mouseX - followerX) * 0.15;
            followerY += (mouseY - followerY) * 0.15;
            
            // Apply positions
            cursor.style.left = cursorX + 'px';
            cursor.style.top = cursorY + 'px';
            cursorFollower.style.left = followerX + 'px';
            cursorFollower.style.top = followerY + 'px';
            
            requestAnimationFrame(animateCursor);
        }
        
        // Start animation
        requestAnimationFrame(animateCursor);
        
        // Cursor effects on interactive elements
        const interactiveElements = document.querySelectorAll('a, button, .portfolio-item, .filter-btn, .view-project, input, textarea');
        
        interactiveElements.forEach(element => {
            element.addEventListener('mouseenter', () => {
                cursor.style.width = '60px';
                cursor.style.height = '60px';
                cursor.style.backgroundColor = 'rgba(29, 233, 182, 0.2)';
                cursor.style.border = '2px solid rgba(29, 233, 182, 0.8)';
            });
            
            element.addEventListener('mouseleave', () => {
                cursor.style.width = '20px';
                cursor.style.height = '20px';
                cursor.style.backgroundColor = 'transparent';
                cursor.style.border = '2px solid rgba(255, 255, 255, 0.5)';
            });
        });
        
        // Hide cursor when leaving window
        document.addEventListener('mouseleave', () => {
            cursor.style.opacity = '0';
            cursorFollower.style.opacity = '0';
        });
        
        document.addEventListener('mouseenter', () => {
            if (hasMovedMouse) {
                cursor.style.opacity = '1';
                cursorFollower.style.opacity = '0.5';
            }
        });
        
        console.log('✅ Custom cursor initialized successfully!');
    }
    
    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initCustomCursor);
    } else {
        initCustomCursor();
    }
    
})();
