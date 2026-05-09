import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { MobileCTA } from "@/components/layout/MobileCTA";
import { Hero } from "@/components/home/Hero";
import { About } from "@/components/home/About";
import { Courses } from "@/components/home/Courses";
import { SeaDivider } from "@/components/home/SeaDivider";
import { Calendar } from "@/components/home/Calendar";
import { Simulator } from "@/components/home/Simulator";
import { Testimonials } from "@/components/home/Testimonials";
import { Contact } from "@/components/home/Contact";
import { FAQ } from "@/components/home/FAQ";
import { Blog } from "@/components/home/Blog";
import { Partners } from "@/components/home/Partners";
import { Newsletter } from "@/components/home/Newsletter";
import { WhatsAppFloat } from "@/components/shared/WhatsAppFloat";
import { getCourses } from "@/services/courses";
import { getUpcomingDates } from "@/services/courseDates";
import {
  getTestimonials,
  getFaqItems,
  getPartners,
  getSiteStats
} from "@/services/content";
import { getBlogPosts } from "@/services/blog";

export const revalidate = 300;

export default async function HomePage() {
  const [courses, dates, testimonials, faqItems, partners, siteStats, blogPosts] =
    await Promise.all([
      getCourses(),
      getUpcomingDates(),
      getTestimonials(),
      getFaqItems(),
      getPartners(),
      getSiteStats(),
      getBlogPosts()
    ]);

  return (
    <>
      <AnnouncementBar />
      <Navbar />
      <main id="main-content">
        <Hero stats={siteStats} />
        <About />
        <Courses courses={courses} />
        <SeaDivider />
        <Calendar dates={dates} />
        <Simulator />
        <Testimonials items={testimonials} />
        <Contact courses={courses} />
        <FAQ items={faqItems} />
        <Blog posts={blogPosts} />
      </main>
      <Partners items={partners} />
      <Newsletter />
      <Footer />
      <WhatsAppFloat />
      <MobileCTA />
    </>
  );
}
