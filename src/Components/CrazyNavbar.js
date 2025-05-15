import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MorphSVGPlugin } from 'gsap/MorphSVGPlugin';
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin';
import { CustomEase } from 'gsap/CustomEase';
import { Physics2DPlugin } from 'gsap/Physics2DPlugin';
import { ScrambleTextPlugin } from 'gsap/ScrambleTextPlugin';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';
import { SplitText } from 'gsap/SplitText';
import { Menu, X, Settings, Star, Moon, Sun, Globe, Music, Coffee } from 'lucide-react';
import './CrazyNavbar.css';

// Register GSAP plugins
gsap.registerPlugin(
  ScrollTrigger,
  MorphSVGPlugin,
  DrawSVGPlugin,
  CustomEase,
  Physics2DPlugin,
  ScrambleTextPlugin,
  MotionPathPlugin,
  SplitText
);

// Custom bounce ease
CustomEase.create("customBounce", "M0,0 C0.14,0 0.242,0.438 0.272,0.561 0.313,0.728 0.354,0.963 0.362,1 0.37,0.985 0.414,0.873 0.455,0.811 0.51,0.726 0.573,0.753 0.586,0.762 0.662,0.812 0.719,0.981 0.726,0.998 0.788,0.914 0.84,0.936 0.859,0.95 0.878,0.964 0.897,0.985 0.911,0.998 0.922,0.994 0.939,0.984 0.954,0.984 0.969,0.984 1,1 1,1");

// NavLink component for each navigation item
const NavLink = ({ icon, text, position }) => {
  const linkRef = useRef(null);
  const iconRef = useRef(null);
  const textRef = useRef(null);
  const glowRef = useRef(null);

  useEffect(() => {
    const link = linkRef.current;
    const iconElement = iconRef.current;
    const textElement = textRef.current;
    const glowElement = glowRef.current;

    // Reset animations
    gsap.set(link, { clearProps: "all" });
    gsap.set(iconElement, { clearProps: "all" });
    gsap.set(textElement, { clearProps: "all" });
    gsap.set(glowElement, { clearProps: "all", opacity: 0 });

    // Create hover animation timeline
    const hoverTl = gsap.timeline({ paused: true });
    
    // Different animation for each link position
    switch (position) {
      case 'top':
        hoverTl
          .to(iconElement, { 
            scale: 1.4, 
            color: '#ff5722', 
            duration: 0.3, 
            ease: "back.out(1.7)" 
          })
          .to(textElement, { 
            opacity: 1, 
            duration: 0.2 
          }, 0)
          .to(glowElement, { 
            opacity: 0.8, 
            duration: 0.3 
          }, 0);
        break;
        
      case 'right':
        hoverTl
          .to(iconElement, { 
            rotation: 360, 
            scale: 1.2, 
            color: '#4caf50', 
            duration: 0.4, 
            ease: "elastic.out(1.2)" 
          })
           .to(textElement, { 
            opacity: 1, 
            duration: 0.2 
          }, 0)
          .to(glowElement, { 
            opacity: 0.8, 
            scale: 1.5, 
            duration: 0.3 
          }, 0);
        break;
      
      case 'bottom':
        hoverTl
          .to(iconElement, { 
            scale: 1.3, 
            color: '#2196f3', 
            duration: 0.25, 
            ease: CustomEase.create("custom", "M0,0 C0.126,0.382 0.282,0.674 0.44,0.822 0.632,1.002 0.818,1.001 1,1") 
          })
          .to(textElement, { 
            opacity: 1, 
            duration: 0.2 
          }, 0)
          .to(glowElement, { 
            opacity: 0.7, 
            scale: 1.2, 
            duration: 0.2 
          }, 0);
        break;
      
      case 'left':
        hoverTl
          .to(iconElement, { 
            rotation: -360, 
            scale: 1.2, 
            color: '#9c27b0', 
            duration: 0.4, 
            ease: "back.out(1.5)" 
          })
           .to(textElement, { 
            opacity: 1, 
            duration: 0.2 
          }, 0)
          .to(glowElement, { 
            opacity: 0.8, 
            scale: 1.3, 
            duration: 0.3 
          }, 0);
        break;
      
      default:
        hoverTl
          .to(iconElement, { 
            scale: 1.3, 
            color: '#ff9800', 
            duration: 0.3, 
            ease: "power2.out" 
          })
          .to(textElement, { 
            opacity: 1, 
            duration: 0.2 
          }, 0)
          .to(glowElement, { 
            opacity: 0.8, 
            duration: 0.3 
          }, 0);
    }

    // Add event listeners
    link.addEventListener('mouseenter', () => hoverTl.play());
    link.addEventListener('mouseleave', () => hoverTl.reverse());

    // Cleanup
    return () => {
      link.removeEventListener('mouseenter', () => hoverTl.play());
      link.removeEventListener('mouseleave', () => hoverTl.reverse());
      hoverTl.kill();
    };
  }, [position]);

  return (
    <div 
      ref={linkRef} 
      className={`nav-link ${position}`}
    >
      <div className="link-content">
        <div ref={glowRef} className="glow-effect"></div>
        <div ref={iconRef} className="icon">
          {icon}
        </div>
        <div ref={textRef} className="text">
          {text}
        </div>
      </div>
    </div>
  );
};

// Main CrazyNavbar component
const CrazyNavbar = () => {
  const navbarRef = useRef(null);
  const logoRef = useRef(null);
  const triangleRef = useRef(null);
  const circleRef = useRef(null);
  const squareRef = useRef(null);
  const menuButtonRef = useRef(null);
  const navLinksRef = useRef(null);
  const particlesRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const tlRef = useRef(null);
  const particlesTlRef = useRef(null);

  const navItems = [
    { icon: <Star size={24} />, text: "Favorites", position: "top" },
    { icon: <Settings size={24} />, text: "Settings", position: "right" },
    { icon: <Coffee size={24} />, text: "Explore", position: "bottom" },
    { icon: <Globe size={24} />, text: "Discover", position: "left" },
    { icon: <Music size={24} />, text: "Sounds", position: "center" },
  ];

  // Create animated particles
  const createParticles = () => {
    const particlesContainer = particlesRef.current;
    if (!particlesContainer) return;
    
    // Clear existing particles
    while (particlesContainer.firstChild) {
      particlesContainer.removeChild(particlesContainer.firstChild);
    }
    
    // Create new particles
    for (let i = 0; i < 30; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle';
      
      // Random particle type
      const particleType = Math.floor(Math.random() * 4);
      switch (particleType) {
        case 0:
          particle.classList.add('circle');
          break;
        case 1:
          particle.classList.add('square');
          break;
        case 2:
          particle.classList.add('triangle');
          break;
        case 3:
          particle.classList.add('cross');
          break;
        default:
          particle.classList.add('circle');
      }
      
      // Random sizes
      const size = 5 + Math.random() * 10;
      gsap.set(particle, {
        width: size,
        height: size,
        x: Math.random() * 100 - 50,
        y: Math.random() * 100 - 50,
        opacity: 0
      });
      
      particlesContainer.appendChild(particle);
    }
  };

  // Animate particles
  const animateParticles = () => {
    const particles = particlesRef.current.querySelectorAll('.particle');
    
    if (particlesTlRef.current) {
      particlesTlRef.current.kill();
    }
    
    particlesTlRef.current = gsap.timeline();
    
    particles.forEach((particle, index) => {
      const delay = index * 0.02;
      
      particlesTlRef.current.to(particle, {
        opacity: Math.random() * 0.6 + 0.2,
        duration: 0.3,
        delay: delay
      }, 0);
      
      particlesTlRef.current.to(particle, {
        x: (Math.random() - 0.5) * 200,
        y: (Math.random() - 0.5) * 200,
        rotation: Math.random() * 720 - 360,
        duration: 1.5 + Math.random(),
        ease: "power3.out",
        delay: delay
      }, 0);
      
      particlesTlRef.current.to(particle, {
        opacity: 0,
        duration: 0.8,
        delay: delay + 0.7
      }, 0);
    });
  };

  // Toggle menu open/close
  const toggleMenu = () => {
    if (tlRef.current) {
      tlRef.current.kill();
    }
    
    tlRef.current = gsap.timeline();
    
    if (!isOpen) {
      // Opening animation
      tlRef.current
        .to(menuButtonRef.current.querySelector('.menu-icon'), {
          opacity: 0,
          duration: 0.2
        })
        .to(menuButtonRef.current.querySelector('.close-icon'), {
          opacity: 1,
          scale: 1,
          duration: 0.3,
          ease: "back.out(1.7)"
        }, "-=0.1")
        .set(navLinksRef.current, {
          display: 'flex'
        })
        .to(navbarRef.current, {
          borderRadius: '24px',
          width: '320px',
          height: '320px',
          duration: 0.5,
          ease: "back.out(1.4)"
        }, "-=0.2")
        .to(logoRef.current, {
          scale: 1.2,
          rotation: 360,
          duration: 0.8,
          ease: "elastic.out(1, 0.5)"
        }, "-=0.4");
      
      // Animate each navigation item with staggered timing
      const navLinks = navLinksRef.current.children;
      tlRef.current.fromTo(navLinks, 
        {
          opacity: 0,
          scale: 0.5,
          y: 40
        },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          stagger: 0.07,
          duration: 0.5,
          ease: "back.out(1.7)"
        }, 
        "-=0.3"
      );
      
      // Animate shapes
      tlRef.current
        .to(triangleRef.current, {
          rotation: 360,
          scale: 1.2,
          opacity: 0.8,
          duration: 1,
          ease: "elastic.out(1, 0.3)"
        }, "-=0.8")
        .to(circleRef.current, {
          scale: 1.5,
          opacity: 0.7,
          duration: 0.8,
          ease: "power2.out"
        }, "-=0.9")
        .to(squareRef.current, {
          rotation: 45,
          scale: 1.3,
          opacity: 0.6,
          duration: 0.7,
          ease: "back.out(2)"
        }, "-=0.8");
        
      // Create and animate particles
      createParticles();
      animateParticles();
    } else {
      // Closing animation
      tlRef.current
        .to(menuButtonRef.current.querySelector('.close-icon'), {
          opacity: 0,
          scale: 0.8,
          duration: 0.2
        })
        .to(menuButtonRef.current.querySelector('.menu-icon'), {
          opacity: 1,
          duration: 0.2
        }, "-=0.1")
        .to(navLinksRef.current.children, {
          opacity: 0,
          scale: 0.8,
          stagger: 0.04,
          duration: 0.3,
          ease: "power2.in"
        }, 0)
        .to(navbarRef.current, {
          borderRadius: '16px',
          width: '64px',
          height: '64px',
          duration: 0.5,
          ease: "power3.inOut"
        }, "-=0.2")
        .to(logoRef.current, {
          scale: 1,
          rotation: 0,
          duration: 0.4,
          ease: "power2.inOut"
        }, "-=0.5")
        .to([triangleRef.current, circleRef.current, squareRef.current], {
          scale: 0,
          opacity: 0,
          duration: 0.3,
          ease: "power2.in"
        }, "-=0.4")
        .set(navLinksRef.current, {
          display: 'none'
        });
    }
    
    setIsOpen(!isOpen);
  };

  // Animate logo continuously
  useEffect(() => {
    const logoPulse = gsap.timeline({
      repeat: -1,
      yoyo: true
    });
    
    logoPulse
      .to(logoRef.current, {
        scale: 1.1,
        duration: 1.5,
        ease: "sine.inOut"
      })
      .to(logoRef.current, {
        scale: 0.95,
        duration: 1.5,
        ease: "sine.inOut"
      });
    
    // Create floating shapes animation
    const shapesTimeline = gsap.timeline({
      repeat: -1,
      yoyo: true
    });
    
    shapesTimeline
      .to(triangleRef.current, {
        x: '+=5',
        y: '-=5',
        rotation: '+=10',
        duration: 3,
        ease: "sine.inOut"
      }, 0)
      .to(circleRef.current, {
        x: '-=7',
        y: '+=7',
        duration: 4,
        ease: "sine.inOut"
      }, 0)
      .to(squareRef.current, {
        x: '+=8',
        y: '+=3',
        rotation: '-=15',
        duration: 3.5,
        ease: "sine.inOut"
      }, 0);
    
    // Menu button hover effect
    const menuButton = menuButtonRef.current;
    const menuHoverTl = gsap.timeline({ paused: true });
    
    menuHoverTl
      .to(menuButton, {
        backgroundColor: '#f06292',
        scale: 1.1,
        duration: 0.3,
        ease: "power2.out"
      });
    
    menuButton.addEventListener('mouseenter', () => menuHoverTl.play());
    menuButton.addEventListener('mouseleave', () => menuHoverTl.reverse());
    
    // Cleanup animations
    return () => {
      logoPulse.kill();
      shapesTimeline.kill();
      menuHoverTl.kill();
      if (tlRef.current) tlRef.current.kill();
      if (particlesTlRef.current) particlesTlRef.current.kill();
      menuButton.removeEventListener('mouseenter', () => menuHoverTl.play());
      menuButton.removeEventListener('mouseleave', () => menuHoverTl.reverse());
    };
  }, []);

  // Theme toggle effect
  const toggleTheme = () => {
    const root = document.documentElement;
    const isDarkMode = root.classList.contains('dark-mode');
    
    const themeTl = gsap.timeline();
    
    if (!isDarkMode) {
      themeTl
        .to('body', {
          backgroundColor: '#121212',
          color: '#ffffff',
          duration: 0.5,
          ease: "power2.inOut"
        })
        .to('.nav-link', {
          backgroundColor: '#333333',
          color: '#ffffff',
          duration: 0.4,
          stagger: 0.05,
          ease: "power2.inOut"
        }, 0)
        .to('.navbar', {
          backgroundColor: '#333333',
          boxShadow: '0 8px 16px rgba(0, 0, 0, 0.5)',
          duration: 0.5
        }, 0);
        
      root.classList.add('dark-mode');
    } else {
      themeTl
        .to('body', {
          backgroundColor: '#f8f9fa',
          color: '#212529',
          duration: 0.5,
          ease: "power2.inOut"
        })
        .to('.nav-link', {
          backgroundColor: '#ffffff',
          color: '#212529',
          duration: 0.4,
          stagger: 0.05,
          ease: "power2.inOut"
        }, 0)
        .to('.navbar', {
          backgroundColor: '#ffffff',
          boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)',
          duration: 0.5
        }, 0);
        
      root.classList.remove('dark-mode');
    }
    
    // Animation for the theme toggle icon
    const moonIcon = document.querySelector('.moon-icon');
    const sunIcon = document.querySelector('.sun-icon');
    
    if (isDarkMode) {
      gsap.to(moonIcon, { opacity: 0, scale: 0.5, duration: 0.3 });
      gsap.to(sunIcon, { opacity: 1, scale: 1, duration: 0.3, delay: 0.1 });
    } else {
      gsap.to(sunIcon, { opacity: 0, scale: 0.5, duration: 0.3 });
      gsap.to(moonIcon, { opacity: 1, scale: 1, duration: 0.3, delay: 0.1 });
    }
  };

  return (
    <div className="navbar-container">
      <div ref={navbarRef} className={`navbar ${isOpen ? 'open' : ''}`}>
        {/* Background shapes */}
        <div className="background-shapes">
          <div ref={triangleRef} className="shape triangle"></div>
          <div ref={circleRef} className="shape circle"></div>
          <div ref={squareRef} className="shape square"></div>
        </div>
        
        {/* Logo */}
        <div ref={logoRef} className="logo">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="#FF4081" />
            <path d="M2 17L12 22L22 17" stroke="#FF4081" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M2 12L12 17L22 12" stroke northward
="#FF4081" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        
        {/* Menu Button */}
        <button ref={menuButtonRef} className="menu-button" onClick={toggleMenu}>
          <Menu className="menu-icon" size={24} />
          <X className="close-icon" size={24} />
        </button>
        
        {/* Navigation Links */}
        <div ref={navLinksRef} className="nav-links">
          {navItems.map((item, index) => (
            <NavLink
              key={index}
              icon={item.icon}
              text={item.text}
              position={item.position}
            />
          ))}
          
          {/* Theme toggle */}
          <div className="theme-toggle" onClick={toggleTheme}>
            <Moon className="moon-icon" size={20} />
            <Sun className="sun-icon" size={20} />
          </div>
        </div>
        
        {/* Particles container for animation effects */}
        <div ref={particlesRef} className="particles-container"></div>
      </div>
    </div>
  );
};

export default CrazyNavbar;