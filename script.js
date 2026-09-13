/**
 * Navneet Singh - Professional Portfolio
 * Main Interactive Scripts
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Automatic Copyright Year
  const yearElement = document.getElementById('currentYear');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

  // 2. Theme Toggle (Dark / Light Mode)
  const themeToggle = document.getElementById('themeToggle');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
  const savedTheme = localStorage.getItem('navneet_portfolio_theme');

  const applyTheme = (theme) => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('navneet_portfolio_theme', theme);
    if (themeToggle) {
      themeToggle.setAttribute('aria-label', theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
    }
  };

  if (savedTheme) {
    applyTheme(savedTheme);
  } else if (prefersDark.matches) {
    applyTheme('dark');
  } else {
    applyTheme('dark'); // Default to dark for modern developer aesthetic
  }

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      applyTheme(newTheme);
      showToast(`Switched to ${newTheme} mode`);
    });
  }

  // 3. Mobile Navigation Drawer
  const mobileMenuToggle = document.getElementById('mobileMenuToggle');
  const closeDrawerBtn = document.getElementById('closeDrawerBtn');
  const mobileDrawer = document.getElementById('mobileDrawer');
  const drawerBackdrop = document.getElementById('drawerBackdrop');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

  const openDrawer = () => {
    mobileDrawer.classList.add('open');
    mobileDrawer.setAttribute('aria-hidden', 'false');
    mobileMenuToggle.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  };

  const closeDrawer = () => {
    mobileDrawer.classList.remove('open');
    mobileDrawer.setAttribute('aria-hidden', 'true');
    mobileMenuToggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  };

  if (mobileMenuToggle) mobileMenuToggle.addEventListener('click', openDrawer);
  if (closeDrawerBtn) closeDrawerBtn.addEventListener('click', closeDrawer);
  if (drawerBackdrop) drawerBackdrop.addEventListener('click', closeDrawer);

  mobileNavLinks.forEach(link => {
    link.addEventListener('click', closeDrawer);
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileDrawer.classList.contains('open')) {
      closeDrawer();
    }
  });

  // 4. Hero Dynamic Typing Animation
  const typingElement = document.getElementById('typingText');
  if (typingElement) {
    const roles = [
      'Web Development & AI Solutions',
      'Scalable Web Applications',
      'Java & Algorithmic Problem Solving',
      'Cross-Device UI/UX Engineering'
    ];
    let roleIdx = 0;
    let charIdx = 0;
    let isDeleting = false;
    let typingSpeed = 90;

    const typeEffect = () => {
      const currentRole = roles[roleIdx];
      if (isDeleting) {
        typingElement.textContent = currentRole.substring(0, charIdx - 1);
        charIdx--;
        typingSpeed = 40;
      } else {
        typingElement.textContent = currentRole.substring(0, charIdx + 1);
        charIdx++;
        typingSpeed = 90;
      }

      if (!isDeleting && charIdx === currentRole.length) {
        typingSpeed = 2200; // Pause at complete word
        isDeleting = true;
      } else if (isDeleting && charIdx === 0) {
        isDeleting = false;
        roleIdx = (roleIdx + 1) % roles.length;
        typingSpeed = 500;
      }

      setTimeout(typeEffect, typingSpeed);
    };

    setTimeout(typeEffect, 1000);
  }

  // 5. Scrollspy Navigation Highlights
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  const onScroll = () => {
    const scrollPosition = window.scrollY + 120;
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');

      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  };

  window.addEventListener('scroll', onScroll, { passive: true });
﻿  // 6. Skills Category Filter
  const skillTabs = document.querySelectorAll('.filter-tab-btn');
  const skillCards = document.querySelectorAll('.skill-card');

  skillTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      skillTabs.forEach(t => {
        t.classList.remove('active');
        t.setAttribute('aria-selected', 'false');
      });
      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');

      const filter = tab.getAttribute('data-skill-filter');

      skillCards.forEach(card => {
        const categories = card.getAttribute('data-category').split(' ');
        if (filter === 'all' || categories.includes(filter)) {
          card.classList.remove('hidden');
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });

  // 7. Projects Category Filter
  const projectFilters = document.querySelectorAll('.project-filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  projectFilters.forEach(btn => {
    btn.addEventListener('click', () => {
      projectFilters.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');
        if (filter === 'all' || cardCategory === filter) {
          card.classList.remove('hidden');
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });

  // 8. Project Details Data & Modal Dialog
  const projectData = {
    'clinic-os': {
      title: 'India First AI Clinic OS',
      category: 'Healthcare & AI',
      badge: 'Flagship AI Project',
      description: 'A revolutionary healthcare management and workflow operating system designed to digitize clinic operations across India. Automates patient appointment queues, doctor consult notes, billing flows, and medical records in a structured, intuitive interface.',
      highlights: [
        'Automated real-time patient queue and consultation routing system',
        'Structured clinical database modeling ensuring data integrity and fast lookup',
        'Intuitive UI tailored for high-speed reception and physician workflows',
        'Architected with modular components for seamless future EHR and telemedicine scaling'
      ],
      techStack: ['AI Integration', 'JavaScript (ES6+)', 'Modern Web APIs', 'CSS Grid', 'Clean Architecture'],
      github: 'https://github.com/Navneet6082'
    },
    'school-saas': {
      title: 'School SaaS Platform',
      category: 'EdTech & Management',
      badge: 'SaaS Platform',
      description: 'An enterprise school management SaaS platform built to unify and digitize educational workflows. Delivers dedicated interfaces for administrators, educators, and students with robust record-keeping and communications.',
      highlights: [
        'Multi-role permission dashboards for administration, faculty, and records',
        'Attendance tracking, examination grading modules, and student record management',
        'Engineered emphasizing reusability, clean DOM architectures, and zero dependencies',
        'Highly responsive layout accessible across desktops, laptops, and tablets'
      ],
      techStack: ['JavaScript (ES6+)', 'SaaS Architecture', 'UI/UX Design', 'DOM Manipulation', 'Responsive CSS'],
      github: 'https://github.com/Navneet6082'
    },
    'resume-analyzer': {
      title: 'AI Resume Analyzer',
      category: 'HR Tech',
      badge: 'AI Utility',
      description: 'An intelligent recruitment and career readiness utility that evaluates resume content against job specifications, scoring qualification matches and surfacing critical skill gaps.',
      highlights: [
        'Analyzes keywords, skill density, and job requirement alignment',
        'Computes compatibility metrics and surfaces actionable improvement suggestions',
        'Clean, executive-level summary dashboard displaying match percentages',
        'Designed to optimize applicant tracking systems (ATS) compliance'
      ],
      techStack: ['Python', 'NLP Techniques', 'JavaScript', 'Interactive Dashboard', 'Data Processing'],
      github: 'https://github.com/Navneet6082'
    },
    'music-player': {
      title: 'Music Playlist Web App',
      category: 'Multimedia',
      badge: 'Flikt Tech Project',
      description: 'Built during the Web Developer Internship at Flikt Technology. A responsive audio player featuring dynamic track rendering, seek and volume controls, playlist queues, and reactive CSS visualizers.',
      highlights: [
        'Integrated HTML5 Audio API for playback control, buffering, and time tracking',
        'Dynamic DOM rendering of audio tracks from structured JSON collections',
        'Interactive playlist queueing with loop, shuffle, and next/previous logic',
        'Hardware-accelerated CSS animations and responsive cross-device layout'
      ],
      techStack: ['HTML5 Audio API', 'JavaScript Events', 'CSS3 Keyframes', 'DOM Manipulation', 'State Management'],
      github: 'https://github.com/Navneet6082'
    },
    'calculator': {
      title: 'Modern Computation Calculator',
      category: 'Algorithms & DOM',
      badge: 'Web Tool',
      description: 'A precision web calculator engineered during internship training. Implements real-time mathematical expression evaluation, operator precedence, input validation, and history logging.',
      highlights: [
        'Event delegation architecture for responsive and efficient DOM event handling',
        'Strict input sanitization preventing syntax errors and division by zero',
        'Full keyboard shortcut binding for lightning-fast numerical computations',
        'Modern neo-morphic glassmorphism aesthetic with CSS Grid'
      ],
      techStack: ['JavaScript (ES6+)', 'Event Delegation', 'CSS Grid', 'Input Validation', 'Error Handling'],
      github: 'https://github.com/Navneet6082'
    },
    'image-gallery': {
      title: 'Interactive Image Gallery',
      category: 'UI/UX',
      badge: 'Rich Media',
      description: 'An interactive media showcase engineered with thumbnail previews, category filtering, a full-screen lightbox modal view, and keyboard navigation support.',
      highlights: [
        'Smooth thumbnail hover animations and dynamic category sorting',
        'Accessible modal zoom view with keyboard navigation (ESC, Arrow keys)',
        'Optimized for fast rendering and minimal layout shifts',
        'Applied semantic HTML5 elements and SEO best practices'
      ],
      techStack: ['Semantic HTML5', 'CSS Animations', 'Modal View', 'Keyboard Accessibility', 'Performance Optimization'],
      github: 'https://github.com/Navneet6082'
    }
  };

  const projectModal = document.getElementById('projectModal');
  const closeModalBtn = document.getElementById('closeModalBtn');
  const modalActionClose = document.getElementById('modalActionClose');
  const modalTitle = document.getElementById('modalTitle');
  const modalDescription = document.getElementById('modalDescription');
  const modalCategory = document.getElementById('modalCategory');
  const modalBadge = document.getElementById('modalBadge');
  const modalHighlights = document.getElementById('modalHighlights');
  const modalTechPills = document.getElementById('modalTechPills');
  const modalGitHubLink = document.getElementById('modalGitHubLink');

  const openProjectModal = (projectId) => {
    const data = projectData[projectId];
    if (!data || !projectModal) return;

    modalTitle.textContent = data.title;
    modalDescription.textContent = data.description;
    modalCategory.textContent = data.category;
    modalBadge.textContent = data.badge;

    modalHighlights.innerHTML = '';
    data.highlights.forEach(h => {
      const li = document.createElement('li');
      li.textContent = h;
      modalHighlights.appendChild(li);
    });

    modalTechPills.innerHTML = '';
    data.techStack.forEach(tech => {
      const pill = document.createElement('span');
      pill.className = 'tech-pill';
      pill.textContent = tech;
      modalTechPills.appendChild(pill);
    });

    if (modalGitHubLink) {
      modalGitHubLink.href = data.github;
    }

    projectModal.showModal();
    document.body.style.overflow = 'hidden';
  };

  const closeProjectModal = () => {
    if (projectModal && projectModal.open) {
      projectModal.close();
      document.body.style.overflow = '';
    }
  };

  document.querySelectorAll('.open-modal-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const projectId = btn.getAttribute('data-project');
      openProjectModal(projectId);
    });
  });

  if (closeModalBtn) closeModalBtn.addEventListener('click', closeProjectModal);
  if (modalActionClose) modalActionClose.addEventListener('click', closeProjectModal);

  if (projectModal) {
    projectModal.addEventListener('click', (e) => {
      if (e.target === projectModal) {
        closeProjectModal();
      }
    });
  }

  // 9. Copy to Clipboard Functionality
  const copyButtons = document.querySelectorAll('[data-copy]');
  const toastNotification = document.getElementById('toastNotification');
  const toastMessage = document.getElementById('toastMessage');
  let toastTimeout;

  const showToast = (message) => {
    if (!toastNotification) return;
    toastMessage.textContent = message;
    toastNotification.classList.add('show');
    clearTimeout(toastTimeout);
    toastTimeout = setTimeout(() => {
      toastNotification.classList.remove('show');
    }, 2800);
  };

  copyButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const text = btn.getAttribute('data-copy');
      if (!text) return;

      navigator.clipboard.writeText(text).then(() => {
        showToast(`Copied to clipboard: ${text}`);
      }).catch(() => {
        showToast(`Selected: ${text}`);
      });
    });
  });

  // 10. Contact Form Validation & Mailto Trigger
  const contactForm = document.getElementById('contactForm');
  const formStatus = document.getElementById('formStatus');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const nameInput = document.getElementById('senderName');
      const emailInput = document.getElementById('senderEmail');
      const subjectInput = document.getElementById('messageSubject');
      const bodyInput = document.getElementById('messageBody');

      let isValid = true;

      // Validate Name
      if (!nameInput.value.trim()) {
        document.getElementById('nameError').textContent = 'Please enter your name.';
        isValid = false;
      } else {
        document.getElementById('nameError').textContent = '';
      }

      // Validate Email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(emailInput.value.trim())) {
        document.getElementById('emailError').textContent = 'Please enter a valid email address.';
        isValid = false;
      } else {
        document.getElementById('emailError').textContent = '';
      }

      // Validate Subject
      if (!subjectInput.value.trim()) {
        document.getElementById('subjectError').textContent = 'Please provide a subject.';
        isValid = false;
      } else {
        document.getElementById('subjectError').textContent = '';
      }

      // Validate Message
      if (!bodyInput.value.trim()) {
        document.getElementById('bodyError').textContent = 'Please enter a message.';
        isValid = false;
      } else {
        document.getElementById('bodyError').textContent = '';
      }

      if (isValid) {
        formStatus.className = 'form-status-msg success';
        formStatus.textContent = 'Message ready! Opening your email client...';
        showToast('Opening default email application...');

        const mailtoUrl = `mailto:ds2706775@gmail.com?subject=${encodeURIComponent(subjectInput.value.trim())}&body=${encodeURIComponent(`From: ${nameInput.value.trim()} (${emailInput.value.trim()})\n\n${bodyInput.value.trim()}`)}`;
        
        setTimeout(() => {
          window.location.href = mailtoUrl;
        }, 600);
      }
    });
  }

  // 11. Resume buttons directly open / download Navneet_Singh_Resume.pdf
});
