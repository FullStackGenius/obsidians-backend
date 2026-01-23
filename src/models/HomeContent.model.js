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
          link: "/"
        },

        video: {
          enabled: true,
          videoUrl: "",
          thumbnail: "/images/video-frame.png",
          playIcon: "/images/play_icon.svg"
        },

        expertBoxes: [
          {
            title: "Experts",
            subtitle: "Dedicated Team",
            description:
              "And here's some amazing content. It's very engaging. Right?",
            icon: "/images/ic_round-plus.svg"
          },
          {
            title: "Experts",
            subtitle: "Developers",
            description:
              "And here's some amazing content. It's very engaging. Right?",
            icon: "/images/ic_round-plus.svg"
          },
          {
            title: "Experts",
            subtitle: "Designers",
            description:
              "And here's some amazing content. It's very engaging. Right?",
            icon: "/images/ic_round-plus.svg"
          }
        ],

        scrollDown: {
          enabled: true,
          text: "Scroll down",
          targetId: "about"
        }
      }
    },

    status: {
      type: Boolean,
      default: true
    }
  },
  { timestamps: true }
);

export default mongoose.model("HomeContent", HomeContentSchema);
