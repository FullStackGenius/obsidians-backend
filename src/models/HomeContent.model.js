import mongoose from "mongoose";

const HomeContentSchema = new mongoose.Schema(
  {
    heroSection: {
      type: Object,
      default: {
        welcomeText: "Welcome to",
        brandName: "The Obsidians",

        mainHeading: "We Provide Services and Solutions",
        highlightedText: "To Enterprise",

        description:
          "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident.",

        primaryButton: {
          text: "Get A Quote",
          link: "/",
        },

        video: {
          enabled: true,
          videoUrl: "",
          thumbnail: "/images/video-frame.png",
          playIcon: "/images/play_icon.svg",
        },

        expertBoxes: [
          {
            title: "Experts",
            subtitle: "Dedicated Team",
            description:
              "And here's some amazing content. It's very engaging. Right?",
            icon: "/images/ic_round-plus.svg",
          },
          {
            title: "Experts",
            subtitle: "Developers",
            description:
              "And here's some amazing content. It's very engaging. Right?",
            icon: "/images/ic_round-plus.svg",
          },
          {
            title: "Experts",
            subtitle: "Designers",
            description:
              "And here's some amazing content. It's very engaging. Right?",
            icon: "/images/ic_round-plus.svg",
          },
        ],

        scrollDown: {
          enabled: true,
          text: "Scroll down",
          targetId: "about",
        },
      },
    },

    /* ================= ABOUT SECTION ================= */

    aboutSection: {
      type: Object,
      default: {
        heading: {
          title: "Smart tech, built for",
          highlightedText: "bold brands",
        },
        contentImage:
          "https://theobsidians.com/wp-content/uploads/2026/01/about-img1.jpg",
        description:
          "At The Obsidians, we help businesses navigate digital complexity, grow faster, and turn ideas into measurable results. We focus on the size of your vision, not your business, delivering solutions that drive efficiency and lasting digital experiences through collaboration and creativity.",

        button: {
          text: "About Us",
          link: "about",
          icon: "https://theobsidians.com/wp-content/uploads/2026/01/arrow-tp-red.svg",
        },

        reviews: {
          rating: 4.8,
          label: "Star Reviews on",
          platform: "Upwork",
          platformIcon:
            "https://theobsidians.com/wp-content/uploads/2026/01/up_work_img.png",
          reviewImages: [
            "https://theobsidians.com/wp-content/uploads/2026/01/review_img-1.png",
            "https://theobsidians.com/wp-content/uploads/2026/01/review_img-2.png",
            "https://theobsidians.com/wp-content/uploads/2026/01/review_img-3.png",
          ],
        },
        sideImage:
          "https://theobsidians.com/wp-content/uploads/2026/01/about-img2.jpg",
      },
    },

    status: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true },
);

export default mongoose.model("HomeContent", HomeContentSchema);
