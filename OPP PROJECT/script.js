// ============================================
// MAIN SCRIPT - SAFE TO EDIT
// ============================================
// Cursor functionality is in cursor.js (don't edit that file)
// ============================================

// Landing Page Entrance
const landingPage = document.getElementById('landingPage');
const enterBtn = document.getElementById('enterBtn');

// Create floating particles
function createParticles() {
    const particlesContainer = document.querySelector('.particles-container');
    const particleCount = 50;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 3 + 's';
        particle.style.animationDuration = (Math.random() * 3 + 2) + 's';
        particlesContainer.appendChild(particle);
    }
}

createParticles();

// Typing effect for subtitle
const subtitle = document.querySelector('.landing-subtitle');
const subtitleText = subtitle.textContent;
subtitle.textContent = '';
subtitle.style.opacity = '1';

let charIndex = 0;
function typeWriter() {
    if (charIndex < subtitleText.length) {
        subtitle.textContent += subtitleText.charAt(charIndex);
        charIndex++;
        setTimeout(typeWriter, 100);
    }
}

// Start typing after initial animations
setTimeout(typeWriter, 1500);

// Add hover sound effect simulation (visual feedback)
enterBtn.addEventListener('mouseenter', () => {
    enterBtn.style.boxShadow = '0 0 50px rgba(29, 233, 182, 0.8), 0 0 100px rgba(29, 233, 182, 0.4)';
});

enterBtn.addEventListener('mouseleave', () => {
    enterBtn.style.boxShadow = 'none';
});

// Enter button click handler
enterBtn.addEventListener('click', () => {
    // Add click animation
    enterBtn.style.transform = 'scale(0.95)';
    
    // Create explosion effect
    createExplosion(enterBtn);
    
    setTimeout(() => {
        // Hide landing page with animation
        landingPage.classList.add('hide');
        
        // Enable scrolling
        document.body.style.overflow = 'auto';
        
        // Remove landing page from DOM after animation
        setTimeout(() => {
            landingPage.remove();
        }, 800);
    }, 200);
});

// Create explosion effect on button click
function createExplosion(element) {
    const rect = element.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    for (let i = 0; i < 30; i++) {
        const particle = document.createElement('div');
        particle.style.position = 'fixed';
        particle.style.left = centerX + 'px';
        particle.style.top = centerY + 'px';
        particle.style.width = '6px';
        particle.style.height = '6px';
        particle.style.background = i % 2 === 0 ? '#1DE9B6' : '#FF6B6B';
        particle.style.borderRadius = '50%';
        particle.style.pointerEvents = 'none';
        particle.style.zIndex = '10002';
        particle.style.boxShadow = `0 0 10px ${i % 2 === 0 ? '#1DE9B6' : '#FF6B6B'}`;
        
        document.body.appendChild(particle);
        
        const angle = (Math.PI * 2 * i) / 30;
        const velocity = 3 + Math.random() * 3;
        const vx = Math.cos(angle) * velocity;
        const vy = Math.sin(angle) * velocity;
        
        animateExplosionParticle(particle, vx, vy);
    }
}

function animateExplosionParticle(particle, vx, vy) {
    let x = 0;
    let y = 0;
    let opacity = 1;
    
    function animate() {
        x += vx;
        y += vy;
        opacity -= 0.02;
        
        particle.style.transform = `translate(${x}px, ${y}px)`;
        particle.style.opacity = opacity;
        
        if (opacity > 0) {
            requestAnimationFrame(animate);
        } else {
            particle.remove();
        }
    }
    
    animate();
}

// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

// Hide scroll indicator on scroll
window.addEventListener('scroll', () => {
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        if (window.scrollY > 100) {
            scrollIndicator.style.opacity = '0';
        } else {
            scrollIndicator.style.opacity = '1';
        }
    }
});

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.querySelectorAll('.portfolio-item, .stat-item').forEach(el => {
    observer.observe(el);
});

// Parallax effect on mouse move
document.addEventListener('mousemove', (e) => {
    const moveX = (e.clientX - window.innerWidth / 2) * 0.01;
    const moveY = (e.clientY - window.innerHeight / 2) * 0.01;
    
    const bgAnimation = document.querySelector('.bg-animation');
    if (bgAnimation) {
        bgAnimation.style.transform = `translate(${moveX}px, ${moveY}px)`;
    }
});

// Portfolio Filter
const filterButtons = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-item');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        // Add active class to clicked button
        button.classList.add('active');
        
        const filterValue = button.getAttribute('data-filter');
        
        portfolioItems.forEach(item => {
            if (filterValue === 'all') {
                item.classList.remove('hide');
                setTimeout(() => {
                    item.style.display = 'block';
                }, 10);
            } else {
                if (item.getAttribute('data-category') === filterValue) {
                    item.classList.remove('hide');
                    setTimeout(() => {
                        item.style.display = 'block';
                    }, 10);
                } else {
                    item.classList.add('hide');
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            }
        });
    });
});

// Animated Counter for Stats
const animateCounter = (element) => {
    const target = parseInt(element.getAttribute('data-target'));
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;
    
    const updateCounter = () => {
        current += step;
        if (current < target) {
            element.textContent = Math.floor(current);
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target;
        }
    };
    
    updateCounter();
};

// Trigger counter animation when stats come into view
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumbers = entry.target.querySelectorAll('.stat-number');
            statNumbers.forEach(num => {
                if (num.textContent === '0') {
                    animateCounter(num);
                }
            });
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const aboutSection = document.querySelector('.about-section');
if (aboutSection) {
    statsObserver.observe(aboutSection);
}

// Project Modal
const modal = document.getElementById('projectModal');
const modalBody = document.getElementById('modalBody');
const closeModal = document.querySelector('.close-modal');

const projectData = {
    1: {
        title: 'Log Cabin Design',
        category: 'Architecture',
        description: 'A modern take on traditional log cabin architecture, combining rustic charm with contemporary design elements. This project showcases sustainable building practices and efficient space utilization.',
        details: 'Created using advanced 3D modeling techniques and sustainable design principles. The cabin features natural lighting, energy-efficient systems, and harmonious integration with the surrounding landscape.'
    },
    2: {
        title: 'Cake Design',
        category: 'Food Illustration',
        description: 'A delightful and whimsical cake illustration that captures the essence of celebration and sweetness. Perfect for bakery branding or culinary publications.',
        details: 'This design emphasizes vibrant colors and playful composition, making it ideal for marketing materials, menus, and social media content.'
    },
    3: {
        title: 'Circus Tent',
        category: 'Event Design',
        description: 'Bold and eye-catching circus tent design that evokes nostalgia and excitement. Perfect for event promotions and entertainment venues.',
        details: 'The classic red and white striped pattern combined with modern graphic design techniques creates a timeless visual that appeals to all ages.'
    },
    4: {
        title: 'Game Controller',
        category: 'Product Design',
        description: 'Retro-inspired game controller design that pays homage to classic gaming while maintaining a contemporary aesthetic.',
        details: 'This project explores the intersection of nostalgia and modern design, creating an iconic representation of gaming culture.'
    },
    5: {
        title: 'Modern Building',
        category: 'Architecture',
        description: 'Contemporary building design featuring clean lines, functional spaces, and innovative structural elements.',
        details: 'This architectural concept emphasizes sustainability, natural light, and efficient use of urban space.'
    },
    6: {
        title: 'Submarine',
        category: 'Transport Design',
        description: 'Imaginative submarine design combining functionality with artistic expression. Perfect for educational materials or entertainment media.',
        details: 'This underwater vessel design showcases attention to detail and creative problem-solving in transportation design.'
    }
};

function openProject(projectId) {
    const project = projectData[projectId];
    modalBody.innerHTML = `
        <h2>${project.title}</h2>
        <p><strong>Category:</strong> ${project.category}</p>
        <p>${project.description}</p>
        <p>${project.details}</p>
        <div style="margin-top: 2rem;">
            <button class="view-project" onclick="alert('Project details and full gallery would be displayed here!')">View Full Gallery</button>
        </div>
    `;
    modal.style.display = 'block';
}

closeModal.onclick = function() {
    modal.style.display = 'none';
}

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = 'none';
    }
}

// Contact Form
const contactForm = document.getElementById('contactForm');
const formMessage = document.querySelector('.form-message');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    
    // Simulate form submission
    formMessage.textContent = 'Thank you for your message! I will get back to you soon.';
    formMessage.className = 'form-message success';
    
    // Reset form
    contactForm.reset();
    
    // Hide message after 5 seconds
    setTimeout(() => {
        formMessage.style.display = 'none';
    }, 5000);
    
    // In a real application, you would send this data to a server
    console.log('Form submitted:', { name, email, message });
});

// Back to Top Button
const backToTopBtn = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        backToTopBtn.classList.add('show');
    } else {
        backToTopBtn.classList.remove('show');
    }
});

backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Navbar background on scroll
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(26, 31, 46, 0.95)';
    } else {
        navbar.style.background = 'rgba(26, 31, 46, 0.8)';
    }
});

// Add loading animation
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// Keyboard navigation for accessibility
document.addEventListener('keydown', (e) => {
    // Close modal with Escape key
    if (e.key === 'Escape' && modal.style.display === 'block') {
        modal.style.display = 'none';
    }
    
    // Navigate with arrow keys when modal is open
    if (modal.style.display === 'block') {
        const currentProject = parseInt(modalBody.querySelector('h2').textContent.match(/\d+/)?.[0] || 1);
        if (e.key === 'ArrowRight' && currentProject < 6) {
            openProject(currentProject + 1);
        } else if (e.key === 'ArrowLeft' && currentProject > 1) {
            openProject(currentProject - 1);
        }
    }
});

// Add ripple effect to buttons
document.querySelectorAll('button, .filter-btn').forEach(button => {
    button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// Performance optimization: Lazy loading for images
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });

    document.querySelectorAll('.portfolio-img').forEach(img => {
        imageObserver.observe(img);
    });
}

console.log('🚀 Portfolio website loaded successfully!');
console.log('💡 Tip: Try filtering the portfolio items or clicking on projects to see more details!');

// Prevent scrolling on landing page
document.body.style.overflow = 'hidden';
// ============================================
// SMOOTH SCROLL CAROUSEL
// ============================================

(function() {
    'use strict';
    
    console.log('🚀 Starting smooth scroll carousel...');
    
    const container = document.getElementById('carouselContainer');
    const dotsContainer = document.getElementById('carouselDots');
    
    if (!container || !dotsContainer) {
        console.error('❌ Missing carousel elements!');
        return;
    }
    
    const cards = Array.from(container.querySelectorAll('.carousel-card'));
    const totalCards = cards.length;
    
    console.log('📊 Total cards:', totalCards);
    
    // Create BIG clickable dots
    cards.forEach((card, index) => {
        const dot = document.createElement('div');
        dot.classList.add('carousel-dot');
        dot.setAttribute('data-number', index + 1);
        if (index === 0) dot.classList.add('active');
        
        // Dot click - scroll to card
        dot.addEventListener('click', () => {
            console.log('🔘 Dot', index + 1, 'clicked! Scrolling to card...');
            card.scrollIntoView({ 
                behavior: 'smooth', 
                block: 'nearest',
                inline: 'start'
            });
        });
        
        dotsContainer.appendChild(dot);
    });
    
    const dots = Array.from(dotsContainer.children);
    console.log('🔘 Created', dots.length, 'clickable dots');
    
    // Update active dot based on scroll position
    function updateActiveDot() {
        const scrollLeft = container.scrollLeft;
        const cardWidth = cards[0].offsetWidth + 32; // card width + gap
        const currentIndex = Math.round(scrollLeft / cardWidth);
        
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });
    }
    
    // Listen to scroll events to update dots
    container.addEventListener('scroll', () => {
        updateActiveDot();
    });
    
    console.log('✅ Smooth scroll carousel ready!');
    console.log('📌 Navigation:');
    console.log('   1. Click numbered dots');
    console.log('   2. Drag/scroll horizontally');
    console.log('   3. Use trackpad/mouse wheel');
    
})();

// ============================================
// PROFILE MODAL FUNCTIONALITY
// ============================================

function openProfileModal(category) {
    const modalContent = {
        hobbies: {
            title: '🏆 Hobbies & Sports',
            content: `
                <div class="modal-section">
                    <h4>Chess</h4>
                    <div class="modal-image-container">
                        <img src="chessnganiyan.jpeg" alt="Playing Chess" class="modal-image">
                        <p class="image-caption">Replace this with your chess tournament photo</p>
                    </div>
                    <p>Strategic board game player with competitive tournament experience. Chess has taught me critical thinking, pattern recognition, and strategic planning.</p>
                </div>
                
                <div class="modal-section">
                    <h4>Gaming</h4>
                    <p>Passionate about strategy and puzzle games that challenge problem-solving abilities. Gaming keeps my mind sharp and creative.</p>
                </div>
                
                <div class="modal-section">
                    <h4>Coding Projects</h4>
                    <p>Building creative solutions and experimenting with new technologies. Personal projects help me learn and grow as a developer.</p>
                </div>
            `
        },
        talents: {
            title: '⭐ Talents',
            content: `
                <div class="modal-section">
                    <h4>Problem Solving</h4>
                    <p>Strong analytical thinking skills developed through chess and programming. I excel at breaking down complex problems into manageable solutions.</p>
                </div>
                
                <div class="modal-section">
                    <h4>Strategic Planning</h4>
                    <p>Chess-trained mind that excels at thinking several steps ahead. This skill translates well to software architecture and project planning.</p>
                </div>
                
                <div class="modal-section">
                    <h4>Quick Learning</h4>
                    <p>Ability to rapidly adapt to new technologies and frameworks. I'm always eager to learn and expand my skill set.</p>
                </div>

                <div class="modal-section">
                    <h4>Performing arts talent</h4>
                    <li>Singing</li>
                    <li>Writing Poems</li>
                </div>
            `
        },
        education: {
            title: '🎓 Educational Background',
            content: `
                <div class="modal-section">
                    <h4>BS Computer Engineering - 1C</h4>
                    <p><strong>Current Student</strong></p>
                    <div class="modal-image-container">
                        <img src="cdmngani.jpg" alt="University" class="modal-image">
                    </div>
                </div>
                
                <div class="modal-section">
                    <h4>Core Subjects</h4>
                    <ul>
                        <li>Senior HighSchool Graduate at AICS Montalban</li>
                        <li>HighSchool Graduate at SouthVille 8B National HighSchool</li>
                        <li>Elementary Graduate at San Isidro Labrador Elementary School</li>
                        <li>Programming Fundamentals</li>
                        <li>Digital Logic Design</li>
                        <li>Mathematics & Physics</li>
                        <li>Data Structures & Algorithms</li>
                        <li>Computer Architecture</li>
                    </ul>
                    
                    <p>Building a strong foundation in both hardware and software aspects of computing.</p>
                </div>
            `
        },
        skills: {
            title: '💻 Expertise & Skills',
            content: `
                <div class="modal-section">
                    <h4>Programming Languages</h4>
                    <ul>
                        <li><strong>HTML</strong> - Semantic markup and structure</li>
                        <li><strong>CSS</strong> - Styling and animations</li>
                        <li><strong>JavaScript</strong> - Interactive functionality</li>
                        <li><strong>Python</strong> - Basic Syntax and Logic</li>
                        <li><strong>C++</strong> - Basic Syntax and Logic</li>
                        <li><strong>C</strong> - Basic Syntax and Logic</li>
                        <li><strong>C#</strong> - Basic Syntax and Logic</li>
                        <li><strong>Java</strong> - Basic Syntax and Logic</li>
                    </ul>
                </div>
                    <ul>
                        <li>Git & GitHub - Version control</li>
                        <li>VS Code - Development environment</li>
                        <li>Google Maps API - Location services</li>
                        <li>Responsive Design - Mobile-first approach</li>
                    </ul>
                </div>
            `
        },
        awards: {
            title: '🏅 Awards & Certificates',
            content: `
                <div class="modal-section">
                    <h4>Chess Achievements</h4>
                    <div class="modal-image-container">
                        <img src="chesschamp.jpg" alt="Chess Certificate" class="modal-image">
                    </div>
                    <p>Participated in various chess tournaments, developing strategic thinking and competitive skills.</p>
                </div>
                
                <div class="modal-section">
                    <h4>Academic Achievements</h4>
                    <p>Senior High School Graduate with High Honors.</p>
                    <p>High School Graduate with Honors, Best in Math.</p>
                </div>
                
                <div class="modal-section">
                    <h4>Coding Workshops</h4>
                    <div class="modal-image-container">
                        <img src="gamejam.jpg" alt="Workshop Certificates" class="modal-image">
                    </div>
                </div>
            `
        }
    };
    
    const data = modalContent[category];
    if (!data) return;
    
    const modal = document.getElementById('projectModal');
    const modalBody = document.getElementById('modalBody');
    
    modalBody.innerHTML = `
        <h2>${data.title}</h2>
        <div class="modal-details">
            ${data.content}
        </div>
    `;
    
    modal.style.display = 'flex';
}

console.log('✅ All carousel scripts loaded successfully!');
