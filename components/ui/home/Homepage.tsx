"use client";

import Button from "@/components/common/Button";
import Image from "next/image";

import Hero from "./Hero";
import NewsletterForm from "@/components/forms/NewsletterForm";
import ListingSlider from "@/components/listings/ListingSlider";

import WhatWould from "./WhatWould";

import ImgWithTextImg from "@/public/images/img-with-text.jpg";
import WhatWould1Img from "@/public/images/what-would-1.jpg";

import { Broker, RecentStory, Tag } from "@/types/index";

// TAGS SECTION IMAGES
import EcomImg from "@/public/images/ecom.jpg";
import SaaSImg from "@/public/images/sass.jpg";
import RestImg from "@/public/images/rest.jpg";
import RetailImg from "@/public/images/retail.jpg";
import ConstImg from "@/public/images/const.jpg";
import FinImg from "@/public/images/fin.jpg";

// RECENT STORY SECTION IMAGES
import RecentStory1Img from "@/public/images/recent-story-1.jpg";
import RecentStory2Img from "@/public/images/recent-story-2.jpg";
import RecentStory3Img from "@/public/images/recent-story-3.jpg";
import { useRef } from "react";
import GetUpdates from "./GetUpdates";
import Handpicked from "./Handpicked";

const brokers: Broker[] = [
  {
    id: 1,
    name: "Curtis Miller",
    role: "M&A Advisor",
    location: "Stockport, Greater Manchester.",
    image: WhatWould1Img,
  },
  {
    id: 2,
    name: "Curtis Jones",
    role: "M&A Assistant",
    location: "Stockport, Greater Manchester.",
    image: WhatWould1Img,
  },
  {
    id: 3,
    name: "Curtis Becker",
    role: "M&A Manager",
    location: "Stockport, Greater Manchester.",
    image: WhatWould1Img,
  },
  {
    id: 4,
    name: "Curtis Becker",
    role: "M&A Manager",
    location: "Stockport, Greater Manchester.",
    image: WhatWould1Img,
  },
  {
    id: 5,
    name: "Curtis Becker",
    role: "M&A Manager",
    location: "Stockport, Greater Manchester.",
    image: WhatWould1Img,
  },
];

const tags: Tag[] = [
  { id: 1, name: "E-commerce", image: EcomImg },
  { id: 2, name: "SaaS", image: SaaSImg },
  { id: 3, name: "Resturants", image: RestImg },
  { id: 4, name: "Retail", image: RetailImg },
  { id: 5, name: "Construction", image: ConstImg },
  { id: 6, name: "Finance", image: FinImg },
];

// const stories: RecentStory[] = [
//   {
//     id: 1,
//     title:
//       "How Tiffany Built A Multimillion Pounds Franchise Buying Struggling Grocery Stores",
//     tag: "Retail",
//     image: RecentStory1Img,
//     writer: "Tiffany Guster",
//   },
//   {
//     id: 2,
//     title:
//       "Vestibulum a senectus ornare urna sit eu. Mattis suscipit bibendum tempus.",
//     tag: "E-commerce",
//     image: RecentStory2Img,
//     writer: "William Cook",
//   },
//   {
//     id: 3,
//     title:
//       "Faucibus ultricies sed vel velit elementum nunc. Tortor ac commodo hendrerit aliquet.",
//     tag: "SaaS",
//     image: RecentStory3Img,
//     writer: "Tony Gulliani",
//   },
// ];

export default function Homepage({ children }: { children: React.ReactNode }) {
  const targetRef = useRef<HTMLElement>(null);

  const scrollToTarget = () => {
    if (targetRef.current) {
      targetRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <Hero />

      <Handpicked>{children}</Handpicked>

      <ImgWithText />

      <section className="section homepage_middle">
        <WhatWould onScrollClick={scrollToTarget} brokers={brokers} />

        <Tags tags={tags} />

        {/* <Stories stories={stories} /> */}
      </section>

      <GetUpdates ref={targetRef} />

      <RichText />
    </>
  );
}

// IMAGE WITH TEXT SECTION
function ImgWithText() {
  return (
    <section className="section imgWithText_section">
      <div className="page_width">
        <div className="imgWithText">
          <aside className="imgWithText_content">
            <div>
              <h2>Opportunities Worth Your Time...</h2>
              <p>
                Explore curated listings backed by real data. Our team reviews
                trends, valuations, and industry insights to ensure each
                opportunity meets a high threshold of quality and potential.
              </p>
            </div>

            <Button className="btn btn-primary btn-medium">
              Explore Opportunities
            </Button>
          </aside>

          <aside className="imgWithText_image_content">
            <Image src={ImgWithTextImg} alt="Image_with_text" />
          </aside>
        </div>
      </div>
    </section>
  );
}

//POPULAR TAGS SECTION
function Tags({ tags }: { tags: Tag[] }) {
  return (
    <div className="page_width popularTags">
      <aside className="popularTags_header">
        <h3>View Popular Tags</h3>

        <p>
          Discover industries buyers search for most. Explore categories to find
          businesses that match your interests and investment goals.
        </p>
      </aside>

      <aside className="popularTags_container container_homepage">
        {tags.map((tag) => {
          return (
            <div key={tag.id} className="tag">
              <Image src={tag.image} alt={tag.name} />
              <span>{tag.name}</span>
            </div>
          );
        })}
      </aside>
    </div>
  );
}

//RECENT STORIES SECTION
function Stories({ stories }: { stories: RecentStory[] }) {
  return (
    <div className="page_width recentStories">
      <aside className="recentStories_header">
        <h3>Read Recent Success Stories</h3>
        <p>
          Hear from entrepreneurs who made successful transitions. Their
          journeys highlight what’s possible when the right buyer meets the
          right opportunity.
        </p>
      </aside>

      <aside className="recentStories_container container_homepage">
        {stories.map((story) => {
          return (
            <div key={story.id} className="recentStory">
              <div className="recentStory_image">
                <Image src={story.image} alt={story.title} />
              </div>

              <div className="recentStory_text">
                <span>{story.tag}</span>
                <h4>{story.title}</h4>
                <p>{story.writer}</p>
              </div>
            </div>
          );
        })}
      </aside>
    </div>
  );
}

// RICH TEXT SECTION
function RichText() {
  return (
    <div className="section richText">
      <div className="richText_container">
        <h2>
          Unlock <span>Opportunities</span> With Confidence
        </h2>
        <p>
          From early research to final negotiations, Ventarca supports your
          journey every step of the way. We combine data-driven insights with
          human expertise to help you make smart, informed decisions quickly.
        </p>
      </div>
    </div>
  );
}
