import aboutImg from "../assets/img/about-img.png";

export function AboutMe() {
  return (
    <section className="mx-auto max-w-5xl px-4 py-16 md:py-24 anim-fade-in">
      <h2 className="text-3xl md:text-4xl font-extrabold text-text mb-10 font-title text-center">About Me</h2>

      <div className="md:flex md:gap-10 md:items-start">
        {/* Text content */}
        <div className="md:flex-1">
          <div className="mb-10 p-6 rounded-xl bg-secondary/20 border border-secondary shadow-md md:bg-transparent md:border-0 md:shadow-none md:p-0">
            <h3 className="text-xl font-bold text-primary mb-3 font-title">Background</h3>
            <p className="text-text/85 leading-relaxed">
              Growing up in a small Texas town, I learned the value of living simply and appreciating what matters most. I was blessed with a loving, supportive family who encouraged my passions, no matter how ambitious. Early on, I developed a strong sense of right and wrong and felt a calling to help others. For me, doing the right thing isn't just about being a good person—it's a core part of my identity. Inspired by the teachings of Christ, I've always embraced leadership roles and sought opportunities to serve wherever I'm needed.
            </p>
          </div>
          <div className="p-6 rounded-xl bg-secondary/10 border border-secondary shadow-md md:bg-transparent md:border-0 md:shadow-none md:p-0">
            <h3 className="text-xl font-bold text-primary mb-3 font-title">My Strive</h3>
            <p className="text-text/85 leading-relaxed">
              As I continue my programming journey, I strive each day to expand my knowledge and skills. I have a deep passion for software development and a unique talent for designing user interfaces. I love collaborating with others to push boundaries and create innovative projects. My long-term goal is to offer consulting services using independent platforms, ensuring greater security and data protection for my family, friends, and clients. My drive for innovation motivates me to explore the latest technologies and deliver efficient, high-quality solutions. Whether working solo or as part of a team, I am committed to producing content that exceeds expectations.
            </p>
          </div>
        </div>

        {/* Image with caption - below text on mobile, right side on desktop */}
        <figure className="mt-8 md:mt-0 md:w-80 lg:w-96 md:flex-shrink-0">
          <div className="overflow-hidden rounded-2xl border border-secondary shadow-lg md:border-0 md:shadow-none">
            <img
              src={aboutImg}
              alt="Me and my loving girlfriend"
              className="w-full h-auto object-cover hover:scale-105 anim-base"
            />
          </div>
          <figcaption className="mt-3 text-center text-sm text-text/60 italic">
            Me and my loving girlfriend
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
