document.addEventListener("DOMContentLoaded", () => {
  
  // ==========================================
  // 1. MOBILE NAVBAR NAVIGATION TOGGLE LOGIC
  // ==========================================
  const menuToggle = document.getElementById("menu-toggle");
  const navLinks = document.querySelector(".nav-links");

  if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
      navLinks.classList.toggle("active");
    });
  }

  // ==========================================
  // 2. VIDEO POPUP OVERLAY WINDOW ACTION LOGIC
  // ==========================================
  const videoModal = document.getElementById("videoModal");
  const modalVideo = document.getElementById("modalVideo");
  const closeVideoModal = document.querySelector(".close-modal");
  const gridItems = document.querySelectorAll(".masonry-item");

  if (videoModal && modalVideo && gridItems.length > 0) {
    
    // Add click listeners to every item in the video gallery grid
    gridItems.forEach(item => {
      item.addEventListener("click", () => {
        const video = item.querySelector("video");
        if (!video) return;

        const source = video.querySelector("source");
        if (!source) return;

        // Extract video file source attribute values
        const videoSrc = source.getAttribute("src");
        
        // Pass source to player container window
        modalVideo.querySelector("source").setAttribute("src", videoSrc);
        modalVideo.load();
        
        // Open layout using style transitions
        videoModal.style.display = "flex";
        setTimeout(() => {
          videoModal.classList.add("show");
          modalVideo.play().catch(err => console.log("Playback prevented:", err));
        }, 10);
      });
    });

    // Function to safely turn off modal screen layer
    const handleVideoClose = () => {
      videoModal.classList.remove("show");
      modalVideo.pause();
      
      // Delay closing layout execution timeline to match CSS transitions
      setTimeout(() => {
        videoModal.style.display = "none";
        modalVideo.querySelector("source").setAttribute("src", "");
      }, 400); 
    };

    // Close button trigger listener
    if (closeVideoModal) {
      closeVideoModal.addEventListener("click", handleVideoClose);
    }

    // Close window instantly when clicking anywhere on the dark canvas mask outside the player box
    videoModal.addEventListener("click", (e) => {
      if (e.target === videoModal) {
        handleVideoClose();
      }
    });

    // Close window instantly if user hits the Escape key on their keyboard
    window.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && videoModal.classList.contains("show")) {
        handleVideoClose();
      }
    });
  }
});
