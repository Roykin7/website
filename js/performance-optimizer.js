// STEMCity Labs - Performance Optimized JavaScript
// Non-blocking, efficient loading with modern techniques

// Performance optimization utilities
const PerformanceOptimizer = {
    // Initialize all performance optimizations
    init: function() {
        this.initLazyLoading();
        this.initImageOptimization();
        this.initResourceHints();
        this.initServiceWorker();
        this.optimizeExistingImages();
    },

    // Lazy load images with intersection observer
    initLazyLoading: function() {
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        this.loadOptimizedImage(img);
                        observer.unobserve(img);
                    }
                });
            }, {
                rootMargin: '50px 0px',
                threshold: 0.01
            });

            // Observe all images with data-src
            document.querySelectorAll('img[data-src]').forEach(img => {
                imageObserver.observe(img);
            });
        } else {
            // Fallback for older browsers
            this.loadAllImages();
        }
    },

    // Optimize existing images by adding lazy loading and modern formats
    optimizeExistingImages: function() {
        const images = document.querySelectorAll('img:not([data-src])');
        images.forEach(img => {
            // Add lazy loading attributes
            if (!img.hasAttribute('loading')) {
                img.setAttribute('loading', 'lazy');
            }
            if (!img.hasAttribute('decoding')) {
                img.setAttribute('decoding', 'async');
            }
            
            // Add optimization classes
            img.classList.add('optimized-img');
            
            // Wrap in container for placeholder
            if (!img.parentElement.classList.contains('img-container')) {
                const container = document.createElement('div');
                container.classList.add('img-container');
                img.parentElement.insertBefore(container, img);
                container.appendChild(img);
            }
        });
    },

    // Load optimized images with modern formats
    loadOptimizedImage: function(img) {
        const container = img.parentElement;
        
        // Show loading placeholder
        container.classList.add('loading');
        
        // Check for WebP support
        const supportsWebP = this.checkWebPSupport();
        
        // Get image sources
        const webpSrc = img.dataset.webp;
        const fallbackSrc = img.dataset.src;
        
        // Use WebP if supported and available
        const imageSrc = (supportsWebP && webpSrc) ? webpSrc : fallbackSrc;
        
        // Create new image for preloading
        const newImg = new Image();
        newImg.onload = () => {
            img.src = imageSrc;
            img.classList.add('loaded');
            container.classList.remove('loading');
            container.classList.add('img-loaded');
        };
        newImg.onerror = () => {
            // Fallback to original if WebP fails
            if (imageSrc !== fallbackSrc) {
                img.src = fallbackSrc;
            }
            container.classList.remove('loading');
        };
        newImg.src = imageSrc;
    },

    // Check WebP support
    checkWebPSupport: function() {
        if (this.webpSupported !== undefined) {
            return this.webpSupported;
        }

        const canvas = document.createElement('canvas');
        canvas.width = 1;
        canvas.height = 1;
        this.webpSupported = canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0;
        return this.webpSupported;
    },

    // Fallback image loading
    loadAllImages: function() {
        document.querySelectorAll('img[data-src]').forEach(img => {
            img.src = img.dataset.src;
            img.classList.add('loaded');
        });
    },

    // Preload critical resources
    preloadCriticalResources: function() {
        const criticalResources = [
            { href: 'css/standardized-layout.css', as: 'style' },
            { href: 'css/performance-optimized.css', as: 'style' },
            { href: 'js/standardized-layout.js', as: 'script' }
        ];

        criticalResources.forEach(resource => {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.href = resource.href;
            link.as = resource.as;
            document.head.appendChild(link);
        });
    },

    // Defer non-critical CSS
    loadNonCriticalCSS: function() {
        const nonCriticalCSS = [
            'css/animations.css',
            'css/extended-styles.css'
        ];

        nonCriticalCSS.forEach(href => {
            const link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = href;
            link.media = 'print';
            link.onload = function() {
                this.media = 'all';
            };
            document.head.appendChild(link);
        });
    },

    // Optimize font loading
    optimizeFontLoading: function() {
        // Preload critical fonts
        const fontPreload = document.createElement('link');
        fontPreload.rel = 'preload';
        fontPreload.href = 'https://fonts.googleapis.com/css?family=Montserrat:400,600,700&display=swap';
        fontPreload.as = 'style';
        fontPreload.onload = function() {
            this.rel = 'stylesheet';
        };
        document.head.appendChild(fontPreload);
    },

    // Efficient scroll handling
    initOptimizedScrolling: function() {
        let ticking = false;

        function updateScrollElements() {
            // Handle scroll-dependent elements efficiently
            const scrollY = window.pageYOffset;
            
            // Update header opacity/shadow based on scroll
            const header = document.querySelector('.sticky-header');
            if (header) {
                header.style.transform = `translateZ(0)`; // Force GPU acceleration
                if (scrollY > 50) {
                    header.classList.add('scrolled');
                } else {
                    header.classList.remove('scrolled');
                }
            }

            ticking = false;
        }

        function requestScrollUpdate() {
            if (!ticking) {
                requestAnimationFrame(updateScrollElements);
                ticking = true;
            }
        }

        window.addEventListener('scroll', requestScrollUpdate, { passive: true });
    },

    // Service Worker for caching
    initServiceWorker: function() {
        if ('serviceWorker' in navigator) {
            window.addEventListener('load', () => {
                navigator.serviceWorker.register('/service-worker.js')
                    .then(registration => {
                        console.log('SW registered: ', registration);
                    })
                    .catch(registrationError => {
                        console.log('SW registration failed: ', registrationError);
                    });
            });
        }
    },

    // Resource hints
    addResourceHints: function() {
        const hints = [
            { rel: 'dns-prefetch', href: '//fonts.googleapis.com' },
            { rel: 'dns-prefetch', href: '//fonts.gstatic.com' },
            { rel: 'preconnect', href: 'https://fonts.googleapis.com', crossorigin: true },
            { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: true }
        ];

        hints.forEach(hint => {
            const link = document.createElement('link');
            link.rel = hint.rel;
            link.href = hint.href;
            if (hint.crossorigin) link.crossOrigin = hint.crossorigin;
            document.head.appendChild(link);
        });
    },

    // Initialize all optimizations
    init: function() {
        // Run immediately
        this.addResourceHints();
        this.preloadCriticalResources();
        
        // Run when DOM is ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                this.initLazyLoading();
                this.optimizeFontLoading();
                this.initOptimizedScrolling();
            });
        } else {
            this.initLazyLoading();
            this.optimizeFontLoading();
            this.initOptimizedScrolling();
        }

        // Run when page is fully loaded
        window.addEventListener('load', () => {
            this.loadNonCriticalCSS();
            this.initServiceWorker();
        });
    }
};

// Auto-initialize performance optimizations
PerformanceOptimizer.init();
